import React from "react";
import { useForm } from "react-hook-form";

const AddProducts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleformSubmit = () => {};
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-96 px-4">
        <h1 className="text-xl text-center">Add Product</h1>
        <form onSubmit={handleSubmit(handleformSubmit)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Product Name</span>
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
