/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductDetails } from "@/api/product";
import { ChatState } from "@/context/userProvider";
import { useEffect, useState } from "react";
import { Product } from "@/types/productTypes";
function AddOrder() {
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
    <div className="  flex items-center justify-center">
      <form action=" " className="flex flex-col gap-3 p-5 w-1/3 ">
        <Input type="text" placeholder="Customer Firstname" />
        <Input type="text" placeholder="Customer Lastname" />
        <Input type="email" placeholder="Customer Email" />
        <Input type="number" placeholder="Customer Phone" />
        <Input type="text" placeholder="Customer Address" />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Product" />
          </SelectTrigger>
          <SelectContent>
            {product &&
              product.map((prod: any) => (
                <SelectItem value={prod.Id}>{prod.Name}</SelectItem>
              ))}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Button>Submit</Button>
      </form>
    </div>
  );
}

export default AddOrder;
