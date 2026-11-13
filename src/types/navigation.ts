import { NavigatorScreenParams } from "@react-navigation/native";
export type RootStackParamList = {
  Main: NavigatorScreenParams<BottomTabParamList>;
  Cart: undefined;
  Products: {
    category?: string;
    search?: string;
  };

  ProductDetails: {
    productId: number;
  };

  Checkout: undefined;

  OrderSuccess: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Categories: undefined;
  Cart: undefined;
};
