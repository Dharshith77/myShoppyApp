import { FlatList, StyleSheet, Text, View } from "react-native";

import ScreenContainer from "../components/ScreenContainer";
import { useCart } from "../context/CartContext";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import CartItemCard from "../components/CartItemCard";
import { getDisplayPrice } from "../utils/price";
export default function CartScreen() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const subtotal = cart.reduce(
    (total, item) => total + getDisplayPrice(item.price) * item.quantity,
    0,
  );

  const deliveryCharge = subtotal > 500 ? 0 : 20;

  const totalAmount = subtotal + deliveryCharge;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  if (cart.length === 0) {
    return (
      <ScreenContainer>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>

          <Text style={styles.emptySubtitle}>
            Looks like you haven't added any products yet.
          </Text>
          <View style={styles.emptyButtonContainer}>
            <PrimaryButton
              title="Continue Shopping"
              onPress={() =>
                navigation.navigate("Products", {
                  category: "",
                })
              }
            />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItemCard
            item={item}
            onIncrease={() => increaseQuantity(item.id)}
            onDecrease={() => decreaseQuantity(item.id)}
            onRemove={() => removeFromCart(item.id)}
          />
        )}
        ListFooterComponent={
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text>Subtotal</Text>

              <Text>₹{subtotal.toLocaleString("en-IN")}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text>Delivery</Text>

              <Text>
                {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.totalText}>Total</Text>

              <Text style={styles.totalText}> ₹{totalAmount.toLocaleString("en-IN")}</Text>
            </View>

            <PrimaryButton
              title="Proceed to Checkout"
              onPress={() => navigation.navigate("Checkout")}
            />
          </View>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  empty: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyButtonContainer: {
    marginTop: 20,
    width: "60%",
    alignSelf: "center",
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  emptySubtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  summaryContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    elevation: 2,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
