/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import image2 from "../assets/photo/signup-image.jpeg";

import { signup } from "@/api/auth";
import { SignupParams } from "@/types/authTypes";
import { useNavigate } from "react-router";
function Signup() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState<SignupParams>({
    name: "",

    email: "",
    phone: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await signup(signupData);
    //@ts-ignore
    if (data?.status === "fail") {
      alert("Something went wrong. Can't signup.");
      return;
    }

    if (!data) return;

    // dispatch(userSignupAction({ token: data.token, user: data.user }));
  };
  const handleInputChange = (field: string, value: string): void => {
    setSignupData((prevData) => {
      return { ...prevData, [field]: value };
    });
  };
  return (
    <div className=" flex items-center  m-10 mt-36 justify-center ">
      <div className="flex items-center gap-24 p-10 ">
        <form
          action=""
          className=" grid gap-10 w-[400px] "
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-bold text-center">Signup</h1>
          <Input
            type="email"
            placeholder="Email"
            value={signupData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("email", e.target.value)
            }
          />
          <Input
            type="text"
            placeholder="Name"
            value={signupData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("name", e.target.value)
            }
          />
          <Input
            type="text"
            placeholder="Phone"
            value={signupData.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("phone", e.target.value)
            }
          />
          <Input
            type="password"
            placeholder="Password"
            value={signupData.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("password", e.target.value)
            }
          />
          <Button>Sign Up</Button>
          <h1 className=" text-center">
            Already a Member ?{" "}
            <button
              className=" ml-1 text-gray-700"
              onClick={() => navigate("/login")}
            >
              login
            </button>
          </h1>
        </form>
        <img src={image2} className=" h-[600px] rounded-lg" />
      </div>
    </div>
  );
}

export default Signup;
