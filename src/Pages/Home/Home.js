import React from "react";
import AdvertisedProducts from "./AdvertisedProducts/AdvertisedProducts";
import Categories from "./Categories/Categories";
import MainCarosel from "./MainCarosel/MainCarosel";

const Home = () => {
  return (
    <div>
      <MainCarosel />
      <AdvertisedProducts />
      <Categories />
    </div>
  );
};

export default Home;
