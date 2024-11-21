import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { Button, Text } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/farmer/getFarmerProducts";

const DashboardScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  const fetchProductList = async () => {
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
    }
  };

  // Use useFocusEffect to refetch data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchProductList();
    }, []) // Dependencies can be added if needed
  );

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setProducts(products.filter((product) => product.id !== id));
          },
        },
      ]
    );
  };

  const handleEdit = (product) => {
    navigation.navigate("Edit Product", { product, setProducts });
  };

  return (
    <View style={styles.container}>
      <Button
        title="Add New Product"
        onPress={() => navigation.navigate("Add Product", { setProducts })}
        containerStyle={{ marginBottom: 20 }}
      />
      {products.length === 0 ? (
        <Text h4>No products available.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default DashboardScreen;
