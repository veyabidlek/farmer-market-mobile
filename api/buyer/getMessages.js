import { getToken } from "./getToken";
import axios from "axios";
import { BACKEND_URL } from "../config";
export const getMessages = async (conversationID) => {
  try {
    const token = await getToken();
    console.log("convresation id in getMessages:", conversationID);
    const response = await axios.get(
      `${BACKEND_URL}/chat/conversations/${conversationID}/messages`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    console.error("error getting messages...");
  }
};
