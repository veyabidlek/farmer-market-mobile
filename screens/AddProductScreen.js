// screens/AddProductScreen.js
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Image } from "react-native";
import { Input, Button, Text, ButtonGroup } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

const AddProductScreen = ({ route, navigation }) => {
  const { setProducts } = route.params;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Vegetables");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const categories = ["Vegetables", "Fruits", "Seeds"];

  const pickImage = async () => {
    // Ask for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access gallery is required!"
      );
      return;
    }

    // Pick image
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false, // Expo ImagePicker doesn't support multiple selection
      quality: 0.5, // Resize image to half quality for optimization
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  };

  const handleAddProduct = () => {
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

    // Create new product
    const newProduct = {
      id: Math.random(), // Simple unique ID
      name,
      category,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      description,
      images,
    };

    // Update products list
    setProducts((prevProducts) => [...prevProducts, newProduct]);

    Alert.alert("Success", "Product added successfully!", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text h3 style={{ marginBottom: 20 }}>
        Add New Product
      </Text>
      <Input placeholder="Product Name" value={name} onChangeText={setName} />
      <Text style={{ marginLeft: 10, marginBottom: 5 }}>Category:</Text>
      <ButtonGroup
        buttons={categories}
        selectedIndex={categories.indexOf(category)}
        onPress={(index) => setCategory(categories[index])}
        containerStyle={{ marginBottom: 20 }}
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
      <Button title="Pick Images" onPress={pickImage} />
      <View style={styles.imageContainer}>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </View>
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
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    marginBottom: 10,
  },
});

export default AddProductScreen;
