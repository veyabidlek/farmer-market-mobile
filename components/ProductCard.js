// components/ProductCard.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Button } from "react-native-elements";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <Card>
      <View style={styles.container}>
        <Image source={{ uri: product.image_url }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{product.name}</Text>
          <Text>Category: {product.category}</Text>
          <Text>Price: ${product.price}</Text>
          <Text>Quantity: {product.quantity}</Text>
          <Text>Description: {product.description}</Text>
          {product.quantity < 10 && (
            <Text style={styles.lowStock}>Low Stock!</Text>
          )}
          <View style={styles.buttons}>
            <Button title="Edit" onPress={onEdit} />
            <Button
              title="Delete"
              buttonStyle={{ backgroundColor: "red" }}
              onPress={onDelete}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  image: { width: 100, height: 100, marginRight: 10 },
  info: { flex: 1 },
  title: { fontSize: 18, fontWeight: "bold" },
  lowStock: { color: "red", fontWeight: "bold" },
  buttons: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
});

export default ProductCard;
