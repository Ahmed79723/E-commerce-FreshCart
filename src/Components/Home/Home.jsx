import React, { useContext } from "react";
import MainSlider from "../MainSlider/MainSlider";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
        <MainSlider />
      <div className="pt-4 container-fluid px-5">
      </div>
      <Categories />
      <Products />
    </>
  );
}
