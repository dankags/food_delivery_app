"use server"
import "server-only"
import { account,avatar,config, databases, storage } from "./apprite.config"
import { ID } from "react-native-appwrite"


//  Sign Up Users
export const signUpUser = async (user:User) => {
    try {
        if(!user.email || !user.password  || !user.phone || !user.fullName){
            throw new Error("All fields are required")
        }
     const userData = await account.create(ID.unique(),user.email,user.password,user.fullName)
      if(!userData){
        throw new Error("Failed to create user")
      }
      const newUser = await databases.createDocument(config.databaseId!,config.usersCollectionId!,userData.$id,{
        email:user.email,
        fullName:user.fullName,
        phone:user.phone,
        avatar:avatar.getInitials(user.fullName),
      })
      if(!newUser){
        throw new Error("Failed to create user")
      }
      const userAvatar = await avatar.getInitials(user.fullName)

    //   create session
    const session = await account.createSession(userData.$id,userData.$id)
    if(!session){
        throw new Error("Failed to create session")
    }
   
      return {session:session,user:newUser,error:null}
    } catch (error:any) {
        console.log(error)
        return {session:null,user:null,error:error.message}
    }
}

//  Sign In Users
export const signInUser = async (user:SignInUser) => {
    try {
        if(!user.email || !user.password){
            throw new Error("All fields are required")
        }
        const userData = await account.createEmailPasswordSession(user.email,user.password)
        if(!userData){
            throw new Error("Failed to sign in user")
        }
        return {loginSuccess:true,error:null}
    } catch (error:any) {
        console.log(error)
        return {loginSuccess:false,error:error.message}
    }
}

// get current user
export const getCurrentUser = async () => {
    try {
        const res=await account.get()
        if(res.$id){
            const userAvatar=await avatar.getInitials(res.name)
            return {
                ...res,
                avatar:userAvatar.toString()
            }
        }
        return res
    } catch (error) {
        console.error(error)
        return null
    }
}