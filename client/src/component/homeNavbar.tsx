import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router";

function HomeNavbar() {
  const navigate = useNavigate();
  const redirectSignup = () => {
    navigate("/signup");
  };
  return (
    <div className="bg-[#c4ece4] p-14">
      <div className=" flex items-center justify-between   p-2 gap-5 bg-green-100 border border-gray-200 rounded-md">
        <h1 className=" font-bold text-2xl text-emerald-950">MangEcco</h1>
        <div className=" flex gap-10 ml-10 ">
          <Popover>
            <PopoverTrigger>Open</PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>Open </PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>
        </div>

        <Button onClick={redirectSignup}>Sign Up</Button>
      </div>
    </div>
  );
}

export default HomeNavbar;
