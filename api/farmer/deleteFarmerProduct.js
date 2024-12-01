// addFarmerProduct.js
import axios from "axios";
import { getToken } from "./getToken";
import { BACKEND_URL } from "../config";

export const deleteFarmerProduct = async (id) => {
  try {
    const token = await getToken();
    const response = await axios.delete(
      `${BACKEND_URL}/farmer/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return true;
  } catch (err) {
    console.error("Error deleting product:", err.response?.data || err.message);
    console.error("Status code:", err.response?.status);
    console.error("Full error:", err);
    return false;
  }
};
