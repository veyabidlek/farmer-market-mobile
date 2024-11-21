// screens/BuyerLoginScreen.js
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import PropTypes from "prop-types"; // Optional but recommended for prop validation
import { loginBuyer } from "../api/buyer/loginBuyer";
import { getToken } from "../api/buyer/getToken";
const BuyerLoginScreen = ({ navigation, setIsBuyerLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Please enter email and password.");
      return;
    }
    try {
      const loginSuccess = await loginBuyer(email, password);
      if (loginSuccess) {
        setIsBuyerLoggedIn(true);
        const token = await getToken();
        console.log("Token:", token);
        navigation.reset({
          index: 0,
          routes: [{ name: "BuyerDashboard" }],
        });
      }
    } catch (error) {
      Alert.alert("Error", "Invalid email or password. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={{ marginBottom: 20 }}>
        Buyer Login
      </Text>
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
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => navigation.navigate("BuyerRegister")}
      >
        <Text style={{ color: "blue" }}>
          Don't have an account? Register here.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

BuyerLoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  setIsBuyerLoggedIn: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
});

export default BuyerLoginScreen;
