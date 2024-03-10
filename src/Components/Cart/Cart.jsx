import React, { useContext, useDebugValue, useEffect, useState } from "react";
import { cartContext } from "../Context/CartContextProvider";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Item from "../Item/Item";
import { Helmet } from "react-helmet";

export default function Cart() {
  // const { getCart, deleteCartItem, setCounter } = useContext(cartContext);
  // const [Data, setData] = useState(null);
  // let { data, isLoading } = useQuery("getCart", getCart);
  // console.log(data?.data);
  // setData(data?.data)
  // let response = data?.data;
  // let response;
  // useEffect(() => {
  //   (async () => {
  //     await getCart();
  //     // response = res?.data;
  //     setData(data?.data);
  //     // console.log(res);
  //   })();
  // }, []);
  // async function deleteProduct(id) {
  //   let res = await deleteCartItem(id);
  //   console.log(res);
  //   if (res.status == "success") {
  //     toast.error("Product deleted successfully");
  //     setCounter(res.numOfCartItems);
  //     getCart(id);
  //     data = res.data;
  //     setData(data);
  //   }
  // }
  // if (isLoading || !data) return <Loader />;
  // !--------------------------------|Eng Ahmed Abel Muti Code|--------------------------------------------
  let {
    totalCartPrice,
    allProducts,
    Loading,
    counter,
    clearCart,
    setCounter,
    setTotalCartPrice,
    setAllProducts,
    // getCart,
  } = useContext(cartContext);
  // console.log(allProducts);
  // let [data, setData] = useState(null);
  // let [Loading, setLoading] = useState(true);

  async function myClearCart() {
    const res = await clearCart();
    if (res) {
      setCounter(0);
      setTotalCartPrice(0);
      setAllProducts(null);
      toast.warning("Cart Cleared Successfully!");
    } else {
      toast.error("An Error Ocurred!");
    }
  }

  if (Loading) return <Loader />;
  if (allProducts == null || counter == 0) {
    return (
      <div className="pt-5 d-flex justify-content-center align-items-center">
        <div className="text-center pb-5">
          <h2 className="h1 mt-5 pt-5 text-main">
            Cart is Empty{" "}
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              class="text-4xl"
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
        <title>Cart</title>
      </Helmet>
      <div className="container pt-4">
        <div className="CART mt-5 bg-main-light py-1 px-3 rounded-3 overflow-hidden">
          <h2 className="mt-5">Shop Cart: </h2>
          <div className="d-flex justify-content-between border-bottom">
            <p className="text-main">
              {/* Total Cart Price: {data?.data.totalCartPrice} EGP */}
              Total Cart Price: {totalCartPrice} EGP
            </p>
            <button
              className="btn btn-outline-danger mb-3"
              onClick={myClearCart}
            >
              Clear Cart
            </button>
          </div>
          {allProducts.products.map((thing) => {
            return <Item key={thing._id} product={thing} />;
          })}
          <Link
            className="btn bg-main text-white my-3 d-block m-auto px-5 order"
            to={`/Address/${allProducts._id}`}
          >
            Place Order
          </Link>
        </div>
      </div>
    </>
  );
}
