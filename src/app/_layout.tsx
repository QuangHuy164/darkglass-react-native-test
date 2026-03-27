import { Stack } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f0e9ed" }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
    </View>
  );
}
