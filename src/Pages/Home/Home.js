import React from "react";
import AdvertisedProducts from "./AdvertisedProducts/AdvertisedProducts";
import MainCarosel from "./MainCarosel/MainCarosel";

const Home = () => {
  return (
    <div>
      <MainCarosel />
      <AdvertisedProducts />
    </div>
  );
};

export default Home;
