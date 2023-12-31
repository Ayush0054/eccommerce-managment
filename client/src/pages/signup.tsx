/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import image2 from "../assets/photo/login-image.jpeg";

import { signup } from "@/api/auth";
import { SignupParams } from "@/types/authTypes";
import { useNavigate } from "react-router";
import { useToast } from "@/components/ui/use-toast";
function Signup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [signupData, setSignupData] = useState<SignupParams>({
    name: "",

    email: "",
    phone: "",
    password: "",
    address: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await signup(signupData);
    //@ts-ignore
    if (data?.status === "fail") {
      alert("Something went wrong. Can't signup.");
      return;
    }
    toast({
      title: "successfully created account",
      description: "redirecting to login page",
    });
    navigate("/login");
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
      <Card className="flex items-center  drop-shadow-2xl   ">
        <form
          action=""
          className=" grid gap-10 w-[400px] m-10 "
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
            type="text"
            placeholder="Address"
            value={signupData.address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("address", e.target.value)
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
        <img src={image2} className=" h-[70vh] rounded-r-lg " />
      </Card>
    </div>
  );
}

export default Signup;
