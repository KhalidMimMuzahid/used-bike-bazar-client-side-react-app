import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Loader from "../../../Component/Loader/Loader";
import EachProduct from "./EachProduct/EachProduct";

const ProductsDisplay = () => {
  // const [productCategory, setProductCategory] = useState("all");
  const productCategory = useLoaderData();
  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [productCategory],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/productsbycategory?categoryName=${productCategory}`
      );
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }
  console.log("products", products);
  return (
    <div className="">
      {products?.length === 0 && (
        <h1 className="font-bold text-2xl text-center mt-20">
          There have no products of {productCategory}
        </h1>
      )}
      <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products?.map((eachProduct, i) => (
          <EachProduct key={i} eachProduct={eachProduct} />
        ))}
      </div>
    </div>
  );
};

export default ProductsDisplay;
