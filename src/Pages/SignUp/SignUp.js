import { useQuery } from "@tanstack/react-query";
import { info } from "daisyui/src/colors/colorNames";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Progresser from "../../Component/Progresser/Progresser";
import { AuthContext } from "../../Context/AuthProvider";
import useToken from "../../hooks/useToken/useToken";
import handleGoogleSignIn from "../../Utilities/handleGoogleSignIn";

const SignUp = () => {
  const {
    createUserwithPassword,
    updateUser,
    googleSignIn,
    useRoleRefreshwithToggle,
    setUseRoleRefreshwithToggle,
  } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const imageHostKey = process.env.REACT_APP_imagebb_key;
  const navigate = useNavigate();
  const [signUpError, setSignUpError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isProgressing, setIsProgressing] = useState(false);
  const [token] = useToken(currentUser);
  if (token) {
    setUseRoleRefreshwithToggle(!useRoleRefreshwithToggle);
    navigate("/");
  }
  const handleSignUp = (data) => {
    setIsProgressing(true);
    setSignUpError("");
    createUserwithPassword(data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);
        // console.log("user", user, "\n", data.image[0]);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((imageData) => {
            if (imageData?.success) {
              //   console.log(imageData.data.display_url);
              const photoUrl = imageData.data.display_url;

              const info = {
                displayName: data.name,
                photoURL: photoUrl,
              };
              updateUser(info)
                .then(() => {
                  // Profile updated!
                  // ...

                  // TODO: save data to the database

                  //   console.log("user", user, "\n", "data", data);
                  const userInfo = {
                    name: user?.displayName,
                    email: user?.email,
                    photo: user?.photoURL,
                    userUid: user?.uid,
                    role: data?.role,
                  };
                  fetch("https://used-bike-bazar-server.vercel.app/user", {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(userInfo),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.acknowledged) {
                        setIsProgressing(false);

                        toast.success("profile signed up successfully");

                        setCurrentUser(user.email);
                      }
                    });
                })
                .catch((error) => {
                  // An error occurred
                  // ...(false)
                  setIsProgressing(false);
                  setSignUpError(error);
                });
            }
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setSignUpError(errorMessage);
        // ..
        setIsProgressing(false);
      });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-96 px-7">
        <h1 className="text-xl text-center">Sign Up</h1>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "you must provide your name" })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-600">{errors?.name?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "you must provide email address",
                minLength: {
                  value: 6,
                  message: "",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-600">{errors?.email?.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs flex">
            <label className="label ">
              <span className="label-text">Role</span>
            </label>
            <select
              className="input input-bordered w-full max-w-xs"
              defaultValue="buyer"
              {...register("role")}
            >
              <option disabled selected>
                Please Select a role
              </option>
              <option value="buyer">buyer</option>
              <option value="seller">seller</option>
            </select>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Your Photo</span>
            </label>
            <input
              type="file"
              {...register("image", {
                required: "you must provide your photo",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.image && (
              <p className="text-red-600">{errors?.image?.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "you must provide password",
                minLength: {
                  value: 6,
                  message: "the password must be at least 6 characters",
                },
                pattern: {
                  value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                  message: "the password must be strngth",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-600">{errors?.password?.message}</p>
            )}
            {signUpError && (
              <p className="text-red-600 font-bold">{signUpError}</p>
            )}
          </div>
          <input
            className="btn btn-accent w-full"
            value="SignUp"
            type="submit"
          />
          {
            <>
              {isProgressing && (
                <>
                  <Progresser />
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}

                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {" "}
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black">
                    {" "}
                  </div>
                </>
              )}
            </>
          }
        </form>

        <p>
          already have an account?{" "}
          <Link to="/signin" className="text-secondary  font-bold">
            Go to signIn
          </Link>
        </p>
        <div className="divider">OR</div>
        <button
          onClick={() =>
            handleGoogleSignIn(setSignUpError, googleSignIn, setCurrentUser)
          }
          className="btn btn-outline w-full"
        >
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default SignUp;
