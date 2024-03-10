import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";
import { wishListContext } from "../Context/WishListContext";
import { Link } from "react-router-dom";

export default function ECategories() {
  const { getOneCat, allCats } = useContext(wishListContext);

  // async function eFetchCategories() {
  //   return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  // }
  // const { isLoading, data } = useQuery("eFetchCategories", eFetchCategories);

  if (!allCats) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="container pt-5">
        <h2 className="pt-5 text-center h1">All Categories</h2>
        <div className="title-bar__products mt-1 mx-auto"></div>
        <div className="row gy-4 pt-5">
          {allCats.map((item, index) => {
            return (
              <Link 
              to={`/CatDetails/${item._id}`}
                role="button"
                onClick={() => {
                  getOneCat(item._id);
                }}
                key={index}
                className="col-md-4 rounded-3 overflow-hidden"
              >
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
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
