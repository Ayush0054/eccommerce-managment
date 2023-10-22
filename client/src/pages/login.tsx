/* eslint-disable @typescript-eslint/ban-ts-comment */
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
    //@ts-ignore
    if (data?.status === "fail") {
      alert("Something went wrong. Can't signup.");
      return;
    }
    navigate("/dashboard");
    if (!data) return;
  };
  return (
    <div className=" flex items-center   justify-center  ">
      <Card className="flex items-center m-10 mt-36 drop-shadow-2xl  ">
        <form
          action=""
          className=" grid gap-10 w-[400px] m-10"
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
        <img src={image1} className=" h-[600px] " />
      </Card>
    </div>
  );
}

export default Login;
