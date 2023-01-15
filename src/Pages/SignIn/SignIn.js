import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";
import useToken from "../../hooks/useToken/useToken";
import handleGoogleSignIn from "../../Utilities/handleGoogleSignIn";

const SignIn = () => {
  const { signIn, googleSignIn, resetPassword } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [currentUser, setCUrrentUser] = useState(null);
  const [token] = useToken(currentUser);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  console.log("from", from);

  const navigate = useNavigate();
  if (token) {
    navigate(from, { replace: true });
  }
  const handleSignIn = (data) => {
    setLoginError("");
    signIn(data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setCUrrentUser(user.email);
        // navigate(from, { replace: true });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoginError(errorMessage);
      });
  };

  const handleResetPassword = (data) => {
    setLoginError("");
    console.log(data);
    resetPassword(data.email)
      .then(() => {
        // Password reset email sent!
        // ..
        alert("password reset email sent");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoginError(errorMessage);
        // ..
      });
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className=" px-4 py-8 w-96">
        <h1 className="font-bold text-center">credential Sample:</h1>
        <div>
          <h1 className="my-2">
            <span className="font-bold">buyer: </span>
            <input
              type="text"
              value="buyer1@gmail.com"
              readOnly
              className="border mb-1 pl-2"
            />
            <br />
            <span className="font-bold">password: </span>
            <input
              type="text"
              value="1@qWaS"
              readOnly
              className="border mb-1 pl-2"
            />
          </h1>
          <h1 className="my-2">
            <span className="font-bold">seller: </span>
            <input
              type="text"
              value="seller1@gmail.com"
              readOnly
              className="border mb-1 pl-2"
            />
            <br />
            <span className="font-bold">password: </span>
            <input
              type="text"
              value="1@qWaS"
              readOnly
              className="border mb-1 pl-2"
            />
          </h1>
          <h1 className="my-2">
            <span className="font-bold">admin: </span>
            <input
              type="text"
              value="admin@gmail.com"
              readOnly
              className="border mb-1 pl-2"
            />
            <br />
            <span className="font-bold">password: </span>
            <input
              type="text"
              value="1@qWaS"
              readOnly
              className="border pl-2"
            />
          </h1>
        </div>
      </div>
      <div className="w-96 px-7">
        <h1 className="text-xl text-center">Sign In</h1>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: "Email Address is required" })}
              type="email"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">password</span>
            </label>
            <input
              {...register("password", {
                required: "this field cannot be empty",
                minLength: {
                  value: 6,
                  message: "password must be at least 6 characters",
                },
              })}
              type="password"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
            {loginError && (
              <p className="text-red-600 font-bold">{loginError}</p>
            )}
            <label className="label">
              <span
                onClick={handleSubmit(handleResetPassword)}
                className="label-text hover:cursor-pointer"
              >
                Forget Password?
              </span>
            </label>
          </div>
          <input
            className="btn btn-accent w-full"
            value="Login"
            type="submit"
          />
        </form>
        <p>
          New to Doctors Portal?{" "}
          <Link to="/signup" className="text-secondary  font-bold">
            create new account
          </Link>
        </p>
        <div className="divider">OR</div>
        <button
          onClick={() =>
            handleGoogleSignIn(setLoginError, googleSignIn, setCUrrentUser)
          }
          className="btn btn-outline w-full"
        >
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default SignIn;
