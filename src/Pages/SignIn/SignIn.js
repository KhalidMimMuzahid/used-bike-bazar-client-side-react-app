import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const SignIn = () => {
  const { signIn, googleSignIn, resetPassword } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const location = useLocation();
  const from = location.state?.location?.pathname || "/";
  const navigate = useNavigate();
  const handleSignIn = (data) => {
    setLoginError("");
    signIn(data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate(from, { replace: true });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoginError(errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    setLoginError("");
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
    <div className="h-screen flex justify-center items-center">
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
        <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default SignIn;
