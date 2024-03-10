import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";

import BrandItem from "../BrandItem/BrandItem";

export default function Brands() {
  // const [brandLoad, setBrandLoad] = useState(false);
  // const [brand, setBrand] = useState([]);
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  async function getSpecificBrand(id) {
    // setBrandLoad(true);
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((res) => {
        console.log("fun", res);
        // setBrandLoad(false);
        return res.data.data;
        // setBrand(res.data.data)
      })
      .catch((err) => {
        console.log(err);
        // setBrandLoad(false);
      });
  }

  const { data, isLoading, isError } = useQuery("getBrands", getBrands);
  console.log(data);
  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <div>
        <p>Opps!, An Error Occurred!</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <div className="container pt-5">
        <h3 className="h1 fw-bolder pt-5 text-center">All Brands</h3>
        <div className="title-bar__products mt-1 mx-auto"></div>
        <div className="row gy-4 pt-5">
          {data.data.data.map((item) => {
            return (
              <>
                <BrandItem key={item._id} item={item} fun={getSpecificBrand} />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
