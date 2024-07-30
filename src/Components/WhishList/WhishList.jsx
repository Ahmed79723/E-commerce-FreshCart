import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import Loader from "../Loader/Loader";
import { wishListContext } from "../Context/WishListContext";
import WishItem from "../WishItem/WishItem";
import { Link } from "react-router-dom";

export default function WhishList() {
  const { allWishList, isLoading } = useContext(wishListContext);
  if (isLoading) return <Loader />;
  if (allWishList.length === 0) {
    return (
      <div className="pt-5 d-flex justify-content-center align-items-center">
        <div className="text-center pb-5">
          <h2 className="h1 mt-5 pt-5 text-main">
            WhishList is Empty{" "}
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="text-4xl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M1.41 1.13 0 2.54l4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38A1.997 1.997 0 0 0 17 22c.67 0 1.26-.33 1.62-.84L21.46 24l1.41-1.41L1.41 1.13zM7 15l1.1-2h2.36l2 2H7zM20 4H7.12l2 2h9.19l-2.76 5h-1.44l1.94 1.94c.54-.14.99-.49 1.25-.97l3.58-6.49C21.25 4.82 20.76 4 20 4zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2z"></path>
            </svg>
          </h2>
          <Link id="emptyLink" to={"/Products"}>
            Continue Shopping?
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>WhishList</title>
      </Helmet>
      <div className="container pt-4">
        <div className="CART mt-5 bg-main-light py-1 px-3 rounded-3 overflow-hidden">
          <h2 className="mt-5 fw-bold border-bottom">Wish List: </h2>
          {allWishList.map((item) => {
            return <WishItem key={item._id} item={item} />;
          })}
        </div>
      </div>
    </>
  );
}
