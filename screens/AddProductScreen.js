// screens/AddProductScreen.js
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { addFarmerProduct } from "../api/farmer/addFarmerProduct";

const AddProductScreen = ({ route, navigation }) => {
  const { setProducts } = route.params;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const handleAddProduct = async () => {
    // Validate inputs
    if (
      name.trim() === "" ||
      category.trim() === "" ||
      price.trim() === "" ||
      quantity.trim() === "" ||
      description.trim() === ""
    ) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }

    try {
      const success = await addFarmerProduct(
        name,
        parseFloat(price),
        parseInt(quantity),
        description,
        parseInt(category)
      );

      if (success) {
        Alert.alert("Success", "Product added successfully!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert("Error", "Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      Alert.alert("Error", "An error occurred while adding the product.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text h3 style={{ marginBottom: 20 }}>
        Add New Product
      </Text>
      <Input placeholder="Product Name" value={name} onChangeText={setName} />
      <Input
        placeholder="Category ID"
        value={category}
        onChangeText={setCategory}
        keyboardType="numeric"
      />
      <Input
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Input
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <Input
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button
        title="Add Product"
        onPress={handleAddProduct}
        containerStyle={{ marginTop: 20 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default AddProductScreen;
