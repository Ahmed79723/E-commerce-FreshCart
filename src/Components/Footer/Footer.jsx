import React from "react";

export default function Footer() {
  return (
    <>
      <div className="bg-main-light w-100 p-5 mt-5">
        <h3>Get the FreshCart App</h3>
        <p>
          We will Send you a Link ,Open it on your Phone to download the App
        </p>
        <div className="row gy-3 border-bottom py-4 px-5 justify-content-center">
          <div className="col-md-10">
            <div>
              <input
                type="email"
                className="form-control"
                placeholder="Email.."
              />
            </div>
          </div>
          <div className="col-md-2">
            <div>
              <button className="btn bg-main text-white">Share App Link</button>
            </div>
          </div>
        </div>
        <div className="row gy-3 border-bottom py-4 px-5 justify-content-center">
          <div className="col-md-6 d-flex">
            <span className="text-nowrap">Payment Partners</span>
            <div className="partnerIMGS d-flex justify-content-center align-items-center">
              <i className="fa-brands cursor-pointer fa-fw mx-2 fa-lg fa-amazon"></i>
              <i className="fa-brands cursor-pointer fa-fw mx-2 fa-lg fa-cc-mastercard"></i>
              <i className="fa-brands cursor-pointer fa-fw mx-2 fa-lg fa-cc-paypal"></i>
              <i className="fa-brands cursor-pointer fa-fw mx-2 fa-lg fa-cc-visa"></i>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-center">
          <span className="ms-auto text-nowrap">Get deliveries with FreshCart</span>
          <div className="partnerIMGS d-flex justify-content-center align-items-center">
          <i className="fa-brands fa-app-store-ios cursor-pointer fa-fw mx-2 fa-lg" style={{color: '#74C0FC'}}></i>
          <i className="fa-brands fa-google-play cursor-pointer fa-fw mx-2 fa-lg"></i>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
