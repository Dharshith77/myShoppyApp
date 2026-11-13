import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import CartScreen from "../screens/CartScreen";
import colors from "../styles/colors";
import { BottomTabParamList } from "../types/navigation";
import { useCart } from "../context/CartContext";
import { View, Text, StyleSheet } from "react-native";
const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabs() {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",

        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Categories") {
            iconName = "grid-outline";
          } else {
            iconName = "cart-outline";
          }
          if (route.name === "Cart") {
            return (
              <View>
                <Ionicons name="cart-outline" size={size} color={color} />

                {cart.length > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cartCount}</Text>
                  </View>
                )}
              </View>
            );
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen name="Categories" component={CategoriesScreen} />

      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -2,
    right: -8,

    minWidth: 16,
    height: 16,
    borderRadius: 8,

    backgroundColor: "red",

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 2,
  },

  badgeText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "bold",
  },
});
