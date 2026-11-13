import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import ScreenContainer from "../components/ScreenContainer";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";
import { RootStackParamList } from "../types/navigation";
import { getProducts, getProductsByCategory } from "../services/productService";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
import FilterButton from "../components/FilterButton";
import colors from "../styles/colors";
import PrimaryButton from "../components/PrimaryButton";
import Toast from "react-native-toast-message";

type ProductsRouteProp = RouteProp<RootStackParamList, "Products">;

export default function ProductListScreen() {
  const route = useRoute<ProductsRouteProp>();
  const navigation = useNavigation<any>();
  const category = route.params?.category || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");
  const [priceFilter, setPriceFilter] = useState<
    "all" | "under500" | "500to1000" | "1000to5000" | "above5000"
  >("all");

  const [stockFilter, setStockFilter] = useState<
    "all" | "instock" | "outofstock"
  >("all");
  const clearFilters = () => {
    setSearchText("");
    setPriceFilter("all");
    setStockFilter("all");
  };

  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = category
        ? await getProductsByCategory(category)
        : await getProducts();

      const updatedProducts = data.map((product, index) => ({
        ...product,
        stock: (index + 1) % 10 === 0 ? 0 : product.stock,
      }));

      setProducts(updatedProducts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ScreenContainer>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      </ScreenContainer>
    );
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesPrice =
      priceFilter === "all"
        ? true
        : priceFilter === "under500"
          ? product.price < 500
          : priceFilter === "500to1000"
            ? product.price >= 500 && product.price < 1000
            : priceFilter === "1000to5000"
              ? product.price >= 1000 && product.price <= 5000
              : product.price > 5000;

    const matchesStock =
      stockFilter === "all"
        ? true
        : stockFilter === "instock"
          ? product.stock > 0
          : product.stock === 0;

    return matchesSearch && matchesPrice && matchesStock;
  });

  return (
    <ScreenContainer>
      <Text style={styles.heading}>{category ? category : "All Products"}</Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No products found</Text>

            <Text style={styles.emptySubtitle}>
              Try a different search or adjust your filters.
            </Text>
            <View style={styles.emptyButtonContainer}>
              <PrimaryButton title="Clear Filters" onPress={clearFilters} />
            </View>
          </View>
        }
        ListHeaderComponent={
          <>
            <SearchBar
              placeholder="Search products..."
              value={searchText}
              onChangeText={setSearchText}
            />

            <Text style={styles.filterTitle}>Price</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterScroll}
            >
              <FilterButton
                title="All"
                selected={priceFilter === "all"}
                onPress={() => setPriceFilter("all")}
              />

              <FilterButton
                title="Under ₹500"
                selected={priceFilter === "under500"}
                onPress={() => setPriceFilter("under500")}
              />

              <FilterButton
                title="₹500 - ₹1000"
                selected={priceFilter === "500to1000"}
                onPress={() => setPriceFilter("500to1000")}
              />

              <FilterButton
                title="₹1000 - ₹5000"
                selected={priceFilter === "1000to5000"}
                onPress={() => setPriceFilter("1000to5000")}
              />

              <FilterButton
                title="Above ₹5000"
                selected={priceFilter === "above5000"}
                onPress={() => setPriceFilter("above5000")}
              />
            </ScrollView>

            <Text style={styles.filterTitle}>Availability</Text>

            <View style={styles.filterRow}>
              <FilterButton
                title="All"
                selected={stockFilter === "all"}
                onPress={() => setStockFilter("all")}
              />

              <FilterButton
                title="In Stock"
                selected={stockFilter === "instock"}
                onPress={() => setStockFilter("instock")}
              />
              <FilterButton
                title="Out of Stock"
                selected={stockFilter === "outofstock"}
                onPress={() => setStockFilter("outofstock")}
              />
            </View>
          </>
        }
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetails", {
                productId: item.id,
              })
            }
            onAddToCart={() => {
              addToCart(item);
              Toast.show({
                type: "info",
                text1: "Item added to cart",
                visibilityTime: 1500,
                position: "bottom",
              });
            }}
          />
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  },
  filterTitle: {
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
  },
  filterScroll: {
    paddingVertical: 5,
    alignItems: "center",
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    paddingHorizontal: 20,
  },
  emptyButtonContainer: {
    marginTop: 20,
    width: "60%",
    alignSelf: "center",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 15,
    color: colors.gray,
    textAlign: "center",
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: colors.gray,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
