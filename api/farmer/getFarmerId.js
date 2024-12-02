import axios from "axios";
import { getToken } from "./getToken";
import { BACKEND_URL } from "../config";
export const getFarmerId = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${BACKEND_URL}/farmer/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("farmer id:", response.data.user.id);
    return response.data.user.id;
  } catch (err) {
    console.error("erorr getting farmer id");
  }
};
