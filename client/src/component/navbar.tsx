import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import React from "react";

function Navbar() {
  return (
    <div className=" flex justify-between p-3 bg-[aliceblue]">
      <Input className=" w-[300px]" placeholder="Search" />
      <h1 className=" text-gray-400 font-bold text-2xl"> Ayush</h1>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}

export default Navbar;
