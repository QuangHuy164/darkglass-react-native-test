import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  controls: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  listContent: {
    flexGrow: 1, // Crucial for scrolling properly
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#eee",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  columnHeader: {
    fontWeight: "bold",
    fontSize: 14,
  },
  tableRow: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#fafafa",
    alignItems: "center",
  },
  cell: {
    fontSize: 14,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#999",
  },
});
