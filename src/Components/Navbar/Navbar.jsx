import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../finalProject assets/images/freshcart-logo.svg";
import { authContext } from "../Context/AuthContextProvider";
import { cartContext } from "../Context/CartContextProvider";
import { wishListContext } from "../Context/WishListContext";
import $ from "jquery";
import Cookies from "js-cookie";

export default function Navbar() {
  const { setToken, userInfo } = useContext(authContext);
  const { counter, setCounter } = useContext(cartContext);
  const { wishCount, setWishCount } = useContext(wishListContext);
  const navigate = useNavigate();
  function signOut() {
    setToken(null);
    localStorage.clear();
    Cookies.remove("userInfo");
    Cookies.remove("tkn");
    setCounter(0);
    setWishCount(0);
    navigate("/Login");
  }
  useEffect(() => {
    $("a").css("width", "fit-content");
    $("li").on("click", () => {
      $("#navbarSupportedContent").removeClass("show");
      $(".navbar-toggler").addClass("collapsed").attr("aria-expanded", "false");
    });
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-main-light py-2 position-fixed z-3 w-100">
        <div className="container-fluid mx-3">
          <NavLink className="navbar-brand" to="/Home">
            <img src={Logo} alt="Fresh Cart Logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/Home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Categories">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Brands">
                  Brands
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/AllOrders">
                  All Orders
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
              <li>
                <NavLink className="nav-link" to="/Profile">
                  <i className="fa-solid fa-user mx-1"></i>
                  <span className="fw-bold text-main">
                    {userInfo?.name ? `HI, ` + userInfo.name : ""}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link position-relative" to="/WhishList">
                  {wishCount ? (
                    <span className="position-absolute badge translate-middle rounded-pill bg-danger">
                      {wishCount}
                    </span>
                  ) : (
                    ""
                  )}
                  WhishList
                  <i className="fa-solid fa-heart mx-1"></i>
                </NavLink>
              </li>
              <li className="me-1">
                <NavLink className="nav-link position-relative" to="/Cart">
                  {counter ? (
                    <span className="position-absolute badge translate-middle rounded-pill bg-danger">
                      {counter}
                    </span>
                  ) : (
                    ""
                  )}
                  Cart
                  <i className="fa-solid fa-cart-shopping mx-1"></i>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" onClick={signOut}>
                  {Cookies.get("tkn") ? "SignOut" : "log In"}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
