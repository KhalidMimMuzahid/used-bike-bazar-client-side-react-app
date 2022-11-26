import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import handleAdvertisePost from "../../../../Utilities/handlePostAdvertise";

const EachProduct = ({ eachProduct, refetch }) => {
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
  const handleDeletPost = (_id) => {
    const isAgree = window.confirm(
      "are you sure you want to delete this product?"
    );
    if (!isAgree) {
      return;
    }
    console.log(_id);
    fetch(`http://localhost:5000/delete?_id=${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.acknowledged) {
          toast.success("deleted succesfully");
          refetch();
        }
      });
  };
  const handleAdvertisePost = (_id) => {
    fetch(`http://localhost:5000/makeadvertisement?_id=${_id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.acknowledged) {
          toast.success("this post is advertised");
          refetch();
        }
      });
  };

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
          <p>Category: {category}</p>
          <p>
            Asking price: {askingPrice} <span className="text-xl">৳</span>
          </p>
          <p>status: {sellingStatus}</p>
          <p>post Date: {eachProduct?.postDate}</p>
          {/* <div className="flex items-center">
            <img
              src={sellerImage}
              alt=""
              className="rounded-full mr-2"
              style={{ height: "30px", width: "30px" }}
            />
            <h1>{sellerName}</h1>
          </div> */}
        </div>
        <div className="card-actions justify-start">
          <button
            disabled={eachProduct?.isAdvertise || sellingStatus === "sold"}
            onClick={() => handleAdvertisePost(_id)}
            className="btn btn-sm bg-green-700 text-white "
          >
            {eachProduct?.isAdvertise ? "Advertised" : "Advertise"}
          </button>

          <Link
            className="btn btn-sm"
            to={`/dashboard/myproducts/details/${_id}`}
          >
            details
          </Link>
          <button
            onClick={() => handleDeletPost(_id)}
            className="block w-full btn btn-sm bg-red-700 text-white "
          >
            delete post
          </button>
        </div>
      </div>
    </div>
  );
};

export default EachProduct;
