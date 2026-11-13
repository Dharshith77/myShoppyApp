import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { ReactNode } from "react";
import colors from "../styles/colors";

type Props = {
  children: ReactNode;
};

export default function ScreenContainer({ children }: Props) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
});
