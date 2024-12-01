import axios from "axios";
import { getBuyerId } from "./getBuyerId";
import { BACKEND_URL } from "../config";
import { getToken } from "./getToken";
export const sendMessage = async (conversationID, content) => {
  try {
    const token = await getToken();
    const response = axios.post(
      `${BACKEND_URL}/chat/conversations/${conversationID}/messages`,
      {
        content,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    console.log("error starting a chat");
  }
};
