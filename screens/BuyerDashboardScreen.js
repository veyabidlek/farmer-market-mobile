import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
  Platform,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  UIManager,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Text } from "react-native-elements";
import { Filter, ChevronDown, ChevronUp } from "lucide-react-native";
import BuyerProductCard from "../components/BuyerProductCard";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { getBuyerProducts } from "../api/buyer/getBuyerProducts";

const categories = ["All", "Fruits", "Vegetables", "Dairy", "Other"];
const sortOptions = [
  { label: "Newest", value: "Newest" },
  { label: "Price: Low to High", value: "Price: Low to High" },
  { label: "Price: High to Low", value: "Price: High to Low" },
];

const BuyerDashboardScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowFilters(!showFilters);
  };

  const fetchProductList = async () => {
    try {
      const productList = await getBuyerProducts();
      if (Array.isArray(productList)) {
        setProducts(productList);
        const maxPrice = Math.max(...productList.map((p) => p.price));
        setPriceRange([0, maxPrice]);
      } else {
        Alert.alert("Error", "Failed to load products.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Error", "Unable to fetch products. Please try again later.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProductList();
    }, [])
  );

  const getFilteredAndSortedProducts = () => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        (product.category_id !== null &&
          getCategoryName(product.category_id) === selectedCategory);

      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    switch (sortOption) {
      case "Price: Low to High":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "Price: High to Low":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "Newest":
        return [...filtered].sort((a, b) => b.id - a.id);
      default:
        return filtered;
    }
  };

  const getCategoryName = (categoryId) => {
    const categoryMap = {
      0: "Other",
      1: "Vegetables",
      2: "Fruits",
      3: "Dairy",
    };
    return categoryMap[categoryId] || "Other";
  };

  const renderProductCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => navigation.navigate("Product Detail", { product: item })}
      >
        <View style={styles.imageContainer}>
          {item.image_url ? (
            <Image
              source={{ uri: item.image_url }}
              style={styles.productImage}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.productImage, styles.placeholderImage]}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <Text style={styles.productCategory}>
            {getCategoryName(item.category_id)}
          </Text>
          <Text style={styles.productDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredProducts = getFilteredAndSortedProducts();

  const ListHeader = () => (
    <View style={styles.resultsHeader}>
      <Text style={styles.resultsText}>
        {filteredProducts.length}{" "}
        {filteredProducts.length === 1 ? "product" : "products"} found
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or description"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.filterButton} onPress={toggleFilters}>
            <Filter size={20} color="#495057" />
            {showFilters ? (
              <ChevronUp size={16} color="#495057" />
            ) : (
              <ChevronDown size={16} color="#495057" />
            )}
          </TouchableOpacity>
        </View>

        {showFilters && (
          <View style={styles.filtersSection}>
            <View style={styles.filtersRow}>
              <View style={styles.pickerWrapper}>
                <Text style={styles.pickerLabel}>Category</Text>
                <View style={styles.pickerContainer}>
                  {Platform.OS === "ios" ? (
                    <Picker
                      selectedValue={selectedCategory}
                      onValueChange={setSelectedCategory}
                      style={styles.pickerIOS}
                    >
                      {categories.map((category) => (
                        <Picker.Item
                          key={category}
                          label={category}
                          value={category}
                          color="#212529"
                        />
                      ))}
                    </Picker>
                  ) : (
                    <Picker
                      selectedValue={selectedCategory}
                      onValueChange={setSelectedCategory}
                      style={styles.pickerAndroid}
                      dropdownIconColor="#212529"
                    >
                      {categories.map((category) => (
                        <Picker.Item
                          key={category}
                          label={category}
                          value={category}
                          style={styles.pickerItemAndroid}
                        />
                      ))}
                    </Picker>
                  )}
                </View>
              </View>

              <View style={styles.pickerWrapper}>
                <Text style={styles.pickerLabel}>Sort by</Text>
                <View style={styles.pickerContainer}>
                  {Platform.OS === "ios" ? (
                    <Picker
                      selectedValue={sortOption}
                      onValueChange={setSortOption}
                      style={styles.pickerIOS}
                    >
                      {sortOptions.map((option) => (
                        <Picker.Item
                          key={option.value}
                          label={option.label}
                          value={option.value}
                          color="#212529"
                        />
                      ))}
                    </Picker>
                  ) : (
                    <Picker
                      selectedValue={sortOption}
                      onValueChange={setSortOption}
                      style={styles.pickerAndroid}
                      dropdownIconColor="#212529"
                    >
                      {sortOptions.map((option) => (
                        <Picker.Item
                          key={option.value}
                          label={option.label}
                          value={option.value}
                          style={styles.pickerItemAndroid}
                        />
                      ))}
                    </Picker>
                  )}
                </View>
              </View>
            </View>
          </View>
        )}
      </View>

      {filteredProducts.length === 0 ? (
        <View style={styles.noProductsContainer}>
          <Text style={styles.noProducts}>No products found</Text>
          <Text style={styles.noProductsSubtext}>
            Try adjusting your search or filters
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={ListHeader}
          renderItem={renderProductCard}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (keeping existing styles)
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  // ... (other existing styles)

  // New styles for product cards with images
  productCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#f8f9fa",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9ecef",
  },
  placeholderText: {
    fontSize: 16,
    color: "#6c757d",
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "500",
    color: "#495057",
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: "#495057",
    lineHeight: 20,
  },
});

export default BuyerDashboardScreen;
