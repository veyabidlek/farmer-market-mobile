// screens/BasketScreen.js
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { BasketContext } from "../contexts/BasketContext";

const BasketScreen = () => {
  const { basketItems, balance, setBalance, clearBasket } =
    useContext(BasketContext);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const totalCost = basketItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (totalCost > balance) {
      Alert.alert(
        "Insufficient Balance",
        "You do not have enough balance to place this order."
      );
      return;
    }
    if (!address || !city) {
      Alert.alert("Missing Information", "Please enter your address and city.");
      return;
    }
    // Simulate order placement
    setBalance(balance - totalCost);
    clearBasket();
    Alert.alert(
      "Order Placed",
      `Your order has been successfully placed and will be shipped to ${address}, ${city}.`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.balanceText}>Balance: ₸{balance.toFixed(2)}</Text>
      <FlatList
        data={basketItems}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.product.name} x {item.quantity}
            </Text>
            <Text style={styles.itemText}>
              ₸{(item.product.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        )}
      />
      <Text style={styles.totalText}>Total: ₸{totalCost.toFixed(2)}</Text>

      {/* Address Input */}
      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />

      {/* City Input */}
      <Text style={styles.label}>City:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your city"
        value={city}
        onChangeText={setCity}
      />

      <Button title="Place Order" onPress={handlePlaceOrder} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  balanceText: {
    fontSize: 18,
    marginBottom: 16,
  },
  totalText: {
    fontSize: 18,
    marginVertical: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  itemText: {
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginTop: 12,
  },
  input: {
    height: 40,
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 4,
    marginBottom: 12,
  },
});

export default BasketScreen;
