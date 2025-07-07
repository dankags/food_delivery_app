"use server"
import "server-only"
import { Account, Avatars, Client, Databases, Storage } from "react-native-appwrite"

export const config = {
 platform:"com.dankags.foodDeliveryApp",
 endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
 projectId:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
 databaseId:process.env.APPWRITE_DATABASE_ID,
  bucketId: process.env.APPWRITE_BUCKET_ID,
  usersCollectionId: process.env.APPWRITE_USERS_COLLECTION_ID,
  ordersCollectionId: process.env.APPWRITE_ORDERS_COLLECTION_ID,
  productsCollectionId: process.env.APPWRITE_PRODUCTS_COLLECTION_ID,
  categoriesCollectionId: process.env.APPWRITE_CATEGORIES_COLLECTION_ID,
  reviewsCollectionId: process.env.APPWRITE_REVIEWS_COLLECTION_ID,
  paymentsCollectionId: process.env.APPWRITE_PAYMENTS_COLLECTION_ID,

  
 }

 export const client = new Client();
 client
   .setEndpoint(config.endpoint!)
   .setProject(config.projectId!)
   .setPlatform(config.platform!);
 
 export const avatar = new Avatars(client);
 export const account = new Account(client);
 export const databases = new Databases(client);
export const storage = new Storage(client);

