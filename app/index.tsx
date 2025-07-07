import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const user=true
if(!user){
  return <Redirect href="/(pages)/auth/(userAuth)" /> 
}

return <Redirect href="/(pages)/(others)/(tabs_screens)" />

}
