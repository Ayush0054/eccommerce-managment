/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import image2 from "../assets/photo/signup-image.jpeg";

import { signup } from "@/api/auth";
function Signup() {
  const [signupData, setSignupData] = useState<SignupParams>({
    name: "",

    Email: "",
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

  return (
    <div className=" flex items-center  m-10 mt-36 justify-center ">
      <Card className="flex items-center gap-5 p-10 bg-emerald-200">
        <form action="" className=" grid gap-10 w-[400px]">
          <h1 className="text-4xl font-bold text-center">Signup</h1>
          <Input type="email" placeholder="Email" />
          <Input type="text" placeholder="Name" />
          <Input type="text" placeholder="Phone" />
          <Input type="password" placeholder="Password" />
          <Button>Sign Up</Button>
        </form>
        <img src={image2} className=" h-[600px] rounded-lg" />
      </Card>
    </div>
  );
}

export default Signup;
