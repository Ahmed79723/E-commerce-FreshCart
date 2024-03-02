import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "react-query";

export default function ECategories() {
  async function eFetchCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { isLoading, data } = useQuery("eFetchCategories", eFetchCategories);
  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="container pt-5">
        <h3 className="h1 fw-bolder text-main pt-5 text-center">
          All Categories
        </h3>
        <div className="row gy-4 pt-5">
          {data?.data.data.map((item) => {
            return (
              <div className="col-md-4 rounded-3 overflow-hidden">
                <div className="card product d-flex flex-column">
                  <div className="card-body d-flex justify-content-center h-100">
                    <img
                      height={350}
                      src={item.image}
                      alt={item.slug}
                      className="w-100"
                    />
                  </div>
                  <p className="card-text px-5 py-3 text-main text-center">
                    {item.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
