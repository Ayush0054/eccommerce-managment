import { SignupParams, User } from "@/types/authTypes";
import axios from "axios";
type LoginSignupResponse = {
  status: "success" | "fail";
  token: string;
  user: User;
};

export const signup = async (signupData: SignupParams) => {
  const { name, Email, password } = signupData;

  if (!name || Email || !password) {
    alert("Please provide all the data");
    return;
  }

  const data = await axios.post<LoginSignupResponse>(
    "http://localhost:8080/api/signup",
    {
      method: "POST",
      data: signupData,
    }
  );

  if (data instanceof Error) {
    throw new Error(data.message);
  }

  return data;
};
