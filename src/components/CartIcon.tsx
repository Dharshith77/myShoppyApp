import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import colors from "../styles/colors";
import { useCart } from "../context/CartContext";
import { RootStackParamList } from "../types/navigation";

export default function CartIcon() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { cart } = useCart();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate("Cart")}
    >
      <Ionicons name="cart-outline" size={30} color={colors.primary} />

      {cartCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartCount}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    minWidth: 15,
    height: 15,
    borderRadius: 9,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "bold",
  },
});
