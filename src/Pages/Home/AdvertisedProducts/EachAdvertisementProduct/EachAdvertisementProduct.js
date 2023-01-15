import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../Context/AuthProvider";

const EachAdvertisementProduct = ({
  eachProduct,
  refetch,
  setSelectedProduct,
}) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
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
    postDate,
    _id,
  } = eachProduct;
  const handlePurchase = () => {
    if (!currentUser?.uid) {
      toast.error("you are not an user, please sign In");
      return navigate("/signin");
    }
    setSelectedProduct(eachProduct);
  };
  // to={`/products/productdetails/${_id}`}
  const handlePostDetails = () => {
    if (currentUser?.uid) {
      return navigate(`/products/productdetails/${_id}`);
    }
    toast.error("please login first");
    return navigate("/signin");
  };
  return (
    <div className="card w-92 bg-base-100 shadow-xl mx-auto  ">
      <figure>
        <img className="max-h-[300px]" src={bikeImage} alt="Shoes" />
      </figure>
      <div className="card-body justify-end">
        <div>
          <h2 className="card-title">
            {bikeModel}
            <div className="badge badge-primary">{brandName}</div>
          </h2>
          <p>Category: {category}</p>
          <p>
            Asking price: {askingPrice} <span className="text-xl">৳</span>
          </p>
          {/* <p>
          Brand new price  : {brandNewPrice} <span className="text-xl">৳</span>
          </p> */}
          <p>postDate: {postDate}</p>
          <div className="flex items-center">
            <img
              src={sellerImage}
              alt=""
              className="rounded-full mr-2"
              style={{ height: "30px", width: "30px" }}
            />
            <h1>
              {sellerName}{" "}
              {eachProduct?.sellerVerified && (
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
          <label
            onClick={handlePurchase}
            htmlFor="my-modal-3"
            className="btn btn-sm bg-green-700 text-white"
          >
            book
          </label>
          <button className="btn btn-sm" onClick={handlePostDetails}>
            details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EachAdvertisementProduct;
