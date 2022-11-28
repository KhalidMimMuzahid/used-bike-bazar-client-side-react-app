import { useQuery } from "@tanstack/react-query";
import React from "react";
import EachSeller from "./EachSeller/EachSeller";

const AllSellers = () => {
  const { data: allSellers = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(
        `https://used-bike-bazar-server.vercel.app/allsellers`
      );
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
            {allSellers.map((eachSeller, index) => (
              <EachSeller
                key={index}
                index={index}
                eachSeller={eachSeller}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSellers;
