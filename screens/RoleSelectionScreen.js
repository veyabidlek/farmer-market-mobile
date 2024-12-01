import React from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import { Button, Text } from "react-native-elements";

const { width } = Dimensions.get("window");

const RoleSelectionScreen = ({ navigation }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircle} />
      <View style={styles.backgroundCircleTwo} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.title}>Farmer Market</Text>
          <Text style={styles.subtitle}>Choose your role to get started</Text>
        </View>

        <View style={styles.buttonGroup}>
          <Button
            title="I'm a Farmer"
            ViewComponent={View}
            buttonStyle={styles.farmerButton}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonText}
            onPress={() => navigation.navigate("FarmerLogin")}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button
            title="I'm a Buyer"
            ViewComponent={View}
            buttonStyle={styles.buyerButton}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonText}
            onPress={() => navigation.navigate("BuyerLogin")}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Connect • Grow • Thrive</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    position: "relative",
    overflow: "hidden",
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
    justifyContent: "space-between",
  },
  header: {
    marginTop: 60,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    color: "#333",
    textAlign: "center",
    fontWeight: "300",
  },
  title: {
    fontSize: 36,
    color: "#2E7D32",
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  buttonGroup: {
    marginVertical: 40,
  },
  buttonContainer: {
    marginVertical: 8,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  farmerButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 20,
    borderRadius: 16,
  },
  buyerButton: {
    backgroundColor: "#1976D2",
    paddingVertical: 20,
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#666",
    fontSize: 16,
  },
  footer: {
    alignItems: "center",
    marginBottom: 20,
  },
  footerText: {
    color: "#666",
    fontSize: 14,
    letterSpacing: 1,
  },
});

export default RoleSelectionScreen;
