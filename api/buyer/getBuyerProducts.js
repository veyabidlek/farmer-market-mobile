import { getToken } from "./getToken";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const getBuyerProducts = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${BACKEND_URL}/buyer/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error getting buyer products:", err);
    throw err;
  }
};
