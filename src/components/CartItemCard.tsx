import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CartItem } from "../context/CartContext";
import RatingStars from "./RatingStars";
import colors from "../styles/colors";
import { getDisplayPrice } from "../utils/price";
type Props = {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export default function CartItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />

      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>

        <RatingStars rating={item.rating} />

        <Text style={styles.price}> ₹{getDisplayPrice(item.price).toLocaleString("en-IN")}</Text>

        <View style={styles.quantityRow}>
          <Pressable style={styles.qtyButton} onPress={onDecrease}>
            <Text style={styles.qtyText}>-</Text>
          </Pressable>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <Pressable style={styles.qtyButton} onPress={onIncrease}>
            <Text style={styles.qtyText}>+</Text>
          </Pressable>
        </View>

        <Pressable style={styles.removeButton} onPress={onRemove}>
          <Ionicons name="trash-outline" size={18} color="red" />

          <Text style={styles.removeText}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    elevation: 2,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },

  info: {
    flex: 1,
    marginLeft: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginVertical: 8,
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  qtyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  quantity: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: "bold",
  },

  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  removeText: {
    color: "red",
    marginLeft: 5,
    fontWeight: "600",
  },
});
