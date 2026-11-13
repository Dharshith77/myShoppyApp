import { StyleSheet } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { CartProvider } from "./src/context/CartContext";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <CartProvider>
      <AppNavigator />
      <Toast />
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
