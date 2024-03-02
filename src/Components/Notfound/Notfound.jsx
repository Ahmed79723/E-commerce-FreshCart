import React from "react";
import error from "../../finalProject assets/images/error.svg";
import { Helmet } from "react-helmet";

export default function Notfound() {
  return (
    <>
      <Helmet>
        <title>Shipping Information</title>
      </Helmet>
      <div className="d-flex flex-column justify-content-center align-item-center">
        <div className="py-5"></div>
        <img className="w-50 mx-auto" src={error} alt="" />
        <h2 className="text-center">Page Not Found!</h2>
      </div>
    </>
  );
}
