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
import axios from "axios";
import PerOrders from "./perOrders";

function OrderList() {
  const [orders, setOrders] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const getOrders = async () => {
    try {
      const data = await axios.get("http://localhost:8080/api/orders", config);

      console.log(data);
      setOrders(data && data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  // const openModal = () => {
  //   setShowModal(true);
  //   if (showModal) {
  //     setShowModal(false);
  //   }
  // };
  return (
    <div className="text-center">
      <h2>Orders</h2>

      {/* {orders.map((order) => (
          <li key={order.id}>
            {order.orderNumber} - {order.shipmentStatus}
          </li>
        ))} */}
      <div className="  my-16">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Order Total</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Customer Email</TableHead>
              <TableHead>Customer Phone</TableHead>
              <TableHead>Customer Address</TableHead>
              <TableHead>Created At</TableHead>
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
                    {order.Products}
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.CustomerFirstName} {order.CustomerLastName}
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.CustomerEmail}
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.CustomerPhone}
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.CustomerAddress}
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.CreatedAt}
                  </TableCell>
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
    </div>
  );
}

export default OrderList;
