import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../styles/colors";

type Props = {
  title: string;
  selected: boolean;
  onPress: () => void;
};

export default function FilterButton({ title, selected, onPress }: Props) {
  return (
    <Pressable
      style={[styles.button, selected && styles.selected]}
      onPress={onPress}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
  },

  selected: {
    backgroundColor: colors.primary,
  },

  text: {
    color: colors.primary,
    fontWeight: "600",
  },

  selectedText: {
    color: "#fff",
  },
});
