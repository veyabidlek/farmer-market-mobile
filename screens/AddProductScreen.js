// AddProductScreen.js
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { Input, Button, Text, Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { addFarmerProduct } from "../api/farmer/addFarmerProduct";
import { uploadImage } from "../api/farmer/uploadProductImage";
import { COLORS } from "../theme"; // Importing from theme.js (if created)

const CATEGORIES = [
  { id: 1, name: "Fruits" },
  { id: 2, name: "Vegetables" },
  { id: 3, name: "Dairy" },
  { id: 4, name: "Plants" },
  { id: 5, name: "Others" },
];

const { width } = Dimensions.get("window");

const AddProductScreen = ({ route, navigation }) => {
  const { setProducts } = route.params;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("1"); // Default to first category
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
      Alert.alert(
        "Permission Denied",
        "Camera permissions are required to take a photo."
      );
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
        "Permission Denied",
        "Media library permissions are required to select a photo."
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

  const handleAddProduct = async () => {
    try {
      // Validation
      if (!name || !category || !price || !quantity || !description) {
        Alert.alert("Validation Error", "Please fill in all fields.");
        return;
      }

      const categoryNum = parseInt(category);
      const priceNum = parseFloat(price);
      const quantityNum = parseInt(quantity);

      if (isNaN(priceNum)) {
        Alert.alert("Validation Error", "Price must be a valid number.");
        return;
      }

      if (isNaN(quantityNum)) {
        Alert.alert("Validation Error", "Quantity must be a number.");
        return;
      }

      setIsLoading(true);

      let image_url = "";
      if (iosImage) {
        try {
          image_url = await uploadImage(iosImage);
        } catch (uploadError) {
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

      const success = await addFarmerProduct(productData);

      setIsLoading(false);

      if (success) {
        Alert.alert("Success", "Product added successfully!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
        // Optionally, update the product list if the API returns the new product
        setProducts((prevProducts) => [...prevProducts, productData]);
      } else {
        Alert.alert("Error", "Failed to add product. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
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
            <Text style={styles.placeholderText}>No image selected</Text>
          </View>
        )}
        <Button
          title={iosImage ? "Change Image" : "Select Image"}
          onPress={selectImage}
          containerStyle={styles.imageButton}
          type="outline"
          buttonStyle={styles.imageButtonStyle}
          titleStyle={styles.imageButtonTitle}
          icon={
            <Icon
              name="image"
              type="material"
              size={20}
              color={COLORS.primaryGreen}
              containerStyle={{ marginRight: 5 }}
            />
          }
        />
      </View>

      <Input
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
        containerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        placeholderTextColor={COLORS.gray}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Category</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
            dropdownIconColor={COLORS.primaryGreen}
          >
            {CATEGORIES.map((cat) => (
              <Picker.Item
                key={cat.id}
                label={cat.name}
                value={cat.id.toString()}
              />
            ))}
          </Picker>
        </View>
      </View>

      <Input
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        containerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        placeholderTextColor={COLORS.gray}
      />
      <Input
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        containerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        placeholderTextColor={COLORS.gray}
      />
      <Input
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        containerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        placeholderTextColor={COLORS.gray}
      />
      <Button
        title="Add Product"
        onPress={handleAddProduct}
        containerStyle={styles.submitButton}
        buttonStyle={styles.submitButtonStyle}
        titleStyle={styles.submitButtonTitle}
        loading={isLoading}
        disabled={isLoading}
        icon={
          <Icon
            name="add-circle"
            type="material"
            size={20}
            color={COLORS.white}
            containerStyle={{ marginRight: 5 }}
          />
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: COLORS.lightGreen,
    minHeight: "100%",
  },
  title: {
    marginBottom: 30,
    textAlign: "center",
    color: COLORS.darkGreen,
    fontWeight: "800",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  productImage: {
    width: 220,
    height: 220,
    borderRadius: 15,
    marginBottom: 10,
  },
  placeholderImage: {
    width: 220,
    height: 220,
    borderRadius: 15,
    backgroundColor: COLORS.placeholderGreen,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  placeholderText: {
    color: COLORS.gray,
    fontSize: 16,
  },
  imageButton: {
    width: 220,
  },
  imageButtonStyle: {
    borderColor: COLORS.primaryGreen,
    borderWidth: 1,
  },
  imageButtonTitle: {
    color: COLORS.primaryGreen,
    fontWeight: "700",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputText: {
    color: COLORS.darkGreen,
    fontWeight: "600",
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 5,
    marginLeft: 10,
  },
  pickerWrapper: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    height: 144,
    color: COLORS.darkGreen,
    width: "100%",
  },
  submitButton: {
    marginTop: 10,
  },
  submitButtonStyle: {
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 10,
    paddingVertical: 12,
  },
  submitButtonTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
});

export default AddProductScreen;
