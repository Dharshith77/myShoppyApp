import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  rating: number;
  size?: number;
};

export default function RatingStars({ rating, size = 16 }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        let iconName: "star" | "star-half" | "star-outline";

        if (rating >= star) {
          iconName = "star";
        } else if (rating >= star - 0.5) {
          iconName = "star-half";
        } else {
          iconName = "star-outline";
        }

        return (
          <Ionicons key={star} name={iconName} size={size} color="#FFC107" />
        );
      })}
    </View>
  );
}
