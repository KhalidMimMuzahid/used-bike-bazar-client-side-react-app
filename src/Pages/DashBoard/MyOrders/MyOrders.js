import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import EachOrder from "./EachOrder/EachOrder";

const MyOrders = () => {
  const { currentUser } = useContext(AuthContext);
  const email = currentUser?.email;
  const { data: myorders = [], refetch } = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/myorders?email=${email}`);
      const data = await res.json();
      return data;
    },
  });
  return (
    <div>
      <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-6">
        {myorders?.map((eachOrder, i) => (
          <EachOrder key={i} eachOrder={eachOrder} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
