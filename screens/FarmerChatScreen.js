import React, { useState, useEffect, useRef } from "react";
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

import { getFarmerMessages } from "../api/farmer/getFarmerMessages";
import { sendFarmerMessage } from "../api/farmer/sendFarmerMessage";
import { getFarmerId } from "../api/farmer/getFarmerId";

const FarmerChatScreen = ({ route, navigation }) => {
  const { conversationID, product } = route.params;
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [farmerID, setFarmerID] = useState(null);
  const flatListRef = useRef();

  useEffect(() => {
    fetchFarmerId();
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchFarmerId = async () => {
    try {
      const id = await getFarmerId();
      setFarmerID(id);
    } catch (err) {
      console.error("Error fetching farmer ID:", err);
    }
  };

  const fetchMessages = async () => {
    try {
      const data = await getFarmerMessages(conversationID);
      // Sort messages by timestamp ascending (oldest first)
      const sortedData = data.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
      setMessages(sortedData);
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
      // Scroll to the end after sending a message
      flatListRef.current.scrollToEnd({ animated: true });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender_id === farmerID ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <Text
        style={[
          item.sender_id === farmerID
            ? styles.myMessageText
            : styles.otherMessageText,
        ]}
      >
        {item.content}
      </Text>
      <Text style={styles.timestamp}>
        {new Date(item.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: null })}
      keyboardVerticalOffset={Platform.select({ ios: 90, android: 70 })}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        // Remove the inverted prop
        onContentSizeChange={() =>
          flatListRef.current.scrollToEnd({ animated: true })
        }
        onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
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
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  myMessage: {
    backgroundColor: "#008000", // Green for farmer messages
    alignSelf: "flex-end",
    borderTopRightRadius: 2,
  },
  otherMessage: {
    backgroundColor: "#0000FF", // Blue for buyer messages
    alignSelf: "flex-start",
    borderTopLeftRadius: 2,
  },
  myMessageText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  otherMessageText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "#FFFFFF",
    alignSelf: "flex-end",
    marginTop: 4,
    opacity: 0.8,
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
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
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
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
  },
});

export default FarmerChatScreen;
