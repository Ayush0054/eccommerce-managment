import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import image1 from "../assets/photo/login-image.jpeg";
import { useNavigate } from "react-router";
import { LoginParams } from "@/types/authTypes";
import { login } from "@/api/auth";
function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginParams>({
    email: "",
    password: "",
  });
  const handleInputChange = (field: string, value: string): void => {
    setLoginData((prevData) => {
      return { ...prevData, [field]: value };
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginData);
    const data = await login(loginData);

    navigate("/dashboard");
  };
  return (
    <div className=" h-[100vh]">
      <div className=" flex items-center  m-10 mt-36 justify-center ">
        <div className="flex items-center gap-24 p-10 ">
          <form
            action=""
            className=" grid gap-10 w-[400px]"
            onSubmit={handleSubmit}
          >
            <h1 className="text-4xl font-bold text-center">Login</h1>
            <Input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("email", e.target.value)
              }
            />
            <Input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("password", e.target.value)
              }
            />
            <Button>Login</Button>
            <h1 className=" text-center">
              New Member ?{" "}
              <button
                className=" ml-1 text-gray-700"
                onClick={() => navigate("/signup")}
              >
                signup
              </button>
            </h1>
          </form>
          <img src={image1} className=" h-[600px] rounded-lg" />
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#a2d9ff"
          fill-opacity="1"
          d="M0,192L14.1,170.7C28.2,149,56,107,85,80C112.9,53,141,43,169,69.3C197.6,96,226,160,254,170.7C282.4,181,311,139,339,106.7C367.1,75,395,53,424,64C451.8,75,480,117,508,138.7C536.5,160,565,160,593,181.3C621.2,203,649,245,678,266.7C705.9,288,734,288,762,256C790.6,224,819,160,847,128C875.3,96,904,96,932,106.7C960,117,988,139,1016,128C1044.7,117,1073,75,1101,58.7C1129.4,43,1158,53,1186,96C1214.1,139,1242,213,1271,245.3C1298.8,277,1327,267,1355,218.7C1383.5,171,1412,85,1426,42.7L1440,0L1440,320L1425.9,320C1411.8,320,1384,320,1355,320C1327.1,320,1299,320,1271,320C1242.4,320,1214,320,1186,320C1157.6,320,1129,320,1101,320C1072.9,320,1045,320,1016,320C988.2,320,960,320,932,320C903.5,320,875,320,847,320C818.8,320,791,320,762,320C734.1,320,706,320,678,320C649.4,320,621,320,593,320C564.7,320,536,320,508,320C480,320,452,320,424,320C395.3,320,367,320,339,320C310.6,320,282,320,254,320C225.9,320,198,320,169,320C141.2,320,113,320,85,320C56.5,320,28,320,14,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}

export default Login;
