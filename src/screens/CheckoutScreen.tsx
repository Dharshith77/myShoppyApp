import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput } from "react-native";

import ScreenContainer from "../components/ScreenContainer";
import PrimaryButton from "../components/PrimaryButton";
import { useCart } from "../context/CartContext";
import colors from "../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { getDisplayPrice } from "../utils/price";
export default function CheckoutScreen() {
  const navigation = useNavigation<any>();

  const { cart } = useCart();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + getDisplayPrice(item.price) * item.quantity,
    0,
  );

  const delivery = subtotal > 500 ? 0 : 50;

  const total = subtotal + delivery;

  function placeOrder() {
    if (!name || !phone || !address || !city || !pincode) {
      Alert.alert("Validation", "Please fill all fields.");
      return;
    }

    if (phone.length !== 10) {
      Alert.alert("Validation", "Enter a valid phone number.");
      return;
    }

    if (pincode.length !== 6) {
      Alert.alert("Validation", "Enter a valid pincode.");
      return;
    }
    
    navigation.navigate("OrderSuccess");
  }

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Delivery Details</Text>

        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#888"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#888"
          keyboardType="number-pad"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        />

        <TextInput
          placeholder="Delivery Address"
          placeholderTextColor="#888"
          style={[styles.input, { height: 90 }]}
          multiline
          value={address}
          onChangeText={setAddress}
        />

        <TextInput
          placeholder="City"
          placeholderTextColor="#888"
          style={styles.input}
          value={city}
          onChangeText={setCity}
        />

        <TextInput
          placeholder="Pincode"
          placeholderTextColor="#888"
          keyboardType="number-pad"
          style={styles.input}
          value={pincode}
          onChangeText={setPincode}
        />

        <Text style={styles.total}>Total Payable: ₹{total.toLocaleString("en-IN")}</Text>

        <PrimaryButton title="Place Order" onPress={placeOrder} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#222",
  },

  total: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    marginVertical: 20,
  },
});
