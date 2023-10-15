import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import image2 from "../assets/photo/signup-image.jpeg";
function Signup() {
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
