import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContextProvider";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
export let cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [counter, setCounter] = useState(0);
  const { Token } = useContext(authContext);
  const [allProducts, setAllProducts] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [CartID, setCartID] = useState(null);
  const [CartOwner, setCartOwner] = useState(null);
  let [Loading, setLoading] = useState(true);
  const [BtnLoading, setBtnLoading] = useState(false);

  function getCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: Cookies.get("tkn") },
      })
      .then(({ data }) => {
        setAllProducts(data.data);
        setCounter(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartID(data.data._id);
        setCartOwner(data.data.cartOwner);
        setLoading(false);
      })
      .catch((err) => {
        console.log("getCart Error", err);
        if (err.response?.data.message) {
          const fullString = err.response?.data?.message;
          const [body, ID] = fullString.split(": ");
          setCartOwner(ID);
        }
        setLoading(false);
      });
  }

  useEffect(() => {
    getCart();
  }, [Token]);

  async function addToCart(productId) {
    if (Token) {
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/cart",
          { productId },
          { headers: { token: Cookies.get("tkn") } }
        );
        toast.success("Product Added successfully to Cart");
        getCart();
        return data;
      } catch (err) {
        // Handle errors for non-successful responses
        if (err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          // Handle errors for non-successful responses
          console.error("failed(network):", err.message);
        }
      }
    } else {
      toast.error("Please Log In First");
    }
  }

  function deleteCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: { token: Cookies.get("tkn") },
      })
      .then(({ data }) => data)
      .catch((err) => err);
  }

  function updateQty(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        {
          headers: { token: Cookies.get("tkn") },
        }
      )
      .then(({ data }) => data)
      .catch((err) => err);
  }

  async function clearCart() {
    const res = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: Cookies.get("tkn") },
      })
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    console.log(res);
    return res;
  }

  function pay(cartId, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        { shippingAddress },
        {
          headers: { token: Cookies.get("tkn") },
        }
      )
      .then(({ data }) => data)
      .catch((err) => err);
  }

  function cashPay(shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${CartID}`,
        { shippingAddress },
        {
          headers: { token: Cookies.get("tkn") },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Order Placed Successfully!");
          setCounter(0);
          setTotalCartPrice(0);
          setAllProducts(null);
          setTimeout(function () {
            // nav('/Home')
            window.location = "http://localhost:3000/Home";
          }, 1500);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <cartContext.Provider
      value={{
        counter,
        Loading,
        addToCart,
        getCart,
        deleteCartItem,
        updateQty,
        pay,
        allProducts,
        totalCartPrice,
        clearCart,
        CartID,
        cashPay,
        CartOwner,
        setAllProducts,
        setCartOwner,
        setCounter,
        setTotalCartPrice,
        setLoading,
        BtnLoading,
        setBtnLoading,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
