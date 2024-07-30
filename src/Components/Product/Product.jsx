import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../Context/CartContextProvider";
import { wishListContext } from "../Context/WishListContext";
import { useEffect } from "react";

export default function Product({ item }) {
  const { addToCart } = useContext(cartContext);
  const { addWishProduct, removeWish } = useContext(wishListContext);
  let [add2Wish, setAdd2Wish] = useState(false);
  let [add2Cart, setAdd2Cart] = useState(false);
  let [flag, setFlag] = useState(false);

  useEffect(() => {
    setFlag(localStorage.getItem("MyWhishListIds")?.includes(item.id));
  }, []);

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
    setAdd2Cart(true);
    await addToCart(id);
    setAdd2Cart(false);
  }

  const truncateTitle = (title, numWords) => {
    const words = title.split(" ");
    return words.length > numWords
      ? words.slice(0, numWords).join(" ") + "..."
      : title;
  };
  return (
    <>
      <div className="col-md-3 position-relative">
        <div className="product rounded-3 p-3 overflow-hidden">
          <div id="whish-btn" className="rounded-circle position-absolute">
            <div
              role="button"
              className={
                flag
                  ? "rounded-circle border-0 bg-danger"
                  : "rounded-circle border-0 bg-transparent"
              }
              disabled={add2Wish}
              onClick={() => {
                if (!flag) {
                  addWish(item._id);
                  setFlag(true);
                } else {
                  setFlag(false);
                  removeWishProduct(item._id);
                }
              }}
            >
              <>
                {add2Wish ? (
                  <div className="d-flex justify-content-center align-items-center py-2 rounded-circle">
                    <i className="fa-solid fa-spin fa-lg fa-spinner text-white py-2 px-2"></i>
                  </div>
                ) : (
                  <div>
                    {flag ? (
                      <div className="d-flex justify-content-center align-items-center py-2 rounded-circle">
                        <i className="fa-solid fa-heart fa-lg py-2 px-2 text-white"></i>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center align-items-center py-2 rounded-circle">
                        <i className="fa-regular fa-heart fa-lg py-2 px-2"></i>
                      </div>
                    )}
                  </div>
                )}
              </>
            </div>
          </div>
          <Link to={`/ProDetails/${item.id}`}>
            <img src={item.imageCover} className="w-100 rounded-5" alt="" />
            <span className="text-main font-sm">{item.category.name}</span>
            <h6 className="my-1 fw-bold">{truncateTitle(item.title, 3)}</h6>
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
            disabled={add2Cart}
          >
            {add2Cart ? (
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
