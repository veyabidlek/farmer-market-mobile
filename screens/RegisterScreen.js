import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { registerFarmer } from "../api/farmer/registerFarmer";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [farmAddress, setFarmAddress] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !phoneNumber ||
      !farmAddress ||
      !farmSize
    ) {
      Alert.alert("Missing Fields", "Please fill in all fields to continue.");
      return;
    }

    setLoading(true);
    try {
      const success = await registerFarmer(
        name,
        email,
        password,
        phoneNumber,
        farmAddress,
        Number(farmSize)
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Create Account</Text>
          <Text style={styles.headerSubtitle}>Join our farming community</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <Input
              placeholder="Enter your full name"
              containerStyle={styles.input}
              inputContainerStyle={styles.inputField}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <Input
              placeholder="your@email.com"
              containerStyle={styles.input}
              inputContainerStyle={styles.inputField}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <Input
              placeholder="Create a secure password"
              containerStyle={styles.input}
              inputContainerStyle={styles.inputField}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <Input
              placeholder="Your contact number"
              containerStyle={styles.input}
              inputContainerStyle={styles.inputField}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Farm Address</Text>
            <Input
              placeholder="Enter your farm location"
              containerStyle={styles.input}
              inputContainerStyle={styles.inputField}
              value={farmAddress}
              onChangeText={setFarmAddress}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Farm Size</Text>
            <Input
              placeholder="Size in acres"
              containerStyle={styles.input}
              inputContainerStyle={styles.inputField}
              value={farmSize}
              onChangeText={setFarmSize}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            buttonStyle={styles.registerButton}
            titleStyle={styles.buttonTitle}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate("FarmerLogin")}
            style={styles.loginLink}
          >
            <Text style={styles.loginText}>
              Already have an account?{" "}
              <Text style={styles.loginTextBold}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  headerContainer: {
    marginVertical: 30,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    marginLeft: 10,
    fontWeight: "500",
  },
  input: {
    paddingHorizontal: 0,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },
  buttonContainer: {
    marginVertical: 30,
  },
  registerButton: {
    backgroundColor: "#2E7D32",
    borderRadius: 12,
    height: 56,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  loginLink: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    color: "#666",
  },
  loginTextBold: {
    color: "#2E7D32",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
