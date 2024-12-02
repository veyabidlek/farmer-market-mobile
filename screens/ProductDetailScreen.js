// screens/ProductDetailScreen.js
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import { startChat } from "../api/buyer/startChat";
import { useContext } from "react";
import { BasketContext } from "../contexts/BasketContext";
const CATEGORIES = [
  { id: 1, name: "Fruits" },
  { id: 2, name: "Vegetables" },
  { id: 3, name: "Dairy" },
  { id: 4, name: "Plants" },
  { id: 5, name: "Others" },
];
const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState("1");
  const { addToBasket } = useContext(BasketContext); // Use BasketContext

  const handlePlaceOrder = () => {
    const qty = parseInt(quantity);
    if (qty < 1) {
      Alert.alert("Error", "Quantity must be at least 1.");
      return;
    }
    addToBasket(product, qty);
    Alert.alert("Success", "Product added to basket.", [
      { text: "Go to Basket", onPress: () => navigation.navigate("Basket") },
      { text: "Continue Shopping", onPress: () => navigation.goBack() },
    ]);
  };

  const handleStartChat = async () => {
    try {
      const farmerID = product.farmer_id;
      console.log("farmer id: ", product.farmer_id);
      const conversation = await startChat(farmerID);
      const conversationID = conversation;
      navigation.navigate("Chat", { conversationID, product });
    } catch (err) {
      console.error("Error starting chat:", err);
      Alert.alert("Error", "Unable to start chat. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Product Images */}
      <ScrollView horizontal>
        <Image source={{ uri: product.image_url }} style={styles.image} />
      </ScrollView>
      {/* Product Details */}
      <Text h4 style={{ marginTop: 20 }}>
        {product.name}
      </Text>
      <Text style={styles.category}>
        {CATEGORIES.find((cat) => cat.id === product.category_id)?.name ||
          "Others"}
      </Text>
      <Text style={styles.text}>Price: ₸{product.price}</Text>
      <Text style={styles.text}>Quantity Available: {product.quantity}</Text>
      <Text style={styles.text}>Farm Location: {product.farm_location}</Text>
      <Text style={styles.description}>{product.description}</Text>
      {/* Order Section */}
      <Input
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={{ width: 100 }}
      />
      <Button title="Add to Basket" onPress={handlePlaceOrder} />{" "}
      <Button
        title="Start Chat"
        onPress={handleStartChat}
        buttonStyle={{ marginTop: 10 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: 300,
    height: 200,
    marginRight: 10,
    borderRadius: 10,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});

export default ProductDetailScreen;
