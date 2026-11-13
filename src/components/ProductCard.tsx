import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";
import { Product } from "../types/product";
import PrimaryButton from "./PrimaryButton";
import RatingStars from "./RatingStars";
import { getDisplayPrice } from "../utils/price";
type Props = {
  product: Product;
  onPress: () => void;
  onAddToCart: () => void;
};

export default function ProductCard({ product, onPress, onAddToCart }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text numberOfLines={2} style={styles.title}>
        {product.title}
      </Text>

      <View style={styles.ratingRow}>
        <View style={styles.ratingContainer}>
          <RatingStars rating={product.rating} />
          <Text style={styles.ratingText}>({product.rating.toFixed(1)})</Text>
        </View>
      </View>
      <Text style={styles.stock}>
        {product.stock > 0 ? "In Stock" : "Out of Stock"}
      </Text>

      <Text style={styles.price}>₹{getDisplayPrice(product.price).toLocaleString("en-IN")}</Text>

      <PrimaryButton
        title="Add to Cart"
        onPress={onAddToCart}
        disabled={product.stock === 0}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    margin: 8,
    padding: 10,
    elevation: 2,
  },

  image: {
    width: "100%",
    height: 120,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 10,
    height: 42,
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 13,
    color: colors.gray,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  rating: {
    color: "#f39c12",
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 8,
  },

  stock: {
    color: "green",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginVertical: 10,
  },
});
