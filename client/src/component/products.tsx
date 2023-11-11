/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { ProductDetails } from "@/api/product";
import { ChatState } from "@/context/userProvider";
import { useEffect, useState } from "react";
import { Product } from "@/types/productTypes";

function ProductsComponent() {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const { fetchAgain, user, setFetchAgain } = ChatState();
  const getData = async () => {
    try {
      const data = await ProductDetails(user);
      setProduct(data?.data);
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
    <Card className="text-center m-5 w-1/2 ">
      {loading && <div className="text-center">Loading...</div>}
      <div className="  my-16">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product &&
              product.map((prod: any) => (
                <TableRow key={prod.Id}>
                  <TableCell className="font-medium">{prod.Name}</TableCell>
                  <TableCell className="font-medium">
                    {prod.Description}
                  </TableCell>
                  <TableCell className="font-medium">{prod.Price}</TableCell>
                  <TableCell className="font-medium">{prod.Sales}</TableCell>
                  <TableCell className="font-medium">{prod.Quantity}</TableCell>
                  <TableCell className="font-medium">
                    {prod.CreatedAt}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

export default ProductsComponent;
