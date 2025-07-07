import { Stack } from 'expo-router'

const isLoggedIn = true;

export default function PagesLayout() {
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
