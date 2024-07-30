import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../Context/CartContextProvider";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
// import { useQuery } from "react-query";

export default function AllOrders() {
  const [allOrders, setAllOrders] = useState(null);
  const { CartOwner, Loading, setLoading } = useContext(cartContext);
  async function getOrders() {
    setLoading(true);
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${CartOwner}`)
      .then(({ data }) => {
        setAllOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  }
  useEffect(() => {
    getOrders();
  }, []);
  if (Loading) {
    return <Loader />;
  }

  if (allOrders == null || allOrders.length === 0) {
    return (
      <div className="pt-5">
        <h2 className="h1 text-center mt-5 py-5 text-main">
          There are No Orders Yet!
        </h2>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>All Orders</title>
      </Helmet>
      <div className="container pt-4">
        <div className="CART mt-5 bg-main-light py-1 px-3 rounded-3 overflow-hidden">
          <h2 className="mt-5">All Orders: </h2>
          <div className="border-bottom border-top">
            {allOrders?.map((order, idx) => {
              return (
                <div
                  key={idx}
                  className="row align-items-center p-3 border-bottom"
                >
                  <div className="row text-center gy-2">
                    {order.cartItems.map((cartItem, idx) => {
                      return (
                        <div key={idx} className="col-md-4 pb-2">
                          <img
                            src={cartItem.product.imageCover}
                            className="w-25"
                            alt=""
                          />
                          <div>
                            {cartItem.product.title}
                            <br />
                            <strong>Item Count :</strong> {cartItem.count}
                            <br />
                            <strong>Item Price :</strong> {cartItem.price}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="row p-3 gy-3 ordr-brdr justify-content-between align-items-center">
                    <div className="text-muted col-md-6">
                      <p className="text-main m-0">
                        <span className="text-black fw-bold">Order ID: </span>
                        {order._id}
                      </p>
                      <p className="text-main m-0">
                        <span className="text-black fw-bold">
                          Total Order Price:{" "}
                        </span>
                        {order.totalOrderPrice} EGP
                      </p>
                      <p className="text-main m-0">
                        <span className="text-black fw-bold">
                          Payment Method Type:{" "}
                        </span>
                        {order.paymentMethodType}
                      </p>
                    </div>
                    <div className="col-md-6 Shipping">
                      <strong className="text-main">Shipping to</strong>:
                      <br />
                      <strong>Address</strong>: {order.shippingAddress?.details}
                      <br />
                      <strong>City</strong>: {order.shippingAddress?.city},
                      <br />
                      <strong>Phone</strong>: {order.shippingAddress?.phone}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
