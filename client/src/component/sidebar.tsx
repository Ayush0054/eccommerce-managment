import { Card } from "@/components/ui/card";
import React from "react";

function Sidebar() {
  return (
    <div className=" bg-[#ffffff] grid gap-10 w-[200px] h-[100vh] pt-20 border border-l-2 ">
      <div className=" flex flex-col gap-24">
        <button className=" text-gray-500 hover:text-gray-400 ">
          Dashboard
        </button>
        <button className=" text-gray-500 hover:text-gray-400 ">
          Add orders
        </button>
        <button className=" text-gray-500 hover:text-gray-400">
          view orders
        </button>
        <button className=" text-gray-500 hover:text-gray-400">
          view products
        </button>
        <button className=" text-gray-500 hover:text-gray-400">
          view customers
        </button>
        <button className=" text-gray-500 hover:text-gray-400">
          view sales
        </button>
        <button className=" text-gray-500 hover:text-gray-400">
          view inventory
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
