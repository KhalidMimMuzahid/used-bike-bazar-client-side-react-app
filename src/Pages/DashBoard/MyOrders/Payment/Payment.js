import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { info } from "daisyui/src/colors";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../../../../Component/Loader/Loader";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
// console.log("key", stripePromise);
const Payment = () => {
  const [paymentError, setPaymentError] = useState("");
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/soldproductdetails?_id=${location?.state}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      });
  }, [location?.state]);
  if (isLoading) {
    return <Loader />;
  }
  const {
    post_id,
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
  } = product;

  const askingPriceInt = parseInt(askingPrice);
  return (
    <div className="w-full">
      <div className="card  mx-4 md:mx-20 lg:mx-24 xl:mx-36 2xl:mx-48 bg-base-100 shadow-xl">
        {/* <figure>
        <img src={bikeImage} alt="Shoes" />
      </figure> */}
        <div className="card-body">
          <div>
            <h2 className="card-title">
              {bikeModel}
              <div className="badge badge-primary">{brandName}</div>
            </h2>
            {/* <p>Engin(CC): {engin}</p> */}
            {/* <p>Category: {category}</p>
          <p>
            Brand New price: {brandNewPrice} <span className="text-xl">৳</span>
          </p> */}
            <p>
              price: {askingPrice} <span className="text-xl">৳</span>
            </p>
            {/* <h1>Seller Info:</h1> */}

            {/* <div className="flex items-center">
            <img
              src={sellerImage}
              alt=""
              className="rounded-full mr-2"
              style={{ height: "30px", width: "30px" }}
            />
            <h1>
              {sellerName}
              {product?.sellerVerified && (
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
          </div> */}
          </div>
          {/* <div className="card-actions justify-start">
          <h1>Product Id: {post_id}</h1>
          <p>are you sure to pay for {bikeModel}</p>
          <button className="btn block w-full">pay now</button>
        </div> */}
          <div className="m-4">
            <Elements stripe={stripePromise}>
              <CheckoutForm
                product={product}
                setPaymentError={setPaymentError}
                askingPriceInt={askingPriceInt}
              />
            </Elements>
          </div>
          {paymentError && <h1 className="text-red-700">{paymentError}</h1>}
        </div>
      </div>
    </div>
  );
};

export default Payment;
