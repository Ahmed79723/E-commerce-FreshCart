import axios from "axios";
import React, { useState } from "react";
import Product from "../Product/Product";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

export default function Products() {
  const [ProductsList, setProductsList] = useState([]);
  const [flag, setFlag] = useState(false);

  function fetchProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading } = useQuery("fetchProducts", fetchProducts);
  let search = (search) => {
    let searchRes = [];
    for (var i = 0; i < data?.data.data.length; i++) {
      if (
        data?.data.data[i].title.toLowerCase().includes(search?.toLowerCase())
      ) {
        searchRes.push(data?.data.data[i]);
        setProductsList(searchRes);
      }
    }
    setFlag(true);
  };

  if (isLoading || data?.data.data.length === 0) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="container-fluid px-5">
        <div className="py-4"></div>
        <h2 className="pt-5 text-center">All Products</h2>
        <div className="title-bar__products mt-1 mx-auto"></div>
        <input
          id="searchInput"
          onChange={(e) => {
            search(e.target.value);
          }}
          className="form-control mt-5 w-75 mx-auto"
          placeholder="Search..."
          type="text"
        />
        <div id="Products" className="row justify-content-center gy-4 pt-5">
          {flag
            ? ProductsList?.map((item) => {
                return <Product key={item._id} item={item} />;
              })
            : data?.data.data.map((item) => {
                return <Product key={item._id} item={item} />;
              })}
        </div>
      </div>
    </>
  );
}
