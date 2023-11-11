/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
export const orderDetails = async (user: any) => {
  // const user = ChatState();
  try {
    const config = {
      headers: {
        // "Content-type": "application/json",
        Authorization: `Bearer ${user.data.token}`,
      },
    };
    const data = await axios.get("http://localhost:8080/api/orders", config);

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
