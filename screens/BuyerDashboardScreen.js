// screens/BuyerDashboardScreen.js

import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button, Text } from "react-native-elements";
import BuyerProductCard from "../components/BuyerProductCard";

// Assume MOCK_PRODUCTS is imported or defined elsewhere

import { MOCK_PRODUCTS } from "../mock-data";
const BuyerDashboardScreen = ({ navigation }) => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");

  // Extract unique categories and locations for filters
  const categories = ["All", ...new Set(MOCK_PRODUCTS.map((p) => p.category))];
  const locations = [
    "All",
    ...new Set(MOCK_PRODUCTS.map((p) => p.farm_location)),
  ];

  useEffect(() => {
    filterAndSortProducts();
  }, [searchQuery, selectedCategory, selectedLocation, sortOption]);

  const filterAndSortProducts = () => {
    let filtered = MOCK_PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.farm_location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesLocation =
        selectedLocation === "All" ||
        product.farm_location === selectedLocation;

      return matchesSearch && matchesCategory && matchesLocation;
    });

    // Sorting
    if (sortOption === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Newest") {
      filtered.sort((a, b) => b.id - a.id); // Assuming higher ID is newer
    }

    setProducts(filtered);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name, category, or location"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Filters */}
      <View style={styles.filtersContainer}>
        {/* Category Filter */}
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          {categories.map((category, index) => (
            <Picker.Item label={category} value={category} key={index} />
          ))}
        </Picker>

        {/* Location Filter */}
        <Picker
          selectedValue={selectedLocation}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedLocation(itemValue)}
        >
          {locations.map((location, index) => (
            <Picker.Item label={location} value={location} key={index} />
          ))}
        </Picker>

        {/* Sort Options */}
        <Picker
          selectedValue={sortOption}
          style={styles.picker}
          onValueChange={(itemValue) => setSortOption(itemValue)}
        >
          <Picker.Item label="Newest" value="Newest" />
          <Picker.Item label="Price: Low to High" value="Price: Low to High" />
          <Picker.Item label="Price: High to Low" value="Price: High to Low" />
        </Picker>
      </View>

      {/* Product List */}
      {products.length === 0 ? (
        <Text h4 style={{ marginTop: 20, textAlign: "center" }}>
          No products found.
        </Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BuyerProductCard
              product={item}
              onPress={() =>
                navigation.navigate("Product Detail", { product: item })
              }
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
  searchInput: {
    height: 40,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "30%",
  },
});

export default BuyerDashboardScreen;
