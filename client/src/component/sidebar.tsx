import { RxDashboard } from "react-icons/rx";
import {
  BsCart,
  BsFillBagFill,
  BsFillCartCheckFill,
  BsPersonCircle,
} from "react-icons/bs";
import { IoPeopleSharp } from "react-icons/io5";
import { GrDocumentPerformance } from "react-icons/gr";
import { MdOutlineInventory2 } from "react-icons/md";
import { useNavigate } from "react-router";
function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className=" bg-[#ffffff] grid gap-10 w-[200px] h-[100vh] pt-20 border border-l-2 ">
      <div className=" flex flex-col gap-16">
        <button
          className=" text-gray-500 hover:text-gray-400 flex gap-3 items-center mx-5  "
          onClick={() => navigate("/dashboard")}
        >
          <RxDashboard />
          Dashboard
        </button>
        <button className=" text-gray-500 hover:text-gray-400  flex gap-3 items-center  mx-5">
          <BsFillCartCheckFill />
          Add orders
        </button>
        <button
          className=" text-gray-500 hover:text-gray-400 flex gap-3 items-center  mx-5 "
          onClick={() => navigate("/orders")}
        >
          <BsCart />
          orders
        </button>
        <button
          className=" text-gray-500 hover:text-gray-400 flex gap-3 items-center  mx-5 "
          onClick={() => navigate("/products")}
        >
          <BsFillBagFill />
          products
        </button>
        <button
          className=" text-gray-500 hover:text-gray-400 flex gap-3 items-center  mx-5"
          onClick={() => navigate("/customer")}
        >
          <IoPeopleSharp />
          customers
        </button>
        <button className=" text-gray-500 hover:text-gray-400 flex gap-3 items-center  mx-5">
          <GrDocumentPerformance />
          sales
        </button>
        <button
          className=" text-gray-500 hover:text-gray-400 flex gap-3 items-center  mx-5"
          onClick={() => navigate("/inventory")}
        >
          <MdOutlineInventory2 />
          inventory
        </button>
        <button
          className=" text-gray-500 hover:text-gray-400 flex gap-3 items-center  mx-5"
          onClick={() => navigate("/profile")}
        >
          <BsPersonCircle />
          Profile
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
