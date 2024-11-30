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

  // Rest of your existing functions (fetchProductList, getFilteredAndSortedProducts, etc.)
  // ...
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
          renderItem={({ item }) => (
            <BuyerProductCard
              product={item}
              onPress={() =>
                navigation.navigate("Product Detail", { product: item })
              }
            />
          )}
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
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    height: 44,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e9ecef",
    color: "#212529",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    width: 44,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e9ecef",
    gap: 2,
  },
  filtersSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  filtersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  pickerWrapper: {
    flex: 1,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#495057",
    marginBottom: 6,
    marginLeft: 4,
  },
  pickerContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e9ecef",
    overflow: "hidden",
  },
  pickerIOS: {
    height: 144,
    backgroundColor: "transparent",
  },
  pickerAndroid: {
    height: 44,
    backgroundColor: "transparent",
    color: "#212529",
  },
  pickerItemAndroid: {
    fontSize: 16,
    color: "#212529",
    backgroundColor: "#f8f9fa",
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  resultsHeader: {
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 15,
    color: "#495057",
    fontWeight: "500",
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 32,
  },
  noProducts: {
    fontSize: 18,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 8,
  },
  noProductsSubtext: {
    fontSize: 15,
    color: "#6c757d",
    textAlign: "center",
  },
});

export default BuyerDashboardScreen;
