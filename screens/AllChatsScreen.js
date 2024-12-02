// AllChatsScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { format } from "date-fns";
import { getChatList } from "../api/buyer/getChats";

const AllChatsScreen = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChatList();
  }, []);

  const fetchChatList = async () => {
    try {
      setLoading(true);
      const data = await getChatList();
      setConversations(data);
    } catch (err) {
      console.error("Error fetching chat list:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderConversation = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() =>
        navigation.navigate("Chat", {
          conversationID: item.id,
          farmerName: item.farmerName,
          product: item.product,
        })
      }
    >
      <View style={styles.conversationContent}>
        <Text style={styles.farmerName}>{item.farmerName || "Farmer"}</Text>
        <Text style={styles.productName}>
          {item.product?.name || "Product"}
        </Text>
        {item.lastMessage && (
          <>
            <Text style={styles.lastMessage} numberOfLines={1}>
              {item.lastMessage.content}
            </Text>
            <Text style={styles.timestamp}>
              {format(new Date(item.lastMessage.timestamp), "MMM d, HH:mm")}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {conversations.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No conversations yet</Text>
        </View>
      ) : (
        <FlatList
          data={conversations}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  listContainer: {
    padding: 12,
  },
  conversationItem: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  conversationContent: {
    gap: 4,
  },
  farmerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  productName: {
    fontSize: 14,
    color: "#666",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
});

export default AllChatsScreen;
