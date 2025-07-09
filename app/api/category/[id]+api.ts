// get category by id api
import { config, databases } from "@/lib/apprite.config";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const categoryId = params.id;

    if (!categoryId) {
      return new Response(
        JSON.stringify({ success: false, message: "Category ID is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Replace these with your actual database and collection IDs
    const databaseId = config.databaseId ;
    const collectionId = config.categoriesCollectionId ;

    if(!databaseId || !collectionId){
      return new Response(
        JSON.stringify({ success: false, message: "Database or collection ID is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const category = await databases.getDocument(databaseId, collectionId, categoryId);

    return new Response(
      JSON.stringify({ success: true, category }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: error.message || "Failed to fetch category." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


// update category api
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const categoryId = params.id;

    if (!categoryId) {
      return new Response(
        JSON.stringify({ success: false, message: "Category ID is required." }),
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

    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return new Response(
        JSON.stringify({ success: false, message: "Category name is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const updatedCategory = await databases.updateDocument(
      databaseId,
      collectionId,
      categoryId,
      { name }
    );

    if (!updatedCategory) {
      return new Response(
        JSON.stringify({ success: false, message: "Failed to update category." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, category: updatedCategory }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: error.message || "Failed to update category." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


// delete category api
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const categoryId = params.id;

    if (!categoryId) {
      return new Response(
        JSON.stringify({ success: false, message: "Category ID is required." }),
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

   await databases.deleteDocument(databaseId, collectionId, categoryId);

    return new Response(
      JSON.stringify({ success: true, message: "Category deleted successfully." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: error.message || "Failed to delete category." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
