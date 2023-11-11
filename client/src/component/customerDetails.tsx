import React from "react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { customerDetails } from "@/api/customer";
import { ChatState } from "@/context/userProvider";
import { Customer } from "@/types/customerTypes";
function CustomerDetails() {
  const [customer, setCustomer] = useState<Customer>();
  const [loading, setLoading] = useState(true);
  const { fetchAgain, user, setFetchAgain } = ChatState();
  const getData = async () => {
    try {
      const data = await customerDetails(user);
      setCustomer(data?.data);
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
  return (
    <Card className="text-center m-5">
      <div className="  my-16">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order Total</TableHead>
              <TableHead>Order Spent Money</TableHead>
              <TableHead>Product Id</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Customer Email</TableHead>
              <TableHead>Customer Phone</TableHead>
              <TableHead>Customer Address</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customer &&
              customer.map((cust: any) => (
                <TableRow key={cust.Id}>
                  <TableCell className="font-medium">
                    {cust.TotalOrders}
                  </TableCell>
                  <TableCell className="font-medium">
                    {cust.TotalSpent}
                  </TableCell>
                  <TableCell className="font-medium">
                    {cust.ProductId}
                  </TableCell>
                  <TableCell className="font-medium">
                    {cust.FirstName} {cust.LastName}
                  </TableCell>
                  <TableCell className="font-medium">{cust.Email}</TableCell>
                  <TableCell className="font-medium">{cust.Phone}</TableCell>
                  <TableCell className="font-medium">{cust.Address}</TableCell>
                  <TableCell className="font-medium">
                    {cust.CreatedAt}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

export default CustomerDetails;
