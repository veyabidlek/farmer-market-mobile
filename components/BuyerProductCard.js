// components/BuyerProductCard.js

import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import PropTypes from "prop-types";

const BuyerProductCard = ({ product, onPress }) => {
  const {
    name = "Unnamed Product",
    price = 0,
    quantity = 0,
    images = [],
  } = product;

  return (
    <Card containerStyle={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View style={styles.container}>
          {images.length > 0 ? (
            <Image source={{ uri: images[0] }} style={styles.image} />
          ) : (
            <Image
              source={require("../assets/icon.png")} // Ensure you have a placeholder image in assets
              style={styles.image}
            />
          )}
          <View style={styles.info}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.text}>Price: ${price.toFixed(2)}</Text>
            <Text style={styles.text}>Available: {quantity}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

BuyerProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    farm_location: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 0,
    margin: 10,
    overflow: "hidden", // Ensures content is clipped within the card
  },
  container: {
    flexDirection: "row",
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#555",
  },
});

export default BuyerProductCard;
