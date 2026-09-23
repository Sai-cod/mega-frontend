import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import Header from "./src/components/Header";
import Chatbox from "./src/components/Chatbox";
import Messages from "./src/components/Messages";

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi, I'm AgriGPT 🌱 Ask me anything about crops, soil, weather, or farming best practices.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  function addMessage(text) {
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      text,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // TODO: replace this with a real call to your backend / model API
    setTimeout(() => {
      const reply = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: "This is a placeholder response. Wire me up to your backend to get real answers.",
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 900);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Header title="AgriGPT" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={styles.flex}>
          <Messages messages={messages} isTyping={isTyping} />
        </View>
        <Chatbox onSend={addMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
  },
  flex: {
    flex: 1,
  },
});
