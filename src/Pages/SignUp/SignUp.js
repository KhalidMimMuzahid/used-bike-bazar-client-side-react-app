import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";

const SignUp = () => {
  const { createUserwithPassword, updateUser, googleSignIn, okk } =
    useContext(AuthContext);
  console.log(okk);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [signUpError, setSignUpError] = useState("");

  const handleSignUp = (data) => {
    setSignUpError("");
    console.log(data);
    // createUserwithPassword(data.email, data.password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     // ...
    //     console.log(user);
    //     const info = {
    //       displayName: data.name,
    //     };
    //     updateUser(info)
    //       .then(() => {
    //         // Profile updated!
    //         // ...
    //         toast.success("profile updated");
    //         navigate("/");
    //       })
    //       .catch((error) => {
    //         // An error occurred
    //         // ...
    //         setSignUpError(error);
    //       });
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     setSignUpError(errorMessage);
    //     // ..
    //   });
  };
  const handleGoogleSignIn = () => {
    setSignUpError("");
    googleSignIn()
      .then((result) => {
        const user = result.user;
        // ...
        if (user) {
          navigate("/");
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        setSignUpError(errorMessage);
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
            <div className="flex justify-between">
              <label className="label ">
                <span className="label-text">Role</span>
              </label>
              <select defaultValue="buyer" {...register("role")}>
                <option value="buyer" selected>
                  buyer
                </option>
                <option value="seller">seller</option>
              </select>
            </div>
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
        </form>
        <p>
          already have an account?{" "}
          <Link to="/signin" className="text-secondary  font-bold">
            Go to signIn
          </Link>
        </p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default SignUp;
