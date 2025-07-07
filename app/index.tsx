import { useUser } from "@/contexts/userContext";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const {isLoggedIn,refetch,loading} = useUser()

  useEffect(()=>{
   if(!isLoggedIn && !loading){ refetch()}
  },[])


if(!isLoggedIn){
  return <Redirect href="/(pages)/auth/(userAuth)" /> 
}

return <Redirect href="/(pages)/(others)/(tabs_screens)" />

}
