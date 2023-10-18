import HomeNavbar from "@/component/homeNavbar";
import React from "react";
import image3 from "../assets/photo/home_image.jpeg";

function Home() {
  return (
    <div className=" bg-[#c4ece4] h-[100vh] ">
      <HomeNavbar />
      <div className=" flex  m-14 p-5">
        <div className=" grid ">
          <h1 className=" text-emerald-600"> ---------- Smart Management</h1>
          <h1 className=" font-bold text-7xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
          </h1>
          <h1 className=" font-semibold text-2xl break-words text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
            fuga magnam voluptatibus ut dolores quisquam porro. Nulla ipsam
            corporis expedita minus maiores neque beatae quia est animi
            suscipit. Voluptatibus, culpa!
          </h1>
        </div>
        <img src={image3} alt="" className=" h-[500px] rounded-full" />
      </div>
    </div>
  );
}

export default Home;
