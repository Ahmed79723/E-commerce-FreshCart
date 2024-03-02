import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../Context/CartContextProvider";
import { toast } from "react-toastify";
import { authContext } from "../Context/AuthContextProvider";
import { wishListContext } from "../Context/WishListContext";
// import { useQuery } from "react-query";

export default function Product({ item }) {
  const { setCounter, addToCart,BtnLoading, setBtnLoading } = useContext(cartContext);
  const { Token } = useContext(authContext);
  const { addWishProduct, loading, setLoading } = useContext(wishListContext);
  const nv = useNavigate();

  async function addWish(id) {
    let res = await addWishProduct(id);
  }

  async function addProductToCart(id) {
    if (Token) {
      setBtnLoading(true);
      let res = await addToCart(id);
      console.log(res);
      if (res.status == "success") {
        setBtnLoading(false);
        setCounter(res.numOfCartItems);
      }
      setBtnLoading(false);
    } else {
      toast.error("Please Log In First");
      setBtnLoading(false);
      setTimeout(() => {
        nv("/Login");
      }, 1500);
    }
  }
  // const { data, isLoading, isError } = useQuery(
  //   "addToCart",
  //   ()=>addToCart(item.id)
  // );
  // console.log(data?.data.data);
  return (
    <>
      <div className="col-md-2 position-relative overflow-hidden">
        <div className="product rounded-3 p-3">
          <button
            id="whish-btn"
            onClick={() => {
              addWish(item._id);
            }}
            className="position-absolute rounded-circle bg-main-light"
          >
            <i className="fa-solid fa-heart"></i>
          </button>
          <Link to={`/ProDetails/${item.id}`}>
            <img src={item.imageCover} className="w-100" alt="" />
            <span className="text-main font-sm">{item.category.name}</span>
            <h6 className="my-1 fw-bold">
              {item.title.split(" ").splice(0, 2).join(" ")}
            </h6>
            <div className="d-flex justify-content-between align-items-center my-2">
              <div className="price">{item.price} EGP</div>
              <div className="rate">
                <i className="fa-solid fa-star rating-color"></i>
                {item.ratingsAverage}
              </div>
            </div>
          </Link>
          <button
            onClick={() => {
              addProductToCart(item.id);
            }}
            className="btn bg-main w-100 text-white"
            disabled={BtnLoading}
          >
            {BtnLoading ? (
              <i className="fa-solid fa-spin fa-spinner text-white"></i>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
