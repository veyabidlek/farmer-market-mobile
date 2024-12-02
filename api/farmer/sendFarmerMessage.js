import axios from "axios";
import { BACKEND_URL } from "../config";
import { getToken } from "./getToken";
export const sendFarmerMessage = async (conversationID, content) => {
  try {
    const token = await getToken();
    console.log("conversation id:", conversationID);
    const response = await axios.post(
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
