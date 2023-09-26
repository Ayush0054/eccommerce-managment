import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function PerOrders({
  order,
}: //   showModal,
//   setShowModal,
{
  order: any;
  //   showModal: any;
  //   setShowModal: any;
}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <>
        <h1
          className=" font-bold text-lg cursor-pointer flex justify-center items-center hover:bg-gray-200 p-1"
          onClick={() => setShowModal(true)}
        >
          update order
        </h1>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto md:max-w-3xl max-w-xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col md:w-full w-72 bg-white outline-none focus:outline-none p-5 md:p-10">
                  {/*header*/}
                  <div className=" grid justify-items-center" key={order.Id}>
                    <div className=" py-5 border-b-2 border-black">
                      <h1 className=" font-bold text-xl ">
                        {" "}
                        <span className="text-red-500">Name : </span>{" "}
                        {order.CustomerFirstName} {order.CustomerLastName}
                      </h1>
                      <h1 className=" font-bold text-xl ">
                        {" "}
                        <span className="text-red-500">product : </span>{" "}
                        {order.Products}
                      </h1>
                      <h1 className=" font-bold text-xl ">
                        {" "}
                        <span className="text-red-500">product : </span>{" "}
                        {order.OrderNumber}
                      </h1>
                    </div>
                    <Select>
                      <h1 className="text-xl font-extrabold mb-5">
                        select status
                      </h1>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In Transit">In Transit</SelectItem>
                        <SelectItem value="Out for Delivery">
                          Out for Delivery
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <button
                      className=" bg-red-500 font-bold uppercase px-6 py-2 m-2 mt-5 hover:bg-red-300 rounded-md text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    </div>
  );
}

export default PerOrders;
