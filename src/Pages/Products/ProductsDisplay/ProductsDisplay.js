import { useQuery } from "@tanstack/react-query";
import { info } from "daisyui/src/colors";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

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
    return <h1>loading</h1>;
  }
  return <div>category: {products.length}</div>;
};

export default ProductsDisplay;
