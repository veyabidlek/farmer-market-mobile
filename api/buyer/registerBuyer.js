import axios from "axios";
import { BACKEND_URL } from "../config";

export const registerBuyer = async (
  name,
  email,
  password,
  phone_number,
  address,
  payment_method
) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/buyer/register`, {
      name,
      email,
      password,
      phone_number,
      address,
      payment_method,
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "Error registering buyer:",
        err.response?.data || err.message
      );
    } else {
      console.error("Unexpected error registering buyer:", err);
    }
    throw err;
  }
};
