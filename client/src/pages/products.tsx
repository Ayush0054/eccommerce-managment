import Layout from "@/component/layout";
import ProductsComponent from "@/component/products";
import React from "react";

function Products() {
  return (
    <div>
      <Layout>
        <div className="flex justify-center">
          <ProductsComponent />
        </div>
      </Layout>
    </div>
  );
}

export default Products;
