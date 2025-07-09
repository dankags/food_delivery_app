// delete many products
import { config, databases } from '@/lib/apprite.config';

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const { ids } = body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return Response.json({
                success: false,
                message: "No product IDs provided"
            }, { status: 400 });
        }

        const nonDeletedIds: string[] = [];
        const deletedProductsIds:string[]=[]
        for (const id of ids) {
            try {
                await databases.deleteDocument(
                   config.databaseId!,
                   config.productsCollectionId!,
                    id
                );
                deletedProductsIds.push(id);
            } catch (err: any) {
                nonDeletedIds.push(id);
            }
        }

        return Response.json({
            success: true,
            deletedProductsIds,
            nonDeletedIds
        },{status:200});
    } catch (error) {
        return Response.json({
            success: false,
            message: "Error deleting products"
        }, { status: 500 });
    }
}
