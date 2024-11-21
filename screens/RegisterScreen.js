// screens/RegisterScreen.js
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { registerFarmer } from "../api/farmer/registerFarmer";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [farmAddress, setFarmAddress] = useState("");
  const [farmSize, setFarmSize] = useState(0);

  const handleRegister = async () => {
    try {
      const success = await registerFarmer(
        name,
        email,
        password,
        phoneNumber,
        farmAddress,
        farmSize
      );

      if (success) {
        Alert.alert("Success", "Registration successful!", [
          { text: "OK", onPress: () => navigation.navigate("FarmerLogin") },
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
        Farmer Registration
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
        placeholder="Farm Address"
        leftIcon={{ type: "material", name: "home" }}
        value={farmAddress}
        onChangeText={setFarmAddress}
      />
      <Input
        placeholder="Farm Size (acres)"
        leftIcon={{ type: "material", name: "crop-square" }}
        value={farmSize}
        onChangeText={setFarmSize}
        keyboardType="numeric"
      />
      <Button title="Register" onPress={handleRegister} />
      <Button
        title="Back to Login"
        type="clear"
        onPress={() => navigation.navigate("FarmerLogin")}
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

export default RegisterScreen;
