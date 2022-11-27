import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import React, { useEffect, useState } from "react";

const CheckoutForm = ({ setPaymentError, askingPriceInt, product }) => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [isProgress, setIsProgress] = useState(false);
  const [isPaid, setIspaid] = useState(false);
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
    buyerEmail,

    _id,
  } = product;
  console.log("post_id", post_id, "buyerEmail", buyerEmail);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentError("");
    setPaymentStatus("");
    setPaymentId("");
    setIsProgress(true);
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentError(error?.message);
      setIsProgress(false);
      return;
    } else {
      setPaymentError("");
      //   console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: buyerEmail,
          },
        },
      });
    if (confirmError) {
      setIsProgress(false);
      setPaymentError(confirmError.message);
      return;
    }
    if (paymentIntent) {
      // TODO: update database for change payment status  post_id paymentIntent?.id
      fetch(
        `http://localhost:5000/setpaymentstatus?post_id=${post_id}&paymentId=${paymentIntent?.id}`,
        { method: "POST" }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.acknowledged) {
            setPaymentStatus(paymentIntent?.status);
            setPaymentId(paymentIntent?.id);
            setIspaid(true);
            setIsProgress(false);
          } else {
            setPaymentError("something went wrong, please try again");
          }
        });
    }
  };
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: askingPriceInt }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [askingPriceInt]);
  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={
            !stripe ||
            !clientSecret ||
            product?.paymentStatus === "paid" ||
            isPaid
          }
          className="btn btn-sm w-full bg-green-700"
        >
          {!stripe ||
          !clientSecret ||
          product?.paymentStatus === "paid" ||
          isPaid
            ? "Paid"
            : "Pay"}
        </button>
      </form>
      {paymentStatus === "succeeded" && paymentId && (
        <div>
          <h1 className="text-green-700 text-lg">you have paid successfully</h1>
          <h1>
            payment Id: <span className="font-bold text-lg">{paymentId}</span>
          </h1>
        </div>
      )}
      {isProgress && (
        <div>
          <h1 className="text-2xl">progressing......</h1>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
