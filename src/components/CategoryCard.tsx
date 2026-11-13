import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import { Category } from "../types/category";

type Props = {
  category: Category;
  variant?: "small" | "large";
  onPress: () => void;
};

export default function CategoryCard({
  category,
  variant = "small",
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, variant === "small" ? styles.small : styles.large]}
    >
      {Platform.OS === "web" && category.thumbnail ? (
        <>
          <Image
            source={{ uri: category.thumbnail }}
            style={
              variant === "small" ? styles.webSmallImage : styles.webLargeImage
            }
            resizeMode="contain"
          />

          <Text style={styles.webTitle}>{category.title}</Text>
        </>
      ) : (
        <ImageBackground
          source={category.image}
          style={styles.image}
          imageStyle={styles.imageRadius}
        >
          <Text style={styles.title}>{category.title}</Text>
        </ImageBackground>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    borderRadius: 12,
    margin: 8,
  },

  small: {
    width: 140,
    height: 120,
  },

  large: {
    flex: 1,
    height: 170,
  },

  image: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 10,
  },

  imageRadius: {
    borderRadius: 12,
  },

  webSmallImage: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 10,
  },

  webLargeImage: {
    width: "100%",
    height: 130,
    marginTop: 10,
  },
  webTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#222",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "rgba(0,0,0,0.35)",
    padding: 6,
    borderRadius: 6,
  },
});
