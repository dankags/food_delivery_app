// update a product by id

import { config, databases } from '@/lib/apprite.config';

// Update a product by id, with attributes to update provided in the body
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id) {
        return Response.json({
            success: false,
            message: "Product ID is required"
        }, { status: 400 });
    }

    let updateData:any;
    try {
        updateData = await req.json();
    } catch (err) {
        return Response.json({
            success: false,
            message: "Invalid JSON body"
        }, { status: 400 });
    }

    if (!updateData || typeof updateData !== 'object' || Array.isArray(updateData) || Object.keys(updateData).length === 0) {
        return Response.json({
            success: false,
            message: "No attributes provided to update"
        }, { status: 400 });
    }

    try {
        const updatedProduct = await databases.updateDocument(
            config.databaseId!,
            config.productsCollectionId!,
            id,
            updateData
        );
        return Response.json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        }, { status: 200 });
    } catch (error) {
        return Response.json({
            success: false,
            message: "Error updating product"
        }, { status: 500 });
    }
}

