import Layout from "@/component/layout";
import OrderList from "@/component/orders";
import React from "react";

function Orders() {
  return (
    <div>
      <Layout>
        <OrderList />
      </Layout>
    </div>
  );
}

export default Orders;
