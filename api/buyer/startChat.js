import axios from "axios";
import { getBuyerId } from "./getBuyerId";
import { BACKEND_URL } from "../config";
import { getToken } from "./getToken";
export const startChat = async (farmerID) => {
  try {
    const token = await getToken();
    const buyerID = await getBuyerId();
    const response = await axios.post(
      `${BACKEND_URL}/chat/conversations`,
      {
        farmer_id: farmerID,
        buyer_id: buyerID,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("chat created!!!");
    console.log("conver id:", response.data.id);
    return response.data.id;
  } catch (err) {
    console.log("error starting a chat");
  }
};
