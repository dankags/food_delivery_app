import { config, databases } from "@/lib/apprite.config";
import { Query } from "react-native-appwrite";

// Get all categories API
export async function GET(req: Request) {
  try {
    const databaseId = config.databaseId ;
    const collectionId = config.categoriesCollectionId ;

    if (!databaseId || !collectionId) {
      return new Response(
        JSON.stringify({ success: false, message: "Database or collection ID is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const categories = await databases.listDocuments(databaseId, collectionId);

    return new Response(
      JSON.stringify({ success: true, categories: categories.documents }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: error.message || "Failed to fetch categories." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Get one or more categories by names (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    let names: string[] = [];

    // Accepts either a single string or an array of strings
    if (typeof body === "string") {
      names = [body];
    } else if (Array.isArray(body)) {
      names = body;
    } else if (body && Array.isArray(body.names)) {
      names = body.names;
    }

    if (!names || names.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Category name(s) are required." }),
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

    // Query for categories whose name is in the provided names array
    const categories = await databases.listDocuments(
      databaseId,
      collectionId,
      [Query.or([
        Query.contains("name", names),
        Query.equal("name", names),  
      ])]
    );

    if(categories.documents.length === 0){
      return new Response(
        JSON.stringify({ success: false, message: "No categories found." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, categories: categories.documents }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: error.message || "Failed to fetch categories." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
