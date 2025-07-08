import { databases } from "@/lib/apprite.config";
import { ID } from "react-native-appwrite";

// Create many products
export async function PUT(req: Request) {
    try {
      const body = await req.json();
  
      if (!Array.isArray(body) || body.length === 0) {
        return new Response(
          JSON.stringify({ success: false, message: "An array of products is required." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
  
      const databaseId = process.env.APPWRITE_DATABASE_ID;
      const collectionId = process.env.APPWRITE_PRODUCT_COLLECTION_ID;
  
      if (!databaseId || !collectionId) {
        return new Response(
          JSON.stringify({ success: false, message: "Database or collection ID is required." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
  
      const createdProducts: any[] = [];
      const failedProducts: any[] = [];
  
      for (const product of body) {
        const { name, price, description, categoryIds,image,discount, ...rest } = product;

        if (!name || !price || !categoryIds || categoryIds.length === 0 || !image || !description) {
          failedProducts.push({ ...product, reason: "Missing required fields" });
          continue;
        }
       
        try {
          const created = await databases.createDocument(
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
          createdProducts.push(created);
        } catch (err: any) {
          failedProducts.push({ ...product, reason: err.message || "Failed to create" });
        }
      }
  
      return new Response(
        JSON.stringify({
          success: failedProducts.length === 0,
          createdProducts,
          failedProducts,
          message: failedProducts.length === 0
            ? "All products created successfully."
            : "Some products failed to create."
        }),
        { status: failedProducts.length === 0 ? 201 : 207, headers: { "Content-Type": "application/json" } }
      );
    } catch (error: any) {
      return new Response(
        JSON.stringify({ success: false, message: error.message || "Failed to create products." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }