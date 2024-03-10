import React from "react";
import AmazonPayLogo from "../../finalProject assets/images/images/Amazon-Pay-logo.svg";
import PayPalLogo from "../../finalProject assets/images/images/PayPal-Logo.png";
import mastercard_logo from "../../finalProject assets/images/images/mastercard_logo.svg__3.png";
import appStore from "../../finalProject assets/images/images/app store.png";
import googlePlay from "../../finalProject assets/images/images/google play.png";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <div className="pt-5 bg-main-light mt-4">
        <div className="container-fluid px-5">
          <h2>Get the freshCart app</h2>
          <p className=" text-muted">
            We will send you a link, open it on your phone to download the app
          </p>
          <div className="row">
            <div className="col-md-9">
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email..."
                  aria-describedby="emailHelp"
                />
              </div>
            </div>
            <div className="col-md-3">
              <button
                type="submit"
                className="btn bg-main text-light  fw-bolder  w-100"
              >
                Share App Link
              </button>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <ul className=" list-unstyled d-flex">
              <li>Payment Partners</li>
              <li>
                <img
                  src={AmazonPayLogo}
                  alt={AmazonPayLogo}
                  className="master"
                />
              </li>
              <li>
                <img
                  src={mastercard_logo}
                  alt={mastercard_logo}
                  className="master"
                />
              </li>
              <li>
                <img src={PayPalLogo} alt={PayPalLogo} className="master" />
              </li>
            </ul>
            <ul className=" list-unstyled d-flex  align-items-center">
              <li>Get deliveries with FreshCart</li>
              <li>
                <img src={googlePlay} alt={googlePlay} className="store" />
              </li>
              <li>
                <img src={appStore} alt={appStore} className="store" />
              </li>
            </ul>
          </div>
          <hr />
          <div className="row justify-content-between">
            <div className="col-md-6">
              <p className="text-muted">
                Copy Right 2024 © By Ahmed All Rights Reserved
              </p>
            </div>
            <div className="col-md-6">
              <div className="nav-social">
                <ul className="list-unstyled d-flex justify-content-end">
                  <li className="mx-2">
                  <Link to={"https://www.facebook.com/Ahmed.Ashraf.56797/"}>
                    <i className="fa-brands fa-facebook fa-lg"></i>
                  </Link>
                  </li>
                  <li className="mx-2">
                  <Link to={"https://www.instagram.com/ahmed_ashraf797/"}>
                  <i className='fa-brands fa-instagram fa-lg'></i>
                  </Link>
                  </li>
                  <li className="mx-2">
                  <Link to={"https://twitter.com/ahmedashraf797"}>
                  <i className='fa-brands fa-twitter fa-lg'></i>
                  </Link>
                  </li>
                  <li className="mx-2">
                  <Link to={"https://www.linkedin.com/in/ahmed-ashraf-6a9a6a201/"}>
                    <i className="fa-brands fa-linkedin fa-lg"></i>
                  </Link>
                  </li>
                  <li className="mx-2">
                  <Link to={"https://github.com/Ahmed79723"}>
                    <i className="fa-brands fa-github fa-lg"></i>
                  </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
