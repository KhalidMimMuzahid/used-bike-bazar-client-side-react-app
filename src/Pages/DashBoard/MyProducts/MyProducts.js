import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import EachProduct from "./EachProduct/EachProduct";

const MyProducts = () => {
  const { currentUser } = useContext(AuthContext);
  const email = currentUser?.email;
  const { data: myProducts = [], refetch } = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/myproducts?email=${email}`
      );
      const data = await res.json();
      return data;
    },
  });
  return (
    <div>
      <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-6">
        {myProducts?.map((eachProduct, i) => (
          <EachProduct key={i} eachProduct={eachProduct} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
