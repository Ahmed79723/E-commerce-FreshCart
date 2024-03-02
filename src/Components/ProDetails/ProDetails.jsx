import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import Notfound from "../Notfound/Notfound";
import { cartContext } from "../Context/CartContextProvider";
import { Helmet } from "react-helmet";

// import { toast } from "react-toastify";

export default function ProDetails() {
  const { setCounter, counter, addToCart } = useContext(cartContext);
  const { id } = useParams();
  const [IsLoading, setIsLoading] = useState(false);

  function getProDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data, isLoading, isError } = useQuery(
    `getProDetails-${id}`,
    getProDetails
  );
  console.log(data?.data.data);
  const details = data?.data.data;
  if (isLoading) return <Loader />;
  if (isError) return <Notfound />;
  
  return (
    <>
    <Helmet>
        <title>{details.title} Product</title>
      </Helmet>
      <div className="container pt-5">
        <div className="row align-items-center py-5">
          <div className="col-md-3 pt-5">
            <figure>
              <img src={details.imageCover} className="w-100" alt="" />
            </figure>
          </div>
          <div className="col-md-9">
            <article>
              <h1 className="h3 pb-2">{details.title}</h1>
              <p>
                Product Description:<br></br>
                {details.description}
              </p>
              <div className="d-flex justify-content-between align-items-center my-2">
                <div className="price d-flex flex-column">
                  <span className="pb-2">{details.category.name}</span>
                  {details.price} EGP
                </div>
                <div className="rate">
                  <i className="fa-solid fa-star rating-color"></i>
                  {details.ratingsAverage}
                </div>
              </div>
              <button
                onClick={() => {
                  setIsLoading(true);
                  addToCart(details.id).then(() => {
                    setCounter(counter + 1);
                    setIsLoading(false);
                  });
                }}
                className="btn bg-main w-100"
                disabled={IsLoading}
              >
                {IsLoading ? (
                  <i className="fa-solid fa-spin fa-spinner text-white"></i>
                ) : (
                  "+ Add to Cart"
                )}
              </button>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
