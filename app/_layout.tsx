import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="+not-found"
        options={{
          headerStyle: {
            backgroundColor: "#333333",
          },
          headerTitleStyle: {
            color: "#ecf0f1",
            fontSize: 20,
            fontWeight: "bold",
          },
          headerTintColor: "#3498db",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
