import { ChatState } from "@/context/userProvider";
// import { SellerParams } from "@/types/sellerTypes";
import axios from "axios";
export const sellerDetails = async () => {
  const user = ChatState();

  try {
    const config = {
      headers: {
        // "Content-type": "application/json",
        Authorization: `Bearer ${user.user.data.token}`,
      },
    };
    const data = await axios.get(
      "http://localhost:8080/api/sellerdetail",
      config
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
