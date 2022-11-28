import { useEffect, useState } from "react";

const useToken = (email) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      fetch(`https://used-bike-bazar-server.vercel.app/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("accessToken", data.token);
          setToken(data.token);
        });
    }
  }, [email]);
  return [token];
};
export default useToken;
