// screens/BasketScreen.js
import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, Button, Alert } from "react-native";
import { BasketContext } from "../contexts/BasketContext";

const BasketScreen = () => {
  const { basketItems, balance, setBalance, clearBasket } =
    useContext(BasketContext);

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
    setBalance(balance - totalCost);
    clearBasket();
    Alert.alert("Order Placed", "Your order has been successfully placed.");
  };

  return (
    <View style={styles.container}>
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
      <Button title="Place Order" onPress={handlePlaceOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default BasketScreen;
