// create a review for a product
import { config, databases } from '@/lib/apprite.config';
import { ID } from 'react-native-appwrite';

// POST: Create a review for a product, update product's average rating efficiently
export async function POST(req: Request, { params }: { params: { productId: string } }) {
    const { productId } = params;

    if (!productId) {
        return Response.json({
            success: false,
            message: "Product ID is required"
        }, { status: 400 });
    }

    let reviewData: any;
    try {
        reviewData = await req.json();
    } catch (err) {
        return Response.json({
            success: false,
            message: "Invalid JSON body"
        }, { status: 400 });
    }

    // Validate reviewData
    const { name, rating, comment, userId,date } = reviewData;
    if (
        !name ||
        typeof rating !== 'number' ||
        rating < 1 ||
        rating > 5 ||
        !comment ||
        !userId||
        !date
    ) {
        return Response.json({
            success: false,
            message: "Invalid review data"
        }, { status: 400 });
    }

    // Prepare review document
    const reviewDoc = {
        name,
        rating,
        comment,
        productId,
        userId,
        date
    };

    try {
        
       const [user,productExists]=await Promise.all([
        databases.getDocument(
            config.databaseId!,
            config.usersCollectionId!,
            userId
        ),
        databases.getDocument(
            config.databaseId!,
            config.productsCollectionId!,
            productId
        )
       ])

        
        if(!user||!productExists){
            return Response.json({
                success: false,
                message: "User or product not found"
            }, { status: 404 });
        }

        if(productExists.reviews.some((review:any)=>review.userId===userId)){
            return Response.json({
                success: false,
                message: "User already has a review for this product"
            }, { status: 400 });
        }

        // 1. Create the review
        const createdReview = await databases.createDocument(
            config.databaseId!,
            config.reviewsCollectionId!,
            ID.unique(), // Let Appwrite generate unique ID
            reviewDoc
        );
         
         if(!createdReview){
            return Response.json({
                success: false,
                message: "Error creating review"
            }, { status: 500 });
         }

        // 2. Efficiently update product's average rating
        // Fetch only the product's current rating and review count
        const product = await databases.getDocument(
            config.databaseId!,
            config.productsCollectionId!,
            productId
        );

        // calculate average rating and total reviews
        const averageRating=product.reviews.reduce((acc:number,review:any)=>acc+review.rating,0)/product.reviews.length
        const totalReviews=product.reviews.length

        // Update product with new average and review count
        await databases.updateDocument(
            config.databaseId!,
            config.productsCollectionId!,
            productId,
            {
                rating: parseFloat(averageRating.toFixed(1)), // round to 1 decimals
                totalReviews
            }
        );

        return Response.json({
            success: true,
            message: "Review created and product rating updated",
            review: createdReview,
            newProductRating: parseFloat(averageRating.toFixed(1)),
            totalReviews
        }, { status: 201 });

    } catch (error) {
        return Response.json({
            success: false,
            message: "Error creating review or updating product rating"
        }, { status: 500 });
    }
}
