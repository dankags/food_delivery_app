// handle if user is autheticated

import { getCurrentUser } from "@/lib/user.action"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Models } from "react-native-appwrite"
import { create } from "zustand"

type LoggedInUser = {
    $id:string,
    name:string,
    email:string,
    avatar:string
}

type UserContextType = {
    isLoggedIn:boolean,
    user:LoggedInUser|null,
    loading:boolean,
    refetch:()=>void
}

export const useUser = create<UserContextType>((set) => ({
    isLoggedIn: false,
    user: null,
    loading: true,
    refetch: async () => {
        set({ loading: true });
        try {
            const user = await getCurrentUser();
            if (user) {
                set({ isLoggedIn: true, user: user as LoggedInUser, loading: false });
            } else {
                set({ isLoggedIn: false, user: null, loading: false });
            }
        } catch (error) {
            console.log(error);
            set({ isLoggedIn: false, user: null, loading: false });
        }
    }
}));
    