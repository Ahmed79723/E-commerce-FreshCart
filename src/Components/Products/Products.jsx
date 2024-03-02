import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Product from "../Product/Product";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";
import { cartContext } from "../Context/CartContextProvider";

export default function Products() {
  // const [ProductsList, setProductsList] = useState([]);
  const { BtnLoading } = useContext(cartContext);

  function fetchProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  // function setProData() {
  //   setProductsList(fetchProducts()?.data?.data);
  // }
  // setProData();
  const { data, isLoading } = useQuery("fetchProducts", fetchProducts);
  console.log(data?.data.data);
  // console.log(ProductsList);
  // const [Products, setProducts] = useState([]);
  // const [Loading, setLoading] = useState(true);
  // async function getProducts() {
  //   let { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/products"
  //   );
  //   console.log(data);
  //   setProducts(data.data);
  //   setLoading(false);
  // }

  // let search = (keyword) => {
  //   console.log(keyword);
  //   let cartona = ``;
  //   for (var i = 0; i < ProductsList?.length; i++) {
  //     if (
  //       ProductsList[i].title.toLowerCase().includes(keyword?.toLowerCase())
  //     ) {
  //       let item = ProductsList[i];
  //       console.log("search if?");
  //       // cartona +=<Product key={item._id} item={item} />
  //       cartona += `<div class="col-md-2 position-relative ">
  //       <div class="product rounded-3 p-3">
  //         <button
  //           id="whish-btn"
  //           onclick="() => {
  //             addWish(${item._id});
  //           }"
  //           class="position-absolute rounded-circle bg-main-light"
  //         >
  //           <i class="fa-solid fa-heart"></i>
  //         </button>
  //         <Link to="/ProDetails/${item.id}">
  //           <img src=${item.imageCover} class="w-100" alt="" />
  //           <span class="text-main font-sm">${item.category.name}</span>
  //           <h6 class="my-1 fw-bold">
  //             ${item.title.split(" ").splice(0, 2).join(" ")}
  //           </h6>
  //           <div class="d-flex justify-content-between align-items-center my-2">
  //             <div class="price">${item.price} EGP</div>
  //             <div class="rate">
  //               <i class="fa-solid fa-star rating-color"></i>
  //               ${item.ratingsAverage}
  //             </div>
  //           </div>
  //         </Link>
  //         <button
  //           onClick="() => {
  //             addProductToCart(${item.id});
  //           }
  //           class="btn bg-main w-100 text-white"
  //           disabled=${BtnLoading}
  //         >
  //           {${BtnLoading} ? (
  //             <i class="fa-solid fa-spin fa-spinner text-white"></i>
  //           ) : (
  //             "Add to Cart"
  //           )}"
  //         </button>
  //       </div>
  //     </div>`;
  //     }
  //   }
  //   document.getElementById("Products").innerHTML = cartona;
  // };

  // useEffect(function () {
  //   setProductsList(data?.data.data);
  //   console.log("fun return", search());
  // }, []);

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      {isLoading ? <Loader /> : ""}
      <div className="container-fluid px-5">
        <div className="py-4"></div>
        {/* <input
          id="searchInput"
          onKeyUp={() => {
            search(document.getElementById("searchInput").value);
          }}
          className="form-control mt-5 w-75 mx-auto"
          placeholder="Search..."
          type="text"
        /> */}
        <div id="Products" className="row gy-2 pt-5">
          {data?.data.data.map((item) => {
            return <Product key={item._id} item={item} />;
          })}
        </div>
      </div>
    </>
  );
}
