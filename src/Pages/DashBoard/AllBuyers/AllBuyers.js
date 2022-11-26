import { useQuery } from "@tanstack/react-query";
import React from "react";
import EachBuyer from "../MyBuyers/EachBuyer/EachBuyer";

const AllBuyers = () => {
  const { data: allBuyers = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/allbuyers`);
      const data = await res.json();
      return data;
    },
  });
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
            {allBuyers.map((eachBuyer, index) => (
              <EachBuyer key={index} index={index} eachBuyer={eachBuyer} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBuyers;
