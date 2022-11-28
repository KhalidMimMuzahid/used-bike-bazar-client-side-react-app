import { toast } from "react-toastify";

const handleGoogleSignIn = (setLoginError, googleSignIn, setCUrrentUser) => {
  setLoginError("");
  googleSignIn()
    .then((result) => {
      const user = result.user;
      // ...
      console.log(user);

      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        userUid: user?.uid,
        role: "buyer",
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
            toast.success("profile signed up successfully");
            console.log(user);
            setCUrrentUser(user.email);
          }
        });

      // if (user) {
      //   navigate("/");
      // }
    })
    .catch((error) => {
      const errorMessage = error.message;
      setLoginError(errorMessage);
    });
};

export default handleGoogleSignIn;
