import { LoginParams, SignupParams, User } from "@/types/authTypes";
import axios from "axios";
type LoginSignupResponse = {
  status: "success" | "fail";
  token: string;
  user: User;
};

export const signup = async (signupData: SignupParams) => {
  const { name, email, password } = signupData;

  if (!name || email || !password) {
    alert("Please provide all the data");
    return;
  }

  const data = await axios.post<LoginSignupResponse>(
    "http://localhost:8080/api/signup",
    {
      data: signupData,
    }
  );

  if (data instanceof Error) {
    throw new Error(data.message);
  }

  return data;
};

export const login = async ({ email, password }: LoginParams) => {
  if (!email || !password) {
    alert("Please provide all the data");
    return;
  }

  const data = await axios.post<LoginSignupResponse>(
    "http://localhost:8080/api/login",
    {
      data: { email, password },
    }
  );

  if (data instanceof Error) {
    throw new Error(data.message);
  }

  return data;
};
