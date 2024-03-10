import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authContext } from "./AuthContextProvider";
export let wishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [wishCount, setWishCount] = useState(0);
  const [allWishList, setAllWishList] = useState([]);
  const [allCats, setAllCats] = useState(null);
  const [oneCat, setOneCat] = useState(null);
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
    fetchCategories();
  }, []);

  async function addWishProduct(productId) {
    // setLoading(true);
    if (Token) {
      try {
        const res = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          { productId },
          { headers: { token: localStorage.getItem("tkn") } }
        );
        toast.success(res.data.message);
        getWhish();
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

  async function removeWish(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      );
      console.log(data);
      toast.warning("Product removed successfully from your wishlist");
      getWhish();
      return data;
    } catch (err) {
      toast.error(err.message);
      console.log(err);
      return err;
    }
  }
  // {^**********************************************************************************************************}
  async function fetchCategories() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((data) => {
        console.log(data.data);
        setAllCats(data.data.data);
        return allCats;
      })
      .catch((err) => {
        toast.error(err.errors.msg);
      });
  }
  async function getOneCat(id) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      .then((data) => {
        console.log("1 cat", data.data);
        setOneCat(data.data.data);
        console.log(oneCat);
        return data.data;
      })
      .catch((err) => {
        // toast.error(err.errors.msg);
        console.log(err);
      });
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
        getOneCat,
        allCats,
        oneCat,
      }}
    >
      {children}
    </wishListContext.Provider>
  );
}
