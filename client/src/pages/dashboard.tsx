import Layout from "@/component/layout";
import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

function Dashboard() {
  return (
    <div>
      <Layout>
        <Card className=" w-[300px] bg-[#ffffff] m-5 p-5">
          <h1 className=" text-xl font-bold text-center">Storage left</h1>
          <div className=" flex items-center justify-center">
            <Progress value={35} className=" bg-white m-2" />
            <h1 className=" text-xl font-semibold text-center">40%</h1>
          </div>
        </Card>

        <Button className="p-8 h-[150px] w-[150px] bg-white text-black text-xl hover:bg-slate-50">
          Add Products
        </Button>
      </Layout>
    </div>
  );
}

export default Dashboard;
