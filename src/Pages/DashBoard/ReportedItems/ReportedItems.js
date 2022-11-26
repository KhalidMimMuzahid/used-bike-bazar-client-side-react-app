import React from "react";
import { useLoaderData } from "react-router-dom";
import EachItem from "./EachItem/EachItem";

const ReportedItems = () => {
  const reportedItems = useLoaderData();
  return (
    <div>
      <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reportedItems?.map((eachitem, i) => (
          <EachItem key={i} eachitem={eachitem} />
        ))}
      </div>
    </div>
  );
};

export default ReportedItems;
