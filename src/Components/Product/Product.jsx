import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../Context/CartContextProvider";
import { toast } from "react-toastify";
import { authContext } from "../Context/AuthContextProvider";
import { wishListContext } from "../Context/WishListContext";
import Cookies from "js-cookie";

// import { useQuery } from "react-query";

export default function Product({ item }) {
  const { setCounter, addToCart, setBtnLoading, getWhish } =
    useContext(cartContext);
  const { Token } = useContext(authContext);
  const { addWishProduct, removeWish } = useContext(wishListContext);
  const nv = useNavigate();
  let [add2Wish, setAdd2Wish] = useState(false);
  let [flag, setFlag] = useState(false);

  const truncateTitle = (title, numWords) => {
    const words = title.split(" ");
    return words.length > numWords
      ? words.slice(0, numWords).join(" ") + "..."
      : title;
  };

  async function addWish(id) {
    setAdd2Wish(true);
    await addWishProduct(id);
    setAdd2Wish(false);
  }

  async function removeWishProduct(id) {
    setAdd2Wish(true);
    await removeWish(id);
    setAdd2Wish(false);
  }

  async function addProductToCart(id) {
    if (Token) {
      setAdd2Wish(true);
      let res = await addToCart(id);
      console.log(res);
      if (res.status == "success") {
        setBtnLoading(false);
        setCounter(res.numOfCartItems);
      }
      setAdd2Wish(false);
    } else {
      toast.error("Please Log In First");
      setAdd2Wish(false);
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
      <div className="col-md-3 position-relative">
        <div className="product rounded-3 p-3 overflow-hidden">
          <div id="whish-btn" className="rounded-circle position-absolute p-1">
            <button
              className={
                flag
                  ? "rounded-circle border-0 bg-danger"
                  : "rounded-circle border-0 bg-transparent"
              }
              disabled={add2Wish}
              onClick={() => {
                if (!flag) {
                  addWish(item._id);
                  Cookies.set("isWhishListed", "true");
                  setFlag(true);
                } else {
                  setFlag(false);
                  removeWishProduct(item._id);
                  Cookies.set("isWhishListed", "false");
                }
                console.log(Cookies.get("isWhishListed"));
              }}
            >
              {add2Wish ? (
                <i className="fa-solid fa-spin fa-spinner"></i>
              ) : (
                <i className="fa-solid fa-heart fa-lg"></i>
              )}
            </button>
          </div>
          <Link to={`/ProDetails/${item.id}`}>
            <img src={item.imageCover} className="w-100 rounded-5" alt="" />
            <span className="text-main font-sm">{item.category.name}</span>
            <h6 className="my-1 fw-bold">
              {/* {item.title.split(" ").splice(0, 3).join(" ") + "..."} */}
              {truncateTitle(item.title, 3)}
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
            disabled={add2Wish}
          >
            {add2Wish ? (
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
