/* eslint-disable prettier/prettier */
import { fetch } from "expo/fetch";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./fetch.styles";

interface ShopifyProps {
  id: string;
  title: string;
  description: string;
  variants?: {
    edges: Array<{
      node: {
        sku: string;
        price: {
          amount: string;
        };
      };
    }>;
  };
}

interface ProductEdgeProps {
  node: ShopifyProps;
}

interface ApiResponse {
  data: {
    edges: ProductEdgeProps[];
  };
}

function Fetch() {
  const [products, setProducts] = useState<ProductEdgeProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const fetchProductsFromBackend = useCallback(
    async (searchProducts: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://10.0.2.2:3000/?search=${encodeURIComponent(searchProducts)}`, //Android emulator networking
        );

        const responseData: ApiResponse = await response.json();

        if (responseData?.data?.edges) {
          setProducts(responseData.data.edges || []);
        }
      } catch (error) {
        console.log("Error while fetching", error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const onFetch = () => {
    fetchProductsFromBackend(search);
  };

  useEffect(() => {
    if (search.length === 0) return;
    const debounceTime = setTimeout(() => {
      fetchProductsFromBackend(search);
    }, 500);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(debounceTime); // remove old timer if users filter be4 500
    };
  }, [search, fetchProductsFromBackend]);

  const renderProduct = ({ item }: { item: any }) => {
    const node = item.node;
    const firstVariant = node.variants?.edges?.[0]?.node;
    return (
      <View style={styles.tableRow}>
        <Text style={[styles.cell, { flex: 2 }]}>{node.title}</Text>
        <Text style={[styles.cell, { flex: 1, color: "#666" }]}>
          {firstVariant?.sku || "N/A"}
        </Text>
        <Text
          style={[
            styles.cell,
            { flex: 1, textAlign: "right", fontWeight: "bold" },
          ]}
        >
          ${firstVariant?.price?.amount || "0.00"}
        </Text>
      </View>
    );
  };

  // Component for the Sticky Header
  const TableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.columnHeader, { flex: 2 }]}>Name</Text>
      <Text style={[styles.columnHeader, { flex: 1 }]}>SKU</Text>
      <Text style={[styles.columnHeader, { flex: 1, textAlign: "right" }]}>
        Price
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Search Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Product Listing</Text>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={onFetch}>
            <Text style={styles.buttonText}>Fetch Products</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.searchInput}
            placeholder="Search name or SKU..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Main List Section */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.node.id}
        ListHeaderComponent={products.length > 0 ? TableHeader : null}
        stickyHeaderIndices={products.length > 0 ? [0] : []}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator
              size="large"
              color="#007bff"
              style={{ marginTop: 20 }}
            />
          ) : (
            <View style={{ height: 40 }} />
          ) // Extra space at bottom
        }
      />
    </SafeAreaView>
  );
}
export default Fetch;
