import { LoginParams, SignupParams, User } from "@/types/authTypes";
import axios from "axios";
type LoginSignupResponse = {
  status: "success" | "fail";
  token: string;
  user: User;
};

export const signup = async (signupData: SignupParams) => {
  const { name, email, password, phone, address } = signupData;

  if (!name || !email || !password || !address || !phone) {
    alert("Please provide all the data");
    return;
  }

  const data = await axios.post<LoginSignupResponse>(
    "http://localhost:8080/api/signup",
    {
      Email: email,
      Password: password,
      Name: name,
      Phone: phone,
      Address: address,
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
      Email: email,
      password: password,
    }
  );
  console.log(data);

  localStorage.setItem("user", JSON.stringify(data));
  if (data instanceof Error) {
    throw new Error(data.message);
  }

  return data;
};
