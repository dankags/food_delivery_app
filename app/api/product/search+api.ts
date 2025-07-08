import { databases } from '@/lib/apprite.config';
import { Query } from 'react-native-appwrite';

// search for products by name, price, and category
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const name = searchParams.get('name')?.toLowerCase();
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const category = searchParams.get('category')?.toLowerCase();
 
    const queries:string[] = []

    if(!name && !minPrice && !maxPrice){
       return Response.json({
        success:false,
        message:"Please provide a search query"
       },{status:400})
    }
try{
    if(category&&category.length>0){
        queries.push(Query.equal("categories",category))
        const fetchedCategoriesWithRelatedProducts=await databases.listDocuments(
            process.env.DATABASE_ID!,
            process.env.CATEGORY_COLLECTION_ID!,
            [...queries]
        )
        const products:any[]=[]
        fetchedCategoriesWithRelatedProducts.documents.forEach((category)=>{
            products.push(...category.products)
        })
        
        if(products.length===0){
            return Response.json({
                success:false,
                message:"No products found"
            },{status:404})
        }
   
       const filteredProducts:any[]=products.filter((product)=>{
        const isAboveMin = minPrice ? product.price >= minPrice : true;
  const isBelowMax = maxPrice ? product.price <= maxPrice : true;
  const matchesName = name ? product.name.toLowerCase().includes(name.toLowerCase()) : true;

  return isAboveMin && isBelowMax && matchesName;

       })
       return Response.json({
        products:filteredProducts
       },{status:200})
         



    }
     
        if(minPrice&&maxPrice&&name){
            queries.push(Query.between("price",minPrice,maxPrice))
            queries.push(Query.contains("name",name))
        }
        if(minPrice&&maxPrice){
            queries.push(Query.between("price",minPrice,maxPrice))
        }
        if(name){
            queries.push(Query.contains("name",name))
        }
      

        

        const fetchedProducts=await databases.listDocuments(
            process.env.DATABASE_ID!,
            process.env.PRODUCT_COLLECTION_ID!,
            [...queries]
        )
        if(fetchedProducts.documents.length===0){
            return Response.json({
                message:"No products found"
            },{status:404})
        }
        return Response.json({
            products:fetchedProducts.documents
        })

}catch(error){
    return Response.json({
        message:"Error fetching products"
    },{status:500})
}


    
}
