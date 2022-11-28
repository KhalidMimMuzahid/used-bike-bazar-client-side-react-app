import { useQuery } from "@tanstack/react-query";
import { info } from "daisyui/src/colors/colorNames";
import React, { useContext } from "react";
import Loader from "../../../Component/Loader/Loader";
import { AuthContext } from "../../../Context/AuthProvider";
import EachBuyer from "./EachBuyer/EachBuyer";

const MyBuyers = () => {
  const { currentUser, logOut } = useContext(AuthContext);
  const email = currentUser?.email;
  const {
    data: myBuyers,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/mybuyers?email=${email}`, {
        headers: {
          authorization: `Barerer ${localStorage.getItem("accessToken")}`,
        },
      });
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
