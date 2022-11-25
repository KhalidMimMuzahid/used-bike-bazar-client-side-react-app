import React from "react";

const EachBuyer = ({ index, eachBuyer }) => {
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={eachBuyer?.buyerImage} alt={eachBuyer?.buyerName} />
            </div>
          </div>
          <div>
            <div className="font-bold">{eachBuyer?.buyerName}</div>
            <div className="text-sm opacity-50">{eachBuyer?.buyerEmail}</div>
          </div>
        </div>
      </td>
      <td>
        <h1>{eachBuyer?.buyerPhone}</h1>
      </td>
    </tr>
  );
};

export default EachBuyer;
