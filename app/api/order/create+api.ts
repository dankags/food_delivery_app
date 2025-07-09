// create order api
import { config, databases } from "@/lib/apprite.config";
import { ID } from "react-native-appwrite";

type itemQuantity = {
    productId: string;
    quantity: number;
    dishType:"main" | "side" | "dessert" | "drink",
    price:number,
    discount?:number,
}


// FRONTEND REMAINDER:const itemQuantity = cart.map(item => JSON.stringify({
//   productId: item.id,
//   quantity: item.qty,
//   dishType: item.type,
//   price: item.price,
//   discount: item.discount ?? 0
// }));


// POST /api/order/create
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required fields
    const requiredFields = [
      "users",
      "products",
      "payments",
      "address",
      "paymentMethod",
      "itemQuantity",
      "paymentStatus",
      "date"
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return Response.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }


   for (const item of body.itemQuantity) {
    try {
        const itemData: itemQuantity = JSON.parse(item);
        if (
          !itemData.dishType ||
          !itemData.price ||
          !itemData.productId ||
          !itemData.quantity
        ) {
          return Response.json(
            {
              error:
                "Invalid itemQuantity format. Each item must have productId, quantity, dishType, and price."
            },
            { status: 400 }
          );
        }
      } catch (e) {
        return Response.json(
          { error: "itemQuantity contains invalid JSON." },
          { status: 400 }
        );
    }
   }

    // Prepare order data for Appwrite
    const orderData = {
      users: body.users,
      products: body.products,
      payments: body.payments,
      address: body.address,
      itemQuantity: body.itemQuantity,
      paymentStatus: body.paymentStatus,
      date: body.date
    };

    // Create the order document
    const order = await databases.createDocument(
      config.databaseId!,
      config.ordersCollectionId!,
      ID.unique(), // Let Appwrite generate a unique ID
      orderData
    );

    if(!order){
        return Response.json(
            { error: "Failed to create order" },
            { status: 500 }
          );
    }

    return Response.json(
      { message: "Order created successfully", order },
      { status: 201 }
    );
  } catch (error: any) {
    return Response.json(
      { error: "Failed to create order", details: error.message || error },
      { status: 500 }
    );
  }
}









