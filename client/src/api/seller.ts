import { SellerParams } from "@/types/sellerTypes";
import axios from "axios";
export const sellerDetails = async (sellerData: SellerParams) => {
  try {
    const { data } = await axios.post("/api/seller");
    return data;
  } catch (error) {
    console.log(error);
  }
};
