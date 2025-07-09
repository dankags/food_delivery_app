import { config, databases } from "@/lib/apprite.config";
import { ID } from "react-native-appwrite";

// Create a single product
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required fields for a product
    const { name, price, description, categoryIds,image,discount, ...rest } = body;

    if (!name || !price || !categoryIds || categoryIds.length === 0 || !image || !description) {
      return new Response(
        JSON.stringify({ success: false, message: "Product name, price, and categoryId are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const databaseId = config.databaseId ;
    const collectionId = config.productsCollectionId ;

    if (!databaseId || !collectionId) {
      return new Response(
        JSON.stringify({ success: false, message: "Database or collection ID is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const createdProduct = await databases.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      {
        name,
        price,
        description: description || "",
        categoryIds,
        image,
        discount,
        ...rest
      }
    );

    return new Response(
      JSON.stringify({ success: true, product: createdProduct, message: "Product created successfully." }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: error.message || "Failed to create product." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}



 
