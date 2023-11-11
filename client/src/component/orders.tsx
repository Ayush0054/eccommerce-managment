// OrderList.js
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PerOrders from "./perOrders";
import { ChatState } from "@/context/userProvider";
import { orderDetails } from "@/api/orders";
import { Card } from "@/components/ui/card";
import { Order } from "@/types/orderTypes";

function OrderList() {
  const [orders, setOrders] = useState<Order>();
  const [loading, setLoading] = useState(true);
  // const [showModal, setShowModal] = useState(false);

  const { fetchAgain, user, setFetchAgain } = ChatState();
  const getData = async () => {
    try {
      const data = await orderDetails(user);
      setOrders(data?.data);
      setLoading(false);
      setFetchAgain(true);
      console.log(data);
      console.log(data?.data);
    } catch (error) {
      console.error("Error fetching seller data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [fetchAgain]);
  // const openModal = () => {
  //   setShowModal(true);
  //   if (showModal) {
  //     setShowModal(false);
  //   }
  // };
  return (
    <Card className="text-center m-5">
      <div className="  my-16">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order Total</TableHead>
              <TableHead>Order Number</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Customer Id</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders &&
              orders.map((order: any) => (
                <TableRow key={order.Id}>
                  <TableCell className="font-medium">
                    {order.OrderTotal}
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.OrderNumber}
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.Quantity}
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.ProductId}
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.CustomerId}
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.CreatedAt}
                  </TableCell>
                  <TableCell className="font-medium">{order.Status}</TableCell>
                  <TableCell>
                    <PerOrders
                      order={order}
                      // showModal={showModal}
                      // setShowModal={setShowModal}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

export default OrderList;
