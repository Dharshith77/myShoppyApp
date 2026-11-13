import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import ScreenContainer from "../components/ScreenContainer";
import PrimaryButton from "../components/PrimaryButton";
import { RootStackParamList } from "../types/navigation";
import { Product } from "../types/product";
import { getProductById } from "../services/productService";
import colors from "../styles/colors";
import RatingStars from "../components/RatingStars";
import { useCart } from "../context/CartContext";
import Toast from "react-native-toast-message";
import { getDisplayPrice } from "../utils/price";
type ProductRouteProp = RouteProp<RootStackParamList, "ProductDetails">;

export default function ProductDetailsScreen() {
  const route = useRoute<ProductRouteProp>();

  const { productId } = route.params;

  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const data = await getProductById(productId);

      const updatedProduct = {
        ...data,
        stock: data.id % 10 === 0 ? 0 : data.stock,
      };

      setProduct(updatedProduct);
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

  if (!product) {
    return (
      <ScreenContainer>
        <Text>Product not found.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.ratingRow}>
          <RatingStars rating={product.rating} size={22} />
          <Text style={styles.ratingValue}>({product.rating.toFixed(1)})</Text>
        </View>

        <Text style={styles.price}>₹{getDisplayPrice(product.price).toLocaleString("en-IN")}</Text>

        <Text style={styles.stock}>
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </Text>

        <Text style={styles.heading}>Description</Text>

        <Text style={styles.description}>{product.description}</Text>

        <PrimaryButton
          title={product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          onPress={() => {
            addToCart(product);
            Toast.show({
              type: "info",
              text1: "Item added to cart",
              visibilityTime: 1500,
              position: "bottom",
            });
          }}
          disabled={product.stock === 0}
        />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 280,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },

  rating: {
    fontSize: 16,
    marginTop: 10,
    color: "#f39c12",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  ratingValue: {
    marginLeft: 8,
    fontSize: 16,
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    marginVertical: 12,
  },

  stock: {
    color: "green",
    fontWeight: "600",
    marginBottom: 20,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginBottom: 25,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.gray,
  },
});
