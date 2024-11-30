import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Image } from "react-native";
import { Input, Button, Text, ButtonGroup } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

const EditProductScreen = ({ route, navigation }) => {
  const { product, setProducts } = route.params;

  const [name, setName] = useState(product.name || "");
  const [category, setCategory] = useState(product.category || "");
  const [price, setPrice] = useState(product.price?.toString() || "");
  const [quantity, setQuantity] = useState(product.quantity?.toString() || "");
  const [description, setDescription] = useState(product.description || "");
  const [images, setImages] = useState(product.images || []);

  const categories = ["Vegetables", "Fruits", "Seeds"];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access gallery is required!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  };

  const handleUpdateProduct = () => {
    if (
      !name.trim() ||
      !category.trim() ||
      !price.trim() ||
      !quantity.trim() ||
      !description.trim()
    ) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    const updatedProduct = {
      ...product,
      name,
      category,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      description,
      images,
    };

    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === product.id ? updatedProduct : p))
    );

    Alert.alert("Success", "Product updated successfully!", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  const handleRemoveImage = (uri) => {
    setImages(images.filter((image) => image !== uri));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text h3 style={{ marginBottom: 20 }}>
        Edit Product
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
          <View key={index} style={{ position: "relative" }}>
            <Image source={{ uri }} style={styles.image} />
            <Button
              title="X"
              type="clear"
              buttonStyle={{
                position: "absolute",
                top: -5,
                right: -5,
                backgroundColor: "red",
                borderRadius: 15,
                width: 20,
                height: 20,
                padding: 0,
              }}
              onPress={() => handleRemoveImage(uri)}
            />
          </View>
        ))}
      </View>
      <Button
        title="Update Product"
        onPress={handleUpdateProduct}
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

export default EditProductScreen;
