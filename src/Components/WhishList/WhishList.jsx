import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { wishListContext } from "../Context/WishListContext";
import WishItem from "../WishItem/WishItem";

export default function WhishList() {
  const {
    setWishCount,
    addWishProduct,
    setLoading,
    getWhish,
    allWishList,
    isLoading,
    removeWish,
    setIsLoading,
    setAllWishList,
    wishCount,
    loading,
  } = useContext(wishListContext);
  console.log(allWishList);

  async function addWish(ID) {
    setLoading(true);
    let res = await addWishProduct(ID);
    console.log(res);
    if (res.data.status == "success") {
      setWishCount((prev) => prev + 1);
      getWhish();
      setLoading(false);
    } else {
      toast.error("Something went wrong!");
    }
  }

  if (isLoading) return <Loader />;
  if (allWishList.length == 0) {
    return (
      <div className="pt-5">
        <h2 className="h1 text-center mt-5 py-5 text-main">
          Wish List is Empty
        </h2>
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
