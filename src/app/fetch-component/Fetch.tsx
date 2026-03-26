/* eslint-disable prettier/prettier */
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";

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
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const navigate = useNavigation();

  const fetchProductsFromBackend = useCallback(
    async (searchProducts: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000?search=${encodeURIComponent(searchProducts)}`,
        );

        const responseData: ApiResponse = await response.json();

        if (responseData?.data?.edges) {
          setProducts(responseData.data.edges || []);
        }
        setHasFetched(true);
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
    if (!hasFetched) return;
    const debounceTime = setTimeout(() => {
      fetchProductsFromBackend(search);
    }, 500);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(debounceTime); // remove old timer if users filter be4 500
    };
  }, [search, hasFetched, fetchProductsFromBackend]);

  //   const returnBtn = () => {
  //     navigate.navigate('Index');
  //   };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <header style={{ padding: "20px 40px", borderBottom: "1px" }}>
        <h2>Products Listing</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <button
            type="button"
            onClick={onFetch}
            disabled={isLoading}
            style={{ background: "#007bff", color: "#fff" }}
          >
            {isLoading ? "Loading..." : "Fetch Products"}
          </button>

          {!isLoading && products.length > 0 && (
            <input
              style={{ padding: "10px", marginLeft: "40px" }}
              type="text"
              placeholder="Search name or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
          {/* <button type="button" onClick={returnBtn}>
              Homepage
            </button> */}
        </div>
      </header>

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isLoading && <p>Connecting Node.js server...</p>}
        {!isLoading && products.length > 0 && (
          <table>
            <thead>
              <tr>
                <th style={{ position: "sticky", top: 0 }}>Name</th>
                <th style={{ position: "sticky" }}>SKU</th>
                <th style={{ position: "sticky" }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map(({ node }) => {
                const firstVariant = node.variants?.edges?.[0].node;
                return (
                  <tr key={node.id}>
                    <td style={{ padding: "10px" }}>{node.title}</td>
                    <td style={{ padding: "10px" }}>
                      {firstVariant?.sku || "null"}
                    </td>
                    <td style={{ padding: "10px" }}>
                      {firstVariant?.price.amount}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
export default Fetch;
