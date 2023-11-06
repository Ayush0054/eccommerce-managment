// import { Layout } from "lucide-react";
import Layout from "@/component/layout";
import { useEffect, useState } from "react";
import { sellerDetails } from "@/api/seller";
import { Card } from "@/components/ui/card";

function Profile() {
  const [seller, setSeller] = useState(null);
  const getData = async () => {
    const data = await sellerDetails();
    setSeller(data?.data.seller);
    console.log(data?.data.seller);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Layout>
        <Card>
          <div className=" flex flex-col items-center justify-center">
            <h1 className=" text-xl font-bold text-center">{seller?.Name}</h1>
            <h1 className=" text-xl font-bold text-center">{seller?.Email}</h1>
            <h1 className=" text-xl font-bold text-center">{seller?.Phone}</h1>
            <h1 className=" text-xl font-bold text-center">
              {seller?.Address}
            </h1>
          </div>
        </Card>
      </Layout>
    </div>
  );
}

export default Profile;
