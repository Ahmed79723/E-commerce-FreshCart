import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../finalProject assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import Footer from "../Footer/Footer";
import $ from "jquery";
import { useEffect } from "react";

export default function AuthLayout() {
  useEffect(() => {
    $("a").css("width", "fit-content");
    $("li").on("click", () => {
      $("#navbarSupportedContent").removeClass("show");
      $(".navbar-toggler").addClass("collapsed").attr("aria-expanded", "false");
    });
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-2">
        <div className="container-fluid mx-3">
          <NavLink className="navbar-brand" to="/Login">
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
            <ul className="navbar-nav d-flex list-unstyled ms-auto text-center">
              <Link
                to="https://www.facebook.com/Ahmed.Ashraf.56797/"
                className="text-black text-decoration-none mx-3"
              >
                <i className="fa-brands fa-facebook"></i>
              </Link>
              <Link
                to="https://www.instagram.com/ahmed_ashraf797/"
                className="text-black text-decoration-none mx-3"
              >
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link
                to="https://twitter.com/ahmedashraf797"
                className="text-black text-decoration-none mx-3"
              >
                <i className="fa-brands fa-twitter"></i>
              </Link>
              <Link
                to="https://www.linkedin.com/in/ahmed-ashraf-6a9a6a201/"
                className="text-black text-decoration-none mx-3"
              >
                <i className="fa-brands fa-linkedin"></i>
              </Link>
              <Link to="/#" className="text-black text-decoration-none mx-3">
                <i className="fa-brands fa-tiktok"></i>
              </Link>
              <Link to="/#" className="text-black text-decoration-none mx-3">
                <i className="fa-brands fa-youtube"></i>
              </Link>
            </ul>
            <ul className="navbar-nav d-flex align-items-center justify-content-center ms-auto list-unstyled">
              <li className="nav-item">
                <NavLink className="nav-link mx-1" to="/Login">
                  LogIn
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link  mx-1" to="/Register">
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
      <Footer />
    </>
  );
}
