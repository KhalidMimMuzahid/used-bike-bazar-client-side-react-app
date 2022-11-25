import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthProvider";
import EachAdvertisementProduct from "./EachAdvertisementProduct/EachAdvertisementProduct";

const AdvertisedProducts = () => {
  const { currentUser } = useContext(AuthContext);
  const { data: advertisedProducts = [], refetch } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/advertisedproducts");
      const data = await res.json();
      return data;
    },
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const handlePurchaseProduct = (data) => {
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
    } = selectedProduct;
    const buyerImage = currentUser.photoURL;
    // console.log(data);
    const soldProductInfo = {
      ...data,
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
          setSelectedProduct(null);
          return refetch();
        }
        toast.error("something went wrong, please try again");
      });
  };
  return (
    <>
      {advertisedProducts.length !== 0 && (
        <div className="my-12">
          <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-6 justify-center ">
            {advertisedProducts?.map((eachProduct, i) => (
              <EachAdvertisementProduct
                key={i}
                eachProduct={eachProduct}
                refetch={refetch}
                setSelectedProduct={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      )}

      {selectedProduct && (
        <>
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="my-modal-3"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <form onSubmit={handleSubmit(handlePurchaseProduct)}>
                <div className="form-control">
                  <label className="input-group input-group-vertical my-1">
                    <span>Product Name</span>
                    <input
                      defaultValue={selectedProduct?.bikeModel}
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
                      defaultValue={selectedProduct?.askingPrice}
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
      )}
    </>
  );
};

export default AdvertisedProducts;
