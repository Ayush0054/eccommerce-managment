import Navbar from "@/component/navbar";
import Sidebar from "@/component/sidebar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

function Dashboard() {
  return (
    <div>
      <div className=" flex justify-between">
        <Sidebar />
        <div className=" w-[100vw] ">
          <Navbar />
          <Card className=" w-[300px] bg-[#ffffff] m-5 p-5">
            <h1 className=" text-xl font-bold text-center">Storage left</h1>
            <div className=" flex items-center justify-center">
              <Progress value={33} className=" bg-white m-2" />
              <h1 className=" text-xl font-semibold text-center">40%</h1>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
