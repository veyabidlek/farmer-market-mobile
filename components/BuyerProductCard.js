// components/BuyerProductCard.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Icon } from "react-native-elements";
import PropTypes from "prop-types";
import { COLORS } from "../theme"; // Importing from theme.js

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
    borderRadius: 15,
    padding: 0,
    marginVertical: 10,
    marginHorizontal: 16,
    overflow: "hidden", // Ensures content is clipped within the card
    backgroundColor: COLORS.white,
    shadowColor: COLORS.darkGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  container: {
    flexDirection: "row",
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: COLORS.placeholderGreen,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.darkGreen,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },
});

export default BuyerProductCard;
