import axios from "axios";
import { getToken } from "./getToken";
import { BACKEND_URL } from "../config";

export const addFarmerProduct = async (
  name,
  price,
  quantity,
  description,
  category_id
) => {
  try {
    const token = await getToken();
    await axios.post(
      `${BACKEND_URL}/farmer/products`,
      {
        name,
        price,
        quantity,
        description,
        category_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return true;
  } catch (err) {
    console.error("error adding products...");
  }
};
