// addFarmerProduct.js
import axios from "axios";
import { getToken } from "./getToken";
import { BACKEND_URL } from "../config";

export const addFarmerProduct = async (productData) => {
  try {
    const token = await getToken();
    console.log("Token received:", token ? "Valid token" : "No token");
    console.log("Sending product data:", productData);
    console.log("Request URL:", `${BACKEND_URL}/farmer/products`);

    const response = await axios.post(
      `${BACKEND_URL}/farmer/products`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Server response:", response.data);
    return true;
  } catch (err) {
    console.error("Error adding product:", err.response?.data || err.message);
    console.error("Status code:", err.response?.status);
    console.error("Full error:", err);
    return false;
  }
};
