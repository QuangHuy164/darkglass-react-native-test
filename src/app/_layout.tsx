import { Stack } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#ce4b93" }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
    </View>
  );
}
