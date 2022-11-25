import React from "react";
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const navigate = useNavigate();
  const products = useLoaderData();
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
  } = products;
  const handleDeletPost = (_id) => {
    console.log(_id);
    fetch(`http://localhost:5000/delete?_id=${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.acknowledged) {
          toast.success("deleted succesfully");
          navigate("/dashboard/myproducts");
        }
      });
  };
  return (
    <div className="card w-full px-12 md:px-36 lg:px-32 xl:px-48 bg-base-100 shadow-xl">
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
          <p>Engin (CC): {engin}</p>
          <p>Used (total): {totalUsed} </p>
          <p>
            Brand New price: {brandNewPrice} <span className="text-xl">৳</span>
          </p>
          <p>
            Asking price: {askingPrice} <span className="text-xl">৳</span>
          </p>
          <p>status: {sellingStatus}</p>
          {/* seller info  */}
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
        <div className="card-actions justify-end">
          <button
            onClick={() => handleDeletPost(_id)}
            className="w-full btn btn-sm bg-red-700 text-white "
          >
            delet Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
