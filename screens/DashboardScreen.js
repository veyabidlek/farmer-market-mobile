//DashboardScreen.js
import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button, Text, Icon, Tab, TabView } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/farmer/getFarmerProducts";
import { deleteFarmerProduct } from "../api/farmer/deleteFarmerProduct";
import { getFarmerChatList } from "../api/farmer/getFarmerChatList";

const DashboardScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductList = async () => {
    setLoading(true);
    try {
      const productList = await getProducts();
      if (Array.isArray(productList)) {
        setProducts(productList);
      } else {
        Alert.alert("Error", "Failed to load products.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Error", "Unable to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchChats = async () => {
    setLoading(true);
    try {
      const chatList = await getFarmerChatList();
      setChats(chatList);
    } catch (error) {
      console.error("Error fetching chats:", error);
      Alert.alert("Error", "Unable to fetch chats. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (index === 0) {
        fetchProductList();
      } else {
        fetchChats();
      }
    }, [index])
  );

  const handleDelete = async (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteFarmerProduct(id);
              setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== id)
              );
              Alert.alert("Success", "Product deleted successfully.");
            } catch (error) {
              console.error("Error deleting product:", error);
              Alert.alert(
                "Error",
                "Failed to delete product. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  const handleEdit = (product) => {
    navigation.navigate("Edit Product", { product, setProducts });
  };

  const renderChat = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate("FarmerChat", {
          conversationID: item.id,
          product: item.product, // Make sure your chat list includes product data
        })
      }
    >
      <View style={styles.chatContent}>
        <Text style={styles.buyerName}>Buyer: {item.buyerName}</Text>
        <Text style={styles.productName}>Product: {item.productName}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      <Icon name="chevron-right" type="material" size={24} color="#66BB6A" />
    </TouchableOpacity>
  );

  const ProductsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Products</Text>
        <Button
          title="Add New"
          onPress={() => navigation.navigate("Add Product", { setProducts })}
          buttonStyle={styles.addButton}
          titleStyle={styles.addButtonText}
          icon={
            <Icon
              name="add"
              type="material"
              size={20}
              color="#FFFFFF"
              containerStyle={{ marginRight: 5 }}
            />
          }
          iconRight
        />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : products.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No Products Available</Text>
          <Text style={styles.emptyStateSubtext}>
            Start by adding your first product to showcase your offerings.
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          removeClippedSubviews={true}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );

  const ChatsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Chats</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : chats.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No Active Chats</Text>
          <Text style={styles.emptyStateSubtext}>
            When buyers message you about your products, they'll appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={renderChat}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Tab
        value={index}
        onChange={setIndex}
        indicatorStyle={styles.tabIndicator}
        variant="primary"
      >
        <Tab.Item
          title="Products"
          titleStyle={styles.tabTitle}
          icon={{
            name: "shopping-basket",
            type: "material",
            color: index === 0 ? "#2E7D32" : "#757575",
          }}
        />
        <Tab.Item
          title="Chats"
          titleStyle={styles.tabTitle}
          icon={{
            name: "chat",
            type: "material",
            color: index === 1 ? "#2E7D32" : "#757575",
          }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={styles.tabViewItem}>
          <ProductsTab />
        </TabView.Item>
        <TabView.Item style={styles.tabViewItem}>
          <ChatsTab />
        </TabView.Item>
      </TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
  tabContent: {
    flex: 1,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2E7D32",
  },
  addButton: {
    backgroundColor: "#66BB6A",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  emptyStateText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 12,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: "#388E3C",
    textAlign: "center",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  tabIndicator: {
    backgroundColor: "#2E7D32",
    height: 3,
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  tabViewItem: {
    width: "100%",
  },
  chatItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  chatContent: {
    flex: 1,
    marginRight: 12,
  },
  buyerName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: "#999999",
  },
});

export default DashboardScreen;
