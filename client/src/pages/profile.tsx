// import { Layout } from "lucide-react";
import Layout from "@/component/layout";
import { useEffect, useState } from "react";
import { sellerDetails } from "@/api/seller";
import { Card } from "@/components/ui/card";
import { SellerParams } from "@/types/sellerTypes";
import { ChatState } from "@/context/userProvider";

function Profile() {
  const [seller, setSeller] = useState<SellerParams>();
  const [loading, setLoading] = useState(true);
  const { fetchAgain, user } = ChatState();
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await sellerDetails(user);
        setSeller(data?.data.seller);
        setLoading(false);
        console.log(data);
        console.log(data?.data.seller);
      } catch (error) {
        console.error("Error fetching seller data:", error);
        setLoading(false);
      }
    };

    getData();
  }, [fetchAgain]);

  return (
    <div>
      <Layout>
        <Card>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <div className=" flex flex-col items-center justify-center">
              <h1 className=" text-xl font-bold text-center">{seller?.Name}</h1>
              <h1 className=" text-xl font-bold text-center">
                {seller?.Email}
              </h1>
              <h1 className=" text-xl font-bold text-center">
                {seller?.Phone}
              </h1>
              <h1 className=" text-xl font-bold text-center">
                {seller?.Address}
              </h1>
            </div>
          )}
        </Card>
      </Layout>
    </div>
  );
}

export default Profile;
