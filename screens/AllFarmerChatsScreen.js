// AllChatsScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { getFarmerChatList } from "../api/farmer/getFarmerChatList";

const AllFarmerChatsScreen = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);
  const [farmerName, setFarmerName] = useState("Dave");
  useEffect(() => {
    fetchChatList();
  }, []);

  const fetchChatList = async () => {
    try {
      const data = await getFarmerChatList();
      setConversations(data);
    } catch (err) {
      console.error("Error fetching chat list:", err);
    }
  };

  const renderConversation = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => navigation.navigate("Chat", { conversationID: item.id })}
    >
      <Text style={styles.conversationText}>
        Conversation with Farmer {farmerName || ""}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        renderItem={renderConversation}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  conversationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  conversationText: {
    fontSize: 16,
  },
});

export default AllFarmerChatsScreen;
