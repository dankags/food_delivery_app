import { Stack } from 'expo-router'

export default function OthersLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='(tabs_screens)' options={{title:'Home'}} />
      <Stack.Screen name='detail' options={{title:'Detail'}} />
    </Stack>
  )
}
