import axios from "axios";
import { getToken } from "./getToken";
import { BACKEND_URL } from "../config";
export const getBuyerId = async () => {
  try {
    const token = await getToken();
    const response = await axios.post(`${BACKEND_URL}/buyer/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user.id;
  } catch (err) {
    console.error("erorr getting buyer id");
  }
};
