// App.js
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true); // Ignore all log notifications
import RoleSelectionScreen from "./screens/RoleSelectionScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen";
import AddProductScreen from "./screens/AddProductScreen";
import EditProductScreen from "./screens/EditProductScreen";
import ChatScreen from "./screens/ChatScreen";
import AllChatsScreen from "./screens/AllChatsScreen";
import FarmerChatScreen from "./screens/FarmerChatScreen";
import AllFarmerChatsScreen from "./screens/AllFarmerChatsScreen";
import BuyerLoginScreen from "./screens/BuyerLoginScreen";
import BuyerRegisterScreen from "./screens/BuyerRegisterScreen";
import BuyerDashboardScreen from "./screens/BuyerDashboardScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import { BasketProvider } from "./contexts/BasketContext";
import BasketScreen from "./screens/BasketScreen"; // Import the BasketScreen

const Stack = createNativeStackNavigator();

export default function App() {
  const [isFarmerLoggedIn, setIsFarmerLoggedIn] = useState(false);
  const [isBuyerLoggedIn, setIsBuyerLoggedIn] = useState(false);

  // Wrapper components
  const FarmerLoginWrapper = (props) => (
    <LoginScreen {...props} setIsFarmerLoggedIn={setIsFarmerLoggedIn} />
  );

  const BuyerLoginWrapper = (props) => (
    <BuyerLoginScreen {...props} setIsBuyerLoggedIn={setIsBuyerLoggedIn} />
  );

  return (
    <BasketProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="RoleSelection">
          {/* Role Selection */}
          <Stack.Screen
            name="RoleSelection"
            component={RoleSelectionScreen}
            options={{ headerShown: false }}
          />

          {/* Farmer Screens */}
          <Stack.Screen name="FarmerLogin" component={FarmerLoginWrapper} />
          <Stack.Screen
            name="AllFarmerChats"
            component={AllFarmerChatsScreen}
          />
          <Stack.Screen name="FarmerChat" component={FarmerChatScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="AllChats" component={AllChatsScreen} />
          <Stack.Screen name="FarmerRegister" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Add Product" component={AddProductScreen} />
          <Stack.Screen name="Edit Product" component={EditProductScreen} />

          {/* Buyer Screens */}
          <Stack.Screen name="BuyerLogin" component={BuyerLoginWrapper} />
          <Stack.Screen name="BuyerRegister" component={BuyerRegisterScreen} />
          <Stack.Screen
            name="BuyerDashboard"
            component={BuyerDashboardScreen}
          />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="Basket" component={BasketScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </BasketProvider>
  );
}
