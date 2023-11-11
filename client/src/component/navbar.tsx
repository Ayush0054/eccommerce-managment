import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatState } from "@/context/userProvider";

import { useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();
  const user = ChatState();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };
  return (
    <div className=" flex justify-between p-3 bg-[#ffffff]">
      <Input className=" w-[300px]" placeholder="Search" />
      <h1 className=" text-gray-600 font-bold text-2xl">
        {" "}
        {user?.user?.data?.seller?.Name}
      </h1>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.pngsas " />
        <AvatarFallback> {user?.user?.data?.seller?.Name[0]}</AvatarFallback>
      </Avatar>
      <Button onClick={handleLogout} className=" bg-orange-400">
        Logout
      </Button>
    </div>
  );
}

export default Navbar;
