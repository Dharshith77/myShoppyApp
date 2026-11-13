import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({ placeholder, value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={22} color={colors.gray} />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    elevation: 2,
    marginVertical: 15,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
});
