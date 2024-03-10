import React from "react";
import { InfinitySpin } from "react-loader-spinner";
export default function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <InfinitySpin
        visible={true}
        width="200"
        color="#0aad0a"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
}
