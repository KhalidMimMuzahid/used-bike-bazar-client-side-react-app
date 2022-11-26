import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const EachSeller = ({ index, eachSeller, refetch }) => {
  const isVerified = eachSeller?.isVerified === true ? true : false;
  const handleVerifySeller = () => {
    const userUid = eachSeller?.userUid;
    fetch(`http://localhost:5000/verifyseller?userUid=${userUid}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.acknowledged) {
          toast.success("this seller is verified");
          return refetch();
        }
      });
  };
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={eachSeller?.photo} alt={eachSeller?.name} />
            </div>
          </div>
          <div>
            <div className="font-bold">{eachSeller?.name}</div>
            <div className="text-sm opacity-50">{eachSeller?.email}</div>
          </div>
        </div>
      </td>
      <td>
        <button
          onClick={handleVerifySeller}
          disabled={isVerified}
          className={`btn btn-sm ${!isVerified && "bg-green-700"}`}
        >
          {isVerified ? "verified" : "verify"}
        </button>
      </td>
    </tr>
  );
};

export default EachSeller;
