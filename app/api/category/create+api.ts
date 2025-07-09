// create category api
import { config, databases } from "@/lib/apprite.config";
import { ID, Query } from "react-native-appwrite";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const categories:string[] = body

    if(categories.length === 0){
      return new Response(
        JSON.stringify({ success: false, message: "Categories are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const databaseId = config.databaseId ;
    const collectionId = config.categoriesCollectionId ;

    if (!databaseId || !collectionId) {
      return new Response(
        JSON.stringify({ success: false, message: "Database or collection ID is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create categories
    const createdCategories:string[] = [];
    for (const cat of categories) {
      const created = await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        { name:cat }
      );
      if(created){
      createdCategories.push(cat);
      }
    }
    
    const failedCategories = categories.filter(cat => !createdCategories.includes(cat));

    if(failedCategories.length > 0){
      return new Response(
        JSON.stringify({ success: false,categories:createdCategories,failedCategories, message: "Failed to create categories." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        categories: createdCategories,
        failedCategories,
        message: "Categories created successfully."
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: error.message || "Failed to create category." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


