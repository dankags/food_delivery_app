import { config, databases } from "@/lib/apprite.config";
import { Query } from "react-native-appwrite";

// delete many categories api
export async function DELETE(req: Request) {
    try {
      const body = await req.json();
      const categories:string[] = body
      const databaseId = config.databaseId ;
    const collectionId = config.categoriesCollectionId ;
  
      if(!databaseId || !collectionId){
        return new Response(
          JSON.stringify({ success: false, message: "Database or collection ID is required." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
  
      if(categories.length === 0){
        return new Response(
          JSON.stringify({ success: false, message: "Categories are required." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
  
      const fetchedCategories = await databases.listDocuments(databaseId, collectionId, [Query.equal("name", categories),Query.orderAsc("$id"),Query.select(["$id","name"])])
      const failedCategories:string[] = []
     for(const cat of fetchedCategories.documents){
      const deleted = await databases.deleteDocument(databaseId, collectionId, cat.$id)
      if(!deleted){
        failedCategories.push(cat.name)
      }
     }
  
     return new Response(
      JSON.stringify({ success: true, message: "Categories deleted successfully." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
     );
  
    } catch (error: any) {
      return new Response(
        JSON.stringify({ success: false, message: error.message || "Failed to delete categories." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }