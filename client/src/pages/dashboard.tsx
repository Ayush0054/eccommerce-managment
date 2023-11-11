import Layout from "@/component/layout";

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
      </Layout>
    </div>
  );
}

export default Dashboard;
