import { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text } from "react-native";

import ScreenContainer from "../components/ScreenContainer";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
// import { categories } from "../data/categories";
import { Category } from "../types/category";
import { getCategoryThumbnails } from "../services/productService";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomTabParamList, RootStackParamList } from "../types/navigation";

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, "Categories">,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function CategoriesScreen() {
  const [search, setSearch] = useState("");
  const navigation = useNavigation<NavigationProp>();
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getCategoryThumbnails();
    setCategoryList(data);
  };
  const filteredCategories = categoryList.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ScreenContainer>
      <Text style={styles.heading}>Categories</Text>

      <SearchBar
        placeholder="Search categories..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            variant="large"
            onPress={() =>
              navigation.navigate("Products", {
                category: item.slug,
              })
            }
          />
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
