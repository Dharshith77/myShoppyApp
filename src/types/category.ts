import { ImageSourcePropType } from "react-native";

export interface Category {
  id: string;
  title: string;
  slug: string;
  image: ImageSourcePropType;
  thumbnail?: string;
}
