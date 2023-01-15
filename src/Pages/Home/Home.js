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
      {/* <div className="text-4xl font-extrabold text-center my-12">
        TODO: add total 8 section
      </div> */}
    </div>
  );
};

export default Home;
