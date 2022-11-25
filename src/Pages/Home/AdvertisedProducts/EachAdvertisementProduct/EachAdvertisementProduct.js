import React from "react";
import { Link } from "react-router-dom";

const EachAdvertisementProduct = ({
  eachProduct,
  refetch,
  setSelectedProduct,
}) => {
  const {
    askingPrice,
    bikeImage,
    bikeModel,
    brandName,
    brandNewPrice,
    category,
    engin,
    paymentStatus,
    sellingStatus,
    sellerEmail,
    sellerImage,
    sellerName,
    totalUsed,
    _id,
  } = eachProduct;
  const handlePurchase = (_id) => {};
  return (
    <div className="card w-92 bg-base-100 shadow-xl mx-auto">
      <figure>
        <img src={bikeImage} alt="Shoes" />
      </figure>
      <div className="card-body">
        <div>
          <h2 className="card-title">
            {bikeModel}
            <div className="badge badge-primary">{brandName}</div>
          </h2>
          <p>Category: {category}</p>
          <p>
            Asking price: {askingPrice} <span className="text-xl">৳</span>
          </p>
          <div className="flex items-center">
            <img
              src={sellerImage}
              alt=""
              className="rounded-full mr-2"
              style={{ height: "30px", width: "30px" }}
            />
            <h1>{sellerName}</h1>
          </div>
        </div>
        <div className="card-actions justify-start">
          <label
            onClick={() => setSelectedProduct(eachProduct)}
            htmlFor="my-modal-3"
            className="btn btn-sm bg-green-700 text-white"
          >
            purchase
          </label>
          <Link
            className="btn btn-sm"
            to={`/dashboard/myproducts/details/${_id}`}
          >
            details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EachAdvertisementProduct;
