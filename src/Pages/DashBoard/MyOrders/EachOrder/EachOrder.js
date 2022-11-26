import React from "react";
import { Link } from "react-router-dom";

const EachOrder = ({ eachOrder }) => {
  const {
    askingPrice,
    bikeImage,
    bikeModel,
    brandName,
    brandNewPrice,
    category,
    engin,
    sellerEmail,
    sellerImage,
    sellerName,
    totalUsed,
    meetingLocation,
    soldDate,
    postDate,
    _id,
  } = eachOrder;
  return (
    <div className="card w-72 bg-base-100 shadow-xl">
      <figure>
        <img src={bikeImage} alt="Shoes" />
      </figure>
      <div className="card-body">
        <div>
          <h2 className="card-title">
            {bikeModel}
            <div className="badge badge-primary">{brandName}</div>
          </h2>
          <p>Engin(CC): {engin}</p>
          <p>Category: {category}</p>
          <p>
            Brand New price: {brandNewPrice} <span className="text-xl">৳</span>
          </p>
          <p>
            Asking price: {askingPrice} <span className="text-xl">৳</span>
          </p>
          <p>post Date: {postDate}</p>
          <p>Purchase Date: {soldDate}</p>
          <p>Meeting Location: {meetingLocation}</p>
          <h1>Seller Info:</h1>
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
        {/* <div className="card-actions justify-start">

          <Link
            className="btn btn-sm"
            to={`/dashboard/myproducts/details/${_id}`}
          >
            details
          </Link>
          <button
            className="block w-full btn btn-sm bg-red-700 text-white "
          >
            delete post
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default EachOrder;
