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
      <div className="pt-4 container-fluid px-5">
        <MainSlider />
      </div>
      <Categories />
      {/* <input type="text" className="form-control" id="searchInput" value={''} onChange={} /> */}
      <Products />
    </>
  );
}
