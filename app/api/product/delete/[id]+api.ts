// delete a product by id
import { config, databases } from '@/lib/apprite.config';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id) {
        return Response.json({
            success: false,
            message: "Product ID is required"
        }, { status: 400 });
    }

    try {
        await databases.deleteDocument(
            config.databaseId!,
            config.productsCollectionId!,
            id
        );
        return Response.json({
            success: true,
            message: "Product deleted successfully",
            deletedProductId: id
        }, { status: 200 });
    } catch (error) {
        return Response.json({
            success: false,
            message: "Error deleting product"
        }, { status: 500 });
    }
}
