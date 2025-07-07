import { Stack } from "expo-router";

export default function UserAuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        gestureEnabled: true,
      }}

    >
      <Stack.Screen
        name="index"
        options={{
          title: "user auth",
        }}
      />
      
    </Stack>
  );
}

