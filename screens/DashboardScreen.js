// DashboardScreen.js
import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Button, Text, Icon } from "react-native-elements";
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
          keyExtractor={(item) => item.id.toString()}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9", // Light green background
    paddingTop: 50,
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
    color: "#2E7D32", // Darker green for better contrast
  },
  addButton: {
    backgroundColor: "#66BB6A", // Vibrant green
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
    color: "#1B5E20", // Dark green
    marginBottom: 12,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: "#388E3C", // Medium green
    textAlign: "center",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
});

export default DashboardScreen;
