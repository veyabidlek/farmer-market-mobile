import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const loginBuyer = async (email, password) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/buyer/login`, {
      email,
      password,
    });

    await storeToken(response.data);

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "Error logging in farmer:",
        err.response?.data || err.message
      );
    } else {
      console.error("Unexpected error logging in farmer:", err);
    }
    throw err;
  }
};

// Function to store login data
const storeToken = async (loginData) => {
  try {
    await AsyncStorage.setItem("token", loginData.access_token);
  } catch (error) {
    console.error("Error storing login data:", error);
  }
};

// Function to remove stored login data (logout)
export const logout = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
