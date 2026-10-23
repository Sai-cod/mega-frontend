import { View, Text, StyleSheet } from "react-native";

export default function MessageBubble({ role, text }) {
  const isUser = role === "user";

  return (
    <View style={[styles.row, isUser ? styles.rowUser : styles.rowAssistant]}>
      {!isUser && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🌱</Text>
        </View>
      )}
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.assistantBubble,
        ]}
      >
        <Text
          style={[styles.text, isUser ? styles.userText : styles.assistantText]}
        >
          {text}
        </Text>
      </View>
    </View>
  );      
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginVertical: 6,
    paddingHorizontal: 12,
    alignItems: "flex-end",
  },
  rowUser: {
    justifyContent: "flex-end",
  },
  rowAssistant: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#2f6f3e",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  avatarText: {
    fontSize: 14,
  },
  bubble: {
    maxWidth: "78%",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: "#3f8f4f",
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: "#2f2f2f",
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
  },
  userText: {
    color: "#ffffff",
  },
  assistantText: {
    color: "#ececec",
  },
});
