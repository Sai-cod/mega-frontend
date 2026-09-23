import { useRef } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import MessageBubble from "./MessageBubble";

export default function Messages({ messages, isTyping }) {
  const listRef = useRef(null);

  return (
    <FlatList
      ref={listRef}
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MessageBubble role={item.role} text={item.text} />
      )}
      contentContainerStyle={styles.list}
      ListFooterComponent={
        isTyping ? (
          <View style={styles.typingRow}>
            <View style={styles.typingBubble}>
              <Text style={styles.typingText}>AgriGPT is typing…</Text>
            </View>
          </View>
        ) : null
      }
      onContentSizeChange={() =>
        listRef.current?.scrollToEnd({ animated: true })
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 12,
    flexGrow: 1,
  },
  typingRow: {
    paddingHorizontal: 12,
    marginVertical: 6,
    marginLeft: 36,
  },
  typingBubble: {
    backgroundColor: "#2f2f2f",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    alignSelf: "flex-start",
  },
  typingText: {
    color: "#9a9a9a",
    fontStyle: "italic",
    fontSize: 14,
  },
});
