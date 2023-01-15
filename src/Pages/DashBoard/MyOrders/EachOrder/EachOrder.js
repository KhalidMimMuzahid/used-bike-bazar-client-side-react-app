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
  // console.log(eachOrder);
  return (
    <div className="card w-72 bg-base-100 shadow-xl">
      <figure>
        <img className="max-h-[300px]" src={bikeImage} alt="Shoes" />
      </figure>
      <div className="card-body justify-end">
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
            <h1>
              {sellerName}
              {eachOrder?.sellerVerified && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="green"
                  className="w-6 h-6  inline"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clip-rule="evenodd"
                  />
                </svg>
              )}
            </h1>
          </div>
        </div>
        <div className="card-actions justify-start">
          {/* <Link
            className="btn btn-sm"
            to={`/dashboard/myproducts/details/${_id}`}
          >
            details
          </Link> */}
          <Link to="/dashboard/payment" state={_id}>
            <button
              disabled={eachOrder?.paymentStatus === "paid"}
              className="block w-full btn btn-sm bg-green-700 text-white "
            >
              {eachOrder?.paymentStatus === "paid" ? "paid" : "pay!"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EachOrder;
