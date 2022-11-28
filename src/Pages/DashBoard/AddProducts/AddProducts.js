import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthProvider";

const AddProducts = () => {
  const imageHostKey = process.env.REACT_APP_imagebb_key;
  const { currentUser, logOut } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleformSubmit = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData?.success) {
          //   console.log(imageData.data.display_url);
          const image = imageData.data.display_url;

          // toast.success("photo added");
          // console.log(
          //   "image",
          //   image,
          //   "\ndata",
          //   data,
          //   "\n currentUser",
          //   currentUser
          // );
          let date = new Date();
          let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
            date
          );
          let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(
            date
          );
          let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
            date
          );
          const postDate = `${da}-${mo}-${ye}`;
          const postInfo = {
            postDate,
            bikeModel: data?.name,
            engin: data?.engin,
            brandName: data?.brand,
            category: data?.category,
            brandNewPrice: data?.brandNewPrice,
            askingPrice: data?.askingPrice,
            bikeImage: image,
            totalUsed: data?.usedTime,
            sellerName: currentUser?.displayName,
            sellerEmail: currentUser?.email,
            sellerImage: currentUser?.photoURL,
            paymentStatus: "unpaid",
            sellingStatus: "unsold",
          };
          fetch("http://localhost:5000/addproduct", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Barerer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(postInfo),
          })
            .then((res) => {
              if (res.satus === 401 || res.status === 403) {
                logOut()
                  .then(() => {
                    localStorage.removeItem("accessToken");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                return;
              }
              return res.json();
            })
            .then((data) => {
              if (data?.acknowledged) {
                toast.success("your product is posted succesfully");
                reset();
              }
            });
        }
      });
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-96 px-4">
        <h1 className="text-xl text-center">Add Product</h1>
        <form onSubmit={handleSubmit(handleformSubmit)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Bike model</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "you must provide product name",
              })}
              className="input h-8 input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-600">{errors?.name?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Engin (CC)</span>
            </label>
            <input
              type="text"
              {...register("engin", {
                required: "you must provide engiene CC",
              })}
              className="input h-8 input-bordered w-full max-w-xs"
            />
            {errors.engin && (
              <p className="text-red-600">{errors?.engin?.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs flex">
            <label className="label ">
              <span className="label-text">Categories</span>
            </label>
            <select
              className="input h-8 input-bordered w-full max-w-xs"
              defaultValue="commuter"
              {...register("category")}
            >
              <option disabled selected>
                Please Select a category
              </option>
              <option value="commuter">commuter</option>
              <option value="sports">sports</option>
              <option value="naked-sports">naked sports</option>
              <option value="adventure">adventure</option>
              <option value="cafe-racer">cafeRacer</option>
              <option value="cruiser">cruiser</option>
              <option value="touring">touring</option>
              <option value="off-road">off road</option>
              <option value="scooters">scooters</option>
              <option value="dirt-bikes">dirt bikes</option>
              <option value="electric">electric</option>
              <option value="others">others</option>
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Brand Name</span>
            </label>
            <input
              type="text"
              {...register("brand", {
                required: "you must provide brand Name",
              })}
              className="input h-8 input-bordered w-full max-w-xs"
            />
            {errors.brand && (
              <p className="text-red-600">{errors?.brand?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">brand New Price</span>
            </label>
            <input
              type="number"
              {...register("brandNewPrice", {
                required: "you must provide brand New Price",
              })}
              className="input h-8 input-bordered w-full max-w-xs"
            />
            {errors.brandNewPrice && (
              <p className="text-red-600">{errors?.brandNewPrice?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Asking Price</span>
            </label>
            <input
              type="number"
              {...register("askingPrice", {
                required: "you must provide Asking Price",
              })}
              className="input h-8 input-bordered w-full max-w-xs"
            />
            {errors.askingPrice && (
              <p className="text-red-600">{errors?.askingPrice?.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Total Used</span>
            </label>
            <input
              type="text"
              {...register("usedTime", {
                required: "you must provide how many time you used this bike",
              })}
              className="input h-8 input-bordered w-full max-w-xs"
            />
            {errors.usedTime && (
              <p className="text-red-600">{errors?.usedTime?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Bike Photo</span>
            </label>
            <input
              type="file"
              {...register("image", {
                required: "you must provide your bike photo",
              })}
              className="input h-8 input-bordered w-full max-w-xs"
            />
            {errors.image && (
              <p className="text-red-600">{errors?.image?.message}</p>
            )}
          </div>

          <input
            className="btn btn-accent w-full"
            value="addProduct"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
