import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert, Animated } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { registerBuyer } from "../api/buyer/registerBuyer";

const BuyerRegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState({});
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validateForm()) {
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
          Alert.alert("Success", "Welcome aboard! 🎉", [
            {
              text: "Continue",
              onPress: () => navigation.navigate("BuyerLogin"),
            },
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
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text h3 style={styles.title}>
          Create Account
        </Text>
        <Text style={styles.subtitle}>Join our community of buyers</Text>

        <Input
          placeholder="Full Name"
          leftIcon={{
            type: "material",
            name: "person",
            color: "#67809F",
          }}
          value={name}
          onChangeText={setName}
          errorMessage={errors.name}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputField}
        />

        <Input
          placeholder="Email"
          leftIcon={{
            type: "material",
            name: "email",
            color: "#67809F",
          }}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          errorMessage={errors.email}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputField}
        />

        <Input
          placeholder="Password"
          leftIcon={{
            type: "material",
            name: "lock",
            color: "#67809F",
          }}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          errorMessage={errors.password}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputField}
        />

        <Input
          placeholder="Phone Number"
          leftIcon={{
            type: "material",
            name: "phone",
            color: "#67809F",
          }}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputField}
        />

        <Input
          placeholder="Address"
          leftIcon={{
            type: "material",
            name: "home",
            color: "#67809F",
          }}
          value={address}
          onChangeText={setAddress}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputField}
        />

        <Input
          placeholder="Payment Method"
          leftIcon={{
            type: "material",
            name: "credit-card",
            color: "#67809F",
          }}
          value={paymentMethod}
          onChangeText={setPaymentMethod}
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputField}
        />

        <Button
          title="Create Account"
          onPress={handleRegister}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />

        <Button
          title="Already have an account? Log in"
          type="clear"
          onPress={() => navigation.navigate("BuyerLogin")}
          titleStyle={styles.linkButton}
        />
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#95A5A6",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    paddingHorizontal: 0,
    marginBottom: 12,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#E0E7FF",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
  },
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    color: "#4A90E2",
    fontSize: 14,
    marginTop: 15,
  },
});

export default BuyerRegisterScreen;
