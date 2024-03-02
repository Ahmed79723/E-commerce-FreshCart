import React from "react";

export default function Loader() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="Loader">
          <i className="fa-solid fa-spin fa-spinner fa-5x text-main"></i>
        </div>
      </div>
    </>
  );
}
