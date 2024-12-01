import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Button, Text } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/farmer/getFarmerProducts";
import { deleteFarmerProduct } from "../api/farmer/deleteFarmerProduct";

const DashboardScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
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

  useFocusEffect(
    useCallback(() => {
      fetchProductList();
    }, [])
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

  return (
    <View style={styles.container}>
      <Button
        title="Add New Product"
        onPress={() => navigation.navigate("Add Product", { setProducts })}
        containerStyle={styles.addButton}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : products.length === 0 ? (
        <Text h4 style={styles.noProductsText}>
          No products available.
        </Text>
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
          removeClippedSubviews={true} // Optimization
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  addButton: {
    marginBottom: 20,
  },
  noProductsText: {
    textAlign: "center",
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default DashboardScreen;
