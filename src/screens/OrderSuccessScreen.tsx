import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenContainer from "../components/ScreenContainer";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";
export default function OrderSuccessScreen() {
  const navigation = useNavigation<any>();
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
  }, []);
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Ionicons name="checkmark-circle" size={120} color="green" />

        <Text style={styles.title}>Order Placed Successfully!</Text>

        <Text style={styles.subtitle}>Thank you for shopping.</Text>
        <View style={styles.emptyButtonContainer}>
          <PrimaryButton
            title="Continue Shopping"
            onPress={() => navigation.navigate("Main")}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginVertical: 15,
  },
  emptyButtonContainer: {
    marginTop: 20,
    width: "60%",
    alignSelf: "center",
  },
});
