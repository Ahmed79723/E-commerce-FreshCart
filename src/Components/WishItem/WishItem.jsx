import React, { useContext, useState } from "react";
import { wishListContext } from "../Context/WishListContext";
import { cartContext } from "../Context/CartContextProvider";
import { toast } from "react-toastify";

export default function ({ item }) {
  const {
    removeWish,
    getWhish,
    wishCount,
    setWishCount,
    addWishProduct,
    setIsLoading,
    setAllWishList,
  } = useContext(wishListContext);
  const { addToCart } = useContext(cartContext);
  const [Delete, setDelete] = useState(false);
  const [wishLoad, setWishLoad] = useState(false);

  async function deleteProFromWish(id) {
    setDelete(true);
    let res = await removeWish(id);
    console.log("delete-24-wish", res);
    if (res.status == "success") {
      toast.success(res.data.message);
      getWhish();
      setDelete(false);
    }
  }

  async function addWishToCart(id) {
    setWishLoad(true);
    let res = await addToCart(id);
    if (res.status == "success") {
      deleteProFromWish(id);
      setWishLoad(false);
    } else {
      toast.error(res.data.message);
      setWishLoad(false);
    }
  }

  return (
    <>
      <div className="row align-items-center py-3 border-bottom">
        <div className="col-md-1">
          <img src={item.imageCover} className="w-100" alt="" />
        </div>
        <div className="col-md-11 d-flex justify-content-between">
          <div>
            <h4>{item.title.split(" ").splice(0, 2).join(" ")}</h4>
            <p className="text-main m-0">Price: {item.price} EGP</p>
            <button
              disabled={Delete}
              onClick={() => {
                deleteProFromWish(item._id);
              }}
              className="btn px-0 mx-0"
            >
              {Delete ? (
                <i className="fa-solid fa-spin fa-spinner text-main"></i>
              ) : (
                <>
                  <i className="fa-solid text-main fa-trash-can"></i> Remove
                </>
              )}
            </button>
          </div>
          <div>
            <button
              disabled={wishLoad}
              onClick={() => {
                addWishToCart(item._id);
              }}
              className="btn bg-main text-white"
            >
              {wishLoad ? (
                <i className="fa-solid fa-spin fa-spinner text-white"></i>
              ) : (
                "+ Add to Cart"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
