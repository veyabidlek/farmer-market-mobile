// screens/BuyerRegisterScreen.js
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { registerBuyer } from "../api/buyer/registerBuyer";

const BuyerRegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleRegister = async () => {
    try {
      const success = await registerBuyer(
        name,
        email,
        password,
        phoneNumber,
        address,
        paymentMethod
      );

      if (success) {
        Alert.alert("Success", "Registration successful!", [
          { text: "OK", onPress: () => navigation.navigate("BuyerLogin") },
        ]);
      } else {
        Alert.alert("Error", "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred. Please check your details and try again."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text h3 style={{ marginBottom: 20 }}>
        Buyer Registration
      </Text>
      <Input
        placeholder="Name"
        leftIcon={{ type: "material", name: "person" }}
        value={name}
        onChangeText={setName}
      />
      <Input
        placeholder="Email"
        leftIcon={{ type: "material", name: "email" }}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        placeholder="Password"
        leftIcon={{ type: "material", name: "lock" }}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Input
        placeholder="Phone Number"
        leftIcon={{ type: "material", name: "phone" }}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <Input
        placeholder="Address"
        leftIcon={{ type: "material", name: "home" }}
        value={address}
        onChangeText={setAddress}
      />
      <Input
        placeholder="Payment Method"
        leftIcon={{ type: "material", name: "credit-card" }}
        value={paymentMethod}
        onChangeText={setPaymentMethod}
      />
      <Button title="Register" onPress={handleRegister} />
      <Button
        title="Back to Login"
        type="clear"
        onPress={() => navigation.navigate("BuyerLogin")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    justifyContent: "center",
  },
});

export default BuyerRegisterScreen;
