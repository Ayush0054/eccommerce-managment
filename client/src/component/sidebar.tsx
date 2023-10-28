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
function Sidebar() {
  return (
    <div className=" bg-[#ffffff] grid gap-10 w-[200px] h-[100vh] pt-20 border border-l-2 ">
      <div className=" flex flex-col gap-16">
        <button className=" text-gray-500 hover:text-gray-400 flex gap-3 items-center mx-5  ">
          <RxDashboard />
          Dashboard
        </button>
        <button className=" text-gray-500 hover:text-gray-400  flex gap-3 items-center  mx-5">
          <BsFillCartCheckFill />
          Add orders
        </button>
        <button className=" text-gray-500 hover:text-gray-400 flex gap-3 items-center  mx-5 ">
          <BsCart />
          orders
        </button>
        <button className=" text-gray-500 hover:text-gray-400 flex gap-3 items-center  mx-5 ">
          <BsFillBagFill />
          products
        </button>
        <button className=" text-gray-500 hover:text-gray-400 flex gap-3 items-center  mx-5">
          <IoPeopleSharp />
          customers
        </button>
        <button className=" text-gray-500 hover:text-gray-400 flex gap-3 items-center  mx-5">
          <GrDocumentPerformance />
          sales
        </button>
        <button className=" text-gray-500 hover:text-gray-400 flex gap-3 items-center  mx-5">
          <MdOutlineInventory2 />
          inventory
        </button>
        <button className=" text-gray-500 hover:text-gray-400 flex gap-3 items-center  mx-5">
          <BsPersonCircle />
          Profile
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
