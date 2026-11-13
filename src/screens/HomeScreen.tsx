import {
  Text,
  StyleSheet,
  Image,
  FlatList,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import SearchBar from "../components/SearchBar";
import ScreenContainer from "../components/ScreenContainer";
import PrimaryButton from "../components/PrimaryButton";
import CategoryCard from "../components/CategoryCard";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";
// import { categories } from "../data/categories";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  searchProducts,
  getCategoryThumbnails,
} from "../services/productService";
import { Product } from "../types/product";
import { Category } from "../types/category";

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation<any>();
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getCategoryThumbnails();
    setCategoryList(data);
  };
  const handleSearch = async (text: string) => {
    setSearchText(text);

    if (text.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    try {
      const products = await searchProducts(text);
      setSuggestions(products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScreenContainer>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <View style={styles.logoContainer}>
            <Ionicons name="bag-handle" size={32} color={colors.primary} />

            <Text style={styles.logo}>myShoppy</Text>
          </View>
          <Text style={styles.heading}>Shop Smart. Live Better.</Text>

          <Text style={styles.subtitle}>
            Find everything you need for your home.
          </Text>
          <View style={styles.searchContainer}>
            <SearchBar
              placeholder="Search products..."
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>
          <Image
            source={require("../../assets/images/banner.png")}
            style={styles.banner}
            resizeMode="contain"
          />

          <PrimaryButton
            title="Start Shopping"
            onPress={() => navigation.navigate("Products")}
          />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Categories</Text>

            <Pressable onPress={() => navigation.navigate("Categories")}>
              <Text style={styles.viewAll}>View All</Text>
            </Pressable>
          </View>

          <FlatList
            horizontal
            data={categoryList.slice(0, 6)}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            scrollEnabled
            nestedScrollEnabled
            renderItem={({ item }) => (
              <CategoryCard
                category={item}
                variant="small"
                onPress={() =>
                  navigation.navigate("Products", {
                    category: item.slug,
                  })
                }
              />
            )}
          />
        </ScrollView>
        {suggestions.length > 0 && (
          <>
            <Pressable
              style={styles.overlay}
              onPress={() => {
                setSuggestions([]);
              }}
            />

            <View style={styles.dropdown}>
              <FlatList
                data={suggestions}
                keyExtractor={(item) => item.id.toString()}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSearchText("");
                      setSuggestions([]);

                      navigation.navigate("ProductDetails", {
                        productId: item.id,
                      });
                    }}
                  >
                    <Text numberOfLines={1}>{item.title}</Text>
                  </Pressable>
                )}
              />
            </View>
          </>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.primary,
    marginLeft: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  banner: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginVertical: 15,
  },
  viewAll: {
    color: colors.primary,
    fontWeight: "600",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: colors.gray,
    marginVertical: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15,
  },

  searchContainer: {
    position: "relative",
    zIndex: 100,
  },
  dropdown: {
    position: "absolute",
    top: 205, // adjust slightly if needed
    left: 16,
    right: 16,

    backgroundColor: "#fff",
    borderRadius: 12,

    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    maxHeight: 320,
    zIndex: 999,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    zIndex: 998,
  },
});
