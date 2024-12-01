import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import { Input, Button, Text } from "react-native-elements";
import PropTypes from "prop-types";
import { loginBuyer } from "../api/buyer/loginBuyer";
import { getToken } from "../api/buyer/getToken";

const BuyerLoginScreen = ({ navigation, setIsBuyerLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
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
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text h3 style={styles.title}>
          Welcome Back
        </Text>
        <Text style={styles.subtitle}>Log in to your account</Text>

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

        <Button
          title="Log In"
          onPress={handleLogin}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />

        <Button
          title="New user? Create an account"
          type="clear"
          onPress={() => navigation.navigate("BuyerRegister")}
          titleStyle={styles.linkButton}
        />
      </Animated.View>
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
    backgroundColor: "#F8F9FA",
  },
  content: {
    flex: 1,
    justifyContent: "center",
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

export default BuyerLoginScreen;
