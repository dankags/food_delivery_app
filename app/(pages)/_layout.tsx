import { useUser } from '@/contexts/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router'
import { useEffect, useState } from 'react';
import { Models } from 'react-native-appwrite';



export default function PagesLayout() {
  const {isLoggedIn,refetch,loading} = useUser()

  useEffect(()=>{
   if(!isLoggedIn && !loading){ refetch()}
  },[])

  return (
    <Stack
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Protected  guard={!isLoggedIn}>
      <Stack.Screen name='auth' options={{title:'Sign In'}} />
    </Stack.Protected>
    <Stack.Protected  guard={isLoggedIn}>
      <Stack.Screen name='(others)' options={{title:'Home'}} />
    </Stack.Protected>
  </Stack>  
  )
}
