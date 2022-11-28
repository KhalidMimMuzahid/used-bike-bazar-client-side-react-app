import { useQuery } from "@tanstack/react-query";
import { info } from "daisyui/src/colors";
import React, { useContext } from "react";
import Loader from "../../../Component/Loader/Loader";
import { AuthContext } from "../../../Context/AuthProvider";
import EachProduct from "./EachProduct/EachProduct";

const MyProducts = () => {
  const { currentUser, logOut } = useContext(AuthContext);
  const email = currentUser?.email;
  const {
    data: myProducts,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/myproducts?email=${email}`,
        {
          headers: {
            authorization: `Barerer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (res.satus === 401 || res.status === 403) {
        logOut()
          .then(() => {
            localStorage.removeItem("accessToken");
          })
          .catch((error) => {
            console.log(error);
          });
        return;
      }
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }
  if (myProducts.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h1>You have no products yet</h1>
      </div>
    );
  }
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
