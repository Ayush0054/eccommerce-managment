import HomeNavbar from "@/component/homeNavbar";

import image3 from "../assets/photo/home_image.jpeg";

function Home() {
  return (
    <div className=" bg-[aliceblue] h-[100vh] flex justify-center  ">
      <div className=" w-3/4 ">
        <HomeNavbar />
        <div className=" flex  m-14 p-5">
          <div className=" grid ">
            <h1 className=" text-blue-300"> ---------- Smart Management</h1>
            <h1 className=" font-bold text-7xl">
              manage your business with ease
            </h1>
            <h1 className=" font-semibold text-2xl break-words text">
              we offer you the best service to manage your business by adding
              your products and customers and orders and you can also see your
              products, customers and orders
            </h1>
          </div>
          <img src={image3} alt="" className=" h-[500px] rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default Home;
