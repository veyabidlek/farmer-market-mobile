// FarmerChatScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button } from "react-native-elements";

import { getBuyerId } from "../api/buyer/getBuyerId";
import { getFarmerMessages } from "../api/farmer/getFarmerMessages";
import { sendFarmerMessage } from "../api/farmer/sendFarmerMessage";
const FarmerChatScreen = ({ route, navigation }) => {
  const { conversationID, product } = route.params;
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [buyerID, setBuyerID] = useState(null);

  useEffect(() => {
    fetchBuyerId();
    fetchMessages();

    // Optionally, set up polling or WebSocket for real-time updates
    const interval = setInterval(() => {
      fetchMessages();
    }, 5000); // Fetch new messages every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchBuyerId = async () => {
    const id = await getBuyerId();
    setBuyerID(id);
  };

  const fetchMessages = async () => {
    try {
      const data = await getFarmerMessages(conversationID);
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleSend = async () => {
    if (content.trim() === "") return;

    try {
      await sendFarmerMessage(conversationID, content.trim());
      setContent("");
      fetchMessages();
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender_id === buyerID ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.content}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: null })}
      keyboardVerticalOffset={Platform.select({ ios: 90, android: 70 })}
    >
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        inverted // To show the latest messages at the bottom
        contentContainerStyle={{ flexDirection: "column-reverse" }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={content}
          onChangeText={setContent}
          placeholder="Type your message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={{ color: "#fff" }}>Send</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Return to Product"
          onPress={() => navigation.navigate("ProductDetail", { product })}
        />
        <Button
          title="See All Chats"
          onPress={() => navigation.navigate("AllChats")}
          buttonStyle={{ marginTop: 10 }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  myMessage: {
    backgroundColor: "#DCF8C5",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default FarmerChatScreen;
