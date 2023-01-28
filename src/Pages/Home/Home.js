import React from "react";
import AboutUs from "./AboutUs/AboutUs";
import AdvertisedProducts from "./AdvertisedProducts/AdvertisedProducts";
import Categories from "./Categories/Categories";
import ContactUS from "./ContactUS/ContactUS";
import GoToProducts from "./GoToProducts/GoToProducts";
import MainCarosel from "./MainCarosel/MainCarosel";

const Home = () => {
  return (
    <div>
      <MainCarosel />
      <AdvertisedProducts />
      <Categories />
      <GoToProducts />
      <AboutUs />
      <ContactUS />
    </div>
  );
};

export default Home;
