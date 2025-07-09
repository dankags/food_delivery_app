import { config, databases } from "@/lib/apprite.config";

// DELETE /api/order/delete/[id]
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return Response.json(
      { error: 'Order id is required.' },
      { status: 400 }
    );
  }



  try {
    const orderExists = await databases.getDocument(
        config.databaseId!,
        config.ordersCollectionId!,
        id
    );

    if (!orderExists) {
      return Response.json(
        { error: 'Order not found.' },
        { status: 404 }
      );
    }


    // Try to delete the order document
    await databases.deleteDocument(
      config.databaseId!,
      config.ordersCollectionId!,
      id
    );

    return Response.json(
      { message: 'Order deleted successfully', orderId: id },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === 404) {
      return Response.json(
        { error: 'Order not found.' },
        { status: 404 }
      );
    }
    return Response.json(
      { error: 'Failed to delete order', details: error.message || error },
      { status: 500 }
    );
  }
}









