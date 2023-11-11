/* eslint-disable @typescript-eslint/no-explicit-any */
// import { ChatState } from "@/context/userProvider";
// import { SellerParams } from "@/types/sellerTypes";
import axios from "axios";
export const customerDetails = async (user: any) => {
  // const user = ChatState();
  try {
    const config = {
      headers: {
        // "Content-type": "application/json",
        Authorization: `Bearer ${user.data.token}`,
      },
    };
    const data = await axios.get("http://localhost:8080/api/customers", config);

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
