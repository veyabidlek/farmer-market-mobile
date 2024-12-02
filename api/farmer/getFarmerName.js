import { getToken } from "./getToken";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const getFarmerName = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${BACKEND_URL}/farmer/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.farmer.name;
  } catch (err) {
    console.error("Error getting farmer name:", err);
    throw err;
  }
};
