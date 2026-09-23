import { View, Text, StyleSheet, StatusBar, Platform } from "react-native";

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight || 24) + 10 : 12,
    paddingBottom: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#171717",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#2f2f2f",
  },
  title: {
    color: "#ececec",
    fontSize: 17,
    fontWeight: "600",
  },
});
