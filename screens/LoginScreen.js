import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { Input, Button, Text } from "react-native-elements";
import PropTypes from "prop-types";
import { loginFarmer } from "../api/farmer/loginFarmer";
import { getToken } from "../api/farmer/getToken";

const LoginScreen = ({ navigation, setIsFarmerLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Missing Fields", "Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const loginSuccess = await loginFarmer(email, password);
      if (loginSuccess) {
        setIsFarmerLoggedIn(true);
        const token = await getToken();
        console.log("Token:", token);

        navigation.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        });
      }
    } catch (error) {
      Alert.alert(
        "Login Failed",
        "Invalid email or password. Please check your credentials and try again."
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
      <View style={styles.backgroundCircle} />
      <View style={styles.backgroundCircleTwo} />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.formContainer}>
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
              autoCompleteType="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <Input
              placeholder="Enter your password"
              containerStyle={styles.input}
              inputContainerStyle={styles.inputField}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCompleteType="password"
            />
          </View>

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            buttonStyle={styles.loginButton}
            titleStyle={styles.buttonTitle}
          />

          <TouchableOpacity
            style={styles.registerLink}
            onPress={() => navigation.navigate("FarmerRegister")}
          >
            <Text style={styles.registerText}>
              Don't have an account?{" "}
              <Text style={styles.registerTextBold}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  setIsFarmerLoggedIn: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  backgroundCircle: {
    position: "absolute",
    top: -200,
    right: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: "rgba(76, 175, 80, 0.1)",
  },
  backgroundCircleTwo: {
    position: "absolute",
    bottom: -150,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(76, 175, 80, 0.05)",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  headerContainer: {
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
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
  forgotPassword: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#2E7D32",
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#2E7D32",
    borderRadius: 12,
    height: 56,
    marginBottom: 16,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  registerLink: {
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    color: "#666",
  },
  registerTextBold: {
    color: "#2E7D32",
    fontWeight: "bold",
  },
});

export default LoginScreen;
