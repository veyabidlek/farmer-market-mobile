// screens/RoleSelectionScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";

const RoleSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text h3 style={{ marginBottom: 40 }}>
        Welcome to Farmer Market
      </Text>
      <Button
        title="I'm a Farmer"
        onPress={() => navigation.navigate("FarmerLogin")}
        containerStyle={styles.buttonContainer}
      />
      <Button
        title="I'm a Buyer"
        onPress={() => navigation.navigate("BuyerLogin")}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default RoleSelectionScreen;
