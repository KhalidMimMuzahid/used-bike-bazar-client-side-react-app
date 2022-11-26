import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import EachBuyer from "./EachBuyer/EachBuyer";

const MyBuyers = () => {
  const { currentUser } = useContext(AuthContext);
  const email = currentUser?.email;
  const {
    data: myBuyers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/mybuyers?email=${email}`);
      const data = await res.json();
      return data;
    },
  });
  if (myBuyers.length === 0) {
    return <h1>Your product not sold yet... </h1>;
  }
  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>serial</th>
              <th>User</th>
              <th>phone</th>
            </tr>
          </thead>
          <tbody>
            {myBuyers.map((eachBuyer, index) => (
              <EachBuyer key={index} index={index} eachBuyer={eachBuyer} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBuyers;
