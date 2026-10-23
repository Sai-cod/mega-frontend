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
import { askAgriGPT } from "./src/services/Api";

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi, I'm AgriGPT 🌱 Ask me anything about crops, soil, weather, or farming best practices.",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  async function addMessage(text) {
    const question = text.trim();

    if (!question || isTyping) {
      return;
    }

    const userMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      text: question,
    };

    setMessages((previous) => [...previous, userMessage]);
    setIsTyping(true);

    try {
      // Send the question to the FastAPI backend.
      const answer = await askAgriGPT(question);

      const assistantMessage = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        text: answer || "The backend returned an empty answer.",
      };

      setMessages((previous) => [...previous, assistantMessage]);
    } catch (error) {
      console.error("AgriGPT API error:", error);

      const errorMessage = {
        id: `${Date.now()}-error`,
        role: "assistant",
        text: "Unable to connect to AgriGPT. Please check that the backend is running, the PC IP address is correct, and your phone can reach the PC.",
      };

      setMessages((previous) => [...previous, errorMessage]);
    } finally {
      setIsTyping(false);
    }
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
