import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authContext } from "./AuthContextProvider";
export let wishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [wishCount, setWishCount] = useState(0);
  const [allWishList, setAllWishList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const { Token } = useContext(authContext);

  async function getWhish() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then(({ data }) => {
        console.log("getWish", data);
        setAllWishList(data.data);
        setWishCount(data.count);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("getWish err", err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getWhish();
  }, []);

  async function addWishProduct(productId) {
    setLoading(true);
    if (Token) {
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          { productId },
          { headers: { token: localStorage.getItem("tkn") } }
        );
        toast.success(data.message);
        setLoading(false);
        getWhish();
        return data;
      } catch (err) {
        setLoading(false);
        return err;
      }
    } else {
      toast.error("Please Log In First");
    }
  }

  async function removeWish(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      );
      console.log(data);
      return data;
    } catch (err) {
      toast.error(err.message);
      console.log(err);
      return err;
    }
  }

  return (
    <wishListContext.Provider
      value={{
        getWhish,
        wishCount,
        setWishCount,
        addWishProduct,
        removeWish,
        allWishList,
        setAllWishList,
        isLoading,
        setIsLoading,
        loading,
        setLoading,
      }}
    >
      {children}
    </wishListContext.Provider>
  );
}
