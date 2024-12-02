import axios from "axios";
import { getToken } from "./getToken";
import { BACKEND_URL } from "../config";
export const getBuyerId2 = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${BACKEND_URL}/buyer/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("buyer id:", response.data.user.id);
    return response.data.user.id;
  } catch (err) {
    console.error("erorr getting buyer id");
  }
};
