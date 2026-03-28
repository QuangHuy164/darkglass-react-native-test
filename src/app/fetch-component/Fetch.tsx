/* eslint-disable prettier/prettier */
import { fetch } from "expo/fetch";
import { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>Products Listing</Text>
        <View style={{ display: "flex", gap: 20 }}>
          <TouchableOpacity
            onPress={onFetch}
            disabled={isLoading}
            style={styles.button}
          >
            <Text>{isLoading ? "Loading..." : "Fetch Products"}</Text>
          </TouchableOpacity>

          {!isLoading && products.length > 0 && (
            <TextInput
              placeholder="Search name or SKU..."
              value={search}
              onChangeText={setSearch}
            />
          )}
        </View>
      </View>

      <ScrollView style={styles.container}>
        {isLoading && <Text>Connecting Node.js server...</Text>}
        {!isLoading && products.length > 0 && (
          <View>
            <View style={{ flexDirection: "row", paddingBottom: 10 }}>
              <Text style={{ flex: 2, fontWeight: "bold" }}>Name</Text>
              <Text style={{ flex: 1, fontWeight: "bold" }}>SKU</Text>
              <Text style={{ flex: 1, fontWeight: "bold" }}>Price</Text>
            </View>

            {products.map(({ node }) => {
              const firstVariant = node.variants?.edges?.[0]?.node;
              return (
                <View
                  key={node.id}
                  style={{ flexDirection: "row", marginBottom: 10 }}
                >
                  <Text style={{ flex: 2 }}>{node.title}</Text>
                  <Text style={{ flex: 1 }}>{firstVariant?.sku || "null"}</Text>
                  <Text style={{ flex: 1 }}>
                    {firstVariant?.price?.amount || "0"}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
export default Fetch;
