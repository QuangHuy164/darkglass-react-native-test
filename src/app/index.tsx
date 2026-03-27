import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopify Products</Text>
      <Link href="/fetch-component/Fetch" asChild>
        <Text style={styles.button}>Fetch Products</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { color: "#000", fontSize: 24, marginBottom: 20 },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 15,
    borderRadius: 8,
  },
});
