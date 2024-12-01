// components/ProductCard.js
import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Card, Button, Icon } from "react-native-elements";

const CATEGORIES = [
  { id: 1, name: "Fruits" },
  { id: 2, name: "Vegetables" },
  { id: 3, name: "Dairy" },
  { id: 4, name: "Plants" },
  { id: 5, name: "Others" },
];

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.container}>
        <Image source={{ uri: product.image_url }} style={styles.image} />
        <View style={styles.info}>
          <View style={styles.headerInfo}>
            <Text style={styles.title}>{product.name}</Text>
            {product.quantity < 10 && (
              <Text style={styles.lowStock}>Low Stock!</Text>
            )}
          </View>
          <Text style={styles.category}>
            {CATEGORIES.find((cat) => cat.id === product.category_id)?.name ||
              "Others"}
          </Text>
          <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
          <Text style={styles.quantity}>Quantity: {product.quantity}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.buttons}>
            <Button
              icon={
                <Icon
                  name="edit"
                  type="material"
                  size={18}
                  color="#FFFFFF"
                  containerStyle={{ marginRight: 5 }}
                />
              }
              title="Edit"
              buttonStyle={styles.editButton}
              onPress={onEdit}
              titleStyle={styles.buttonTitle}
            />
            <Button
              icon={
                <Icon
                  name="delete"
                  type="material"
                  size={18}
                  color="#FFFFFF"
                  containerStyle={{ marginRight: 5 }}
                />
              }
              title="Delete"
              buttonStyle={styles.deleteButton}
              onPress={onDelete}
              titleStyle={styles.buttonTitle}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: 0,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    shadowColor: "#1B5E20", // Dark green shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  container: {
    flexDirection: "row",
    padding: 15,
    width: "100%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 15,
    backgroundColor: "#C8E6C9", // Light green placeholder
  },
  info: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2E7D32", // Dark green
    flexShrink: 1, // Ensures title doesn't overflow
  },
  lowStock: {
    fontSize: 14,
    color: "#D32F2F", // Red to indicate urgency
    fontWeight: "700",
  },
  category: {
    fontSize: 14,
    color: "#66BB6A", // Vibrant green
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "#388E3C", // Medium green
    marginBottom: 3,
  },
  quantity: {
    fontSize: 16,
    color: "#388E3C", // Medium green
    marginBottom: 3,
  },
  description: {
    fontSize: 14,
    color: "#4CAF50", // Slightly lighter green
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 5,
  },
  editButton: {
    backgroundColor: "#66BB6A", // Vibrant green
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginRight: 10,
    flex: 1, // Ensures buttons take equal space
  },
  deleteButton: {
    backgroundColor: "#E57373", // Soft red for delete
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 5,
    flex: 1, // Ensures buttons take equal space
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
});

export default ProductCard;
