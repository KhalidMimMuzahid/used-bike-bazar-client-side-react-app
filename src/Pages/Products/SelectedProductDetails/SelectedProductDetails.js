import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthProvider";

const SelectedProductDetails = () => {
  const { currentUser } = useContext(AuthContext);
  //   const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
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
    postDate,
    _id,
  } = products;
  const [isCurrentReported, setIsCurrentReported] = useState(
    products?.isReported
  );
  const handlePurchaseProduct = (data) => {
    const buyerImage = currentUser.photoURL;
    let date = new Date();
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
    const soldDate = `${da}-${mo}-${ye}`;
    const soldProductInfo = {
      ...data,
      postDate,
      soldDate,
      buyerImage,
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
      post_id: _id,
    };
    // console.log("soldProductInfo", soldProductInfo);
    fetch("http://localhost:5000/buyproduct", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(soldProductInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.acknowledged) {
          toast.success(`${bikeModel} bought successfully`);
          reset();
          return window.history.go(-1);
        }
        toast.error("something went wrong, please try again");
      });
  };
  const handleReportToAdmin = () => {
    fetch(`http://localhost:5000/reporttoadmin?_id=${_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.acknowledged) {
          toast.success("successfully reported to admin");
          return setIsCurrentReported(true);
        }
        toast.error("something went wrong, please try again");
      });
  };
  return (
    <>
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
              Brand New price: {brandNewPrice}{" "}
              <span className="text-xl">৳</span>
            </p>
            <p>
              Asking price: {askingPrice} <span className="text-xl">৳</span>
            </p>
            <p>
              status:{" "}
              {sellingStatus === "sold" ? "Stock Out" : "available products"}
            </p>
            {/* seller info  */}
            <div className="flex items-center">
              <img
                src={sellerImage}
                alt=""
                className="rounded-full mr-2"
                style={{ height: "30px", width: "30px" }}
              />
              <h1>
                {sellerName}
                {products?.sellerVerified && (
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
          <div className="card-actions justify-end">
            <label
              htmlFor="purchase-modal"
              className="btn btn-sm bg-green-700 text-white"
            >
              purchase
            </label>
            <button
              disabled={isCurrentReported}
              onClick={handleReportToAdmin}
              className=" btn btn-sm bg-red-700 text-white "
            >
              {isCurrentReported ? "reported" : "report to admin"}
            </button>
          </div>
        </div>
      </div>
      {
        <>
          <input type="checkbox" id="purchase-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="purchase-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <form onSubmit={handleSubmit(handlePurchaseProduct)}>
                <div className="form-control">
                  <label className="input-group input-group-vertical my-1">
                    <span>Product Name</span>
                    <input
                      defaultValue={bikeModel}
                      readOnly
                      type="text"
                      placeholder="Product Name"
                      className="input input-bordered  input-sm"
                    />
                  </label>
                  <label className="input-group input-group-vertical my-1">
                    <span>Price</span>
                    <input
                      readOnly
                      defaultValue={askingPrice}
                      type="text"
                      placeholder="Price"
                      className="input input-bordered  input-sm"
                    />
                  </label>
                  <label className="input-group input-group-vertical my-1">
                    <span>Your Name</span>
                    <input
                      {...register("buyerName")}
                      defaultValue={currentUser?.displayName}
                      readOnly
                      type="text"
                      placeholder="your Name"
                      className="input input-bordered  input-sm"
                    />
                  </label>
                  <label className="input-group input-group-vertical my-1">
                    <span>Your Email</span>
                    <input
                      {...register("buyerEmail")}
                      defaultValue={currentUser?.email}
                      readOnly
                      type="text"
                      placeholder="Your Email"
                      className="input input-bordered  input-sm"
                    />
                  </label>
                  <label className="input-group input-group-vertical my-1">
                    <span>phone Number</span>
                    <input
                      {...register("buyerPhone", {
                        required: "you must provide your phone number",
                      })}
                      type="text"
                      placeholder="your phone number"
                      className="input input-bordered  input-sm"
                    />
                  </label>
                  {errors?.buyerPhone && (
                    <p className="text-red-600">
                      {errors?.buyerPhone?.message}
                    </p>
                  )}
                  <label className="input-group input-group-vertical my-1">
                    <span>Meeting location</span>
                    <input
                      {...register("meetingLocation", {
                        required: "you must provide meeting location",
                      })}
                      type="text"
                      placeholder="Meeting location"
                      className="input input-bordered  input-sm"
                    />
                  </label>
                  {errors?.meetingLocation && (
                    <p className="text-red-600">
                      {errors?.meetingLocation?.message}
                    </p>
                  )}

                  <input
                    type="submit"
                    value="submit"
                    className="input input-bordered  input-sm hover:bg-slate-400 hover:cursor-pointer"
                  />
                </div>
              </form>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default SelectedProductDetails;
