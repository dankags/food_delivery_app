import {
  // Rubik_300Light,
  // Rubik_300Light_Italic,
  // Rubik_400Regular,
  // Rubik_400Regular_Italic,
  // Rubik_500Medium,
  // Rubik_500Medium_Italic,
  // Rubik_600SemiBold,
  // Rubik_600SemiBold_Italic,
  // Rubik_700Bold,
  // Rubik_700Bold_Italic,
  // Rubik_800ExtraBold,
  // Rubik_800ExtraBold_Italic,
  Rubik_900Black,
  // Rubik_900Black_Italic,
} from '@expo-google-fonts/rubik';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";
import { useUser } from '@/contexts/userContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const {refetch,loading} = useUser()
  const [fontsLoaded, fontError] = useFonts({
    'Quicksand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
    'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    Rubik_900Black,
  });

  useEffect(()=>{
    refetch()
  },[])

  useEffect(() => {
    if (fontsLoaded || fontError || !loading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError,loading]);

  // Don't render until fonts are loaded
  if (!fontsLoaded && !fontError && loading) {
    return null;
  }



  return (

      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{headerShown:false}}/>
      </GestureHandlerRootView>

  );
}
