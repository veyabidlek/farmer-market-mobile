import axios from "axios";
import { BACKEND_URL } from "../config";

export const registerFarmer = async (
  name,
  email,
  password,
  phone_number,
  farm_address,
  farm_size
) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/farmer/register`, {
      name,
      email,
      password,
      phone_number,
      farm_address,
      farm_size,
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "Error registering farmer:",
        err.response?.data || err.message
      );
    } else {
      console.error("Unexpected error registering farmer:", err);
    }
    throw err;
  }
};
