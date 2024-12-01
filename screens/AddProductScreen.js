import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Image } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { addFarmerProduct } from "../api/farmer/addFarmerProduct";
import { uploadImage } from "../api/farmer/uploadProductImage";

const AddProductScreen = ({ route, navigation }) => {
  const { setProducts } = route.params;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [iosImage, setIosImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const selectImage = () => {
    Alert.alert(
      "Select Image",
      "Choose an option",
      [
        {
          text: "Camera",
          onPress: handleCameraPress,
        },
        {
          text: "Gallery",
          onPress: handleGalleryPress,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const handleCameraPress = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry", "We need camera permissions to take a photo.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setIosImage(result.assets[0]);
    }
  };

  const handleGalleryPress = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Sorry",
        "We need camera roll permissions to select an image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setIosImage(result.assets[0]);
    }
  };

  // In AddProductScreen.js, update the handleAddProduct function:
  const handleAddProduct = async () => {
    try {
      console.log("Starting product submission...");

      // Validation
      if (!name || !category || !price || !quantity || !description) {
        Alert.alert("Validation Error", "Please fill in all fields.");
        return;
      }

      const categoryNum = parseInt(category);
      const priceNum = parseFloat(price);
      const quantityNum = parseInt(quantity);

      if (isNaN(categoryNum)) {
        Alert.alert("Validation Error", "Category ID must be a number.");
        return;
      }

      if (isNaN(priceNum)) {
        Alert.alert("Validation Error", "Price must be a valid number.");
        return;
      }

      if (isNaN(quantityNum)) {
        Alert.alert("Validation Error", "Quantity must be a number.");
        return;
      }

      // Show loading state
      setIsLoading(true);

      let image_url = "";
      if (iosImage) {
        console.log("Starting image upload...");
        try {
          image_url = await uploadImage(iosImage);
          console.log("Image uploaded successfully:", image_url);
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError);
          Alert.alert(
            "Upload Error",
            "Failed to upload image. Please try again."
          );
          setIsLoading(false);
          return;
        }
      }

      const productData = {
        name,
        category_id: categoryNum,
        price: priceNum,
        quantity: quantityNum,
        description,
        image_url,
      };

      console.log("Submitting product data:", productData);

      const success = await addFarmerProduct(productData);

      setIsLoading(false);

      if (success) {
        Alert.alert("Success", "Product added successfully!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert(
          "Error",
          "Failed to add product. Please check the console for details."
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error in handleAddProduct:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred. Please check the console for details."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text h3 style={styles.title}>
        Add New Product
      </Text>

      <View style={styles.imageContainer}>
        {iosImage ? (
          <Image
            source={{ uri: iosImage.uri }}
            style={styles.productImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text>No image selected</Text>
          </View>
        )}
        <Button
          title={iosImage ? "Change Image" : "Select Image"}
          onPress={selectImage}
          containerStyle={styles.imageButton}
          type="outline"
        />
      </View>

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
        numberOfLines={3}
      />
      <Button
        title="Add Product"
        onPress={handleAddProduct}
        containerStyle={styles.submitButton}
        loading={isLoading}
        disabled={isLoading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  placeholderImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  imageButton: {
    width: 200,
  },
  submitButton: {
    marginTop: 20,
  },
});

export default AddProductScreen;
