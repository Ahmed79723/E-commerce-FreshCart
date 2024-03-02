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
      <div className="pt-5">
        <h2 className="h1 text-center mt-5 py-5 text-main">Cart is Empty</h2>;
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
