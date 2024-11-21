import { getToken } from "./getToken";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const getProducts = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${BACKEND_URL}/farmer/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error getting products:", err);
    throw err;
  }
};
