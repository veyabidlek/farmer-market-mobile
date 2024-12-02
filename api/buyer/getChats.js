import { getToken } from "./getToken";
import axios from "axios";
import { BACKEND_URL } from "../config";
export const getChatList = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${BACKEND_URL}/chat/conversations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("error getting chat list...");
  }
};
