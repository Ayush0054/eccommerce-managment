import { Card } from "@/components/ui/card";
import React from "react";

function Sidebar() {
  return (
    <Card className=" bg-[#c7ffe3] grid gap-10">
      <button>Add orders</button>
      <button>view orders</button>
      <button>view products</button>
      <button>view customers</button>
      <button>view sales</button>
      <button>view inventory</button>
    </Card>
  );
}

export default Sidebar;
