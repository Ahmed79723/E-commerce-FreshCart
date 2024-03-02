import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../Context/AuthContextProvider";
import { cartContext } from "../Context/CartContextProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
// import axios from "axios";

export default function Address() {
  const { setToken } = useContext(authContext);
  const { pay, cashPay } = useContext(cartContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCash, setIsCash] = useState(false);
  const [isOnline, setisOnline] = useState(false);
  const { id } = useParams();
  // const [isFalse, setIsisFalse] = useState(false);
  const [Loading, setLoading] = useState(false);
  // const [errApiMsg] = useState(undefined);
  // const nav = useNavigate();

  function onSubmit(values) {
    // setLoading(true);
    console.log(values);
    if (isCash) {
      cash(values);
      setIsCash(false);
    } else {
      online(values);
    }
  }

  async function online(values) {
    setisOnline(true);
    let res = await pay(id, values);
    console.log(res);
    if (res.status == "success") {
      setisOnline(false);
      // setIsisFalse(false);
      setIsSuccess(true);
      toast.success("Order Placed Successfully!");
      setTimeout(function () {
        window.location.href = res.session.url;
      }, 1500);
    } else {
      setIsSuccess(false);
      // setIsisFalse(true);
      setisOnline(false);
    }
  }
  async function cash(values) {
    setLoading(true);
    let res = await cashPay(values);
    setLoading(false);
  }

  const userData = {
    details: "",
    phone: "",
    city: "",
  };
  const mySchema = yup.object({
    details: yup.string().required("Address is Required"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "enter Valid Egyptian Number")
      .required("Required"),
    city: yup.string().required("City Name is required"),
  });
  const Address = useFormik({
    initialValues: userData,
    onSubmit,
    validationSchema: mySchema,
  });
  return (
    <>
      <Helmet>
        <title>Shipping Information</title>
      </Helmet>
      <div className="w-75 p-5 m-auto">
        <h2 className="pt-5">Enter Shipping Address :</h2>
        <form onSubmit={Address.handleSubmit}>
          <div className="row gy-3">
            <div className="col-12">
              <div>
                <label htmlFor="details">details</label>
                <textarea
                  name="details"
                  onBlur={Address.handleBlur}
                  onChange={Address.handleChange}
                  value={Address.values.details}
                  className="form-control"
                  type="text"
                  id="details"
                ></textarea>
                {Address.errors.details && Address.touched.details ? (
                  <div className="alert alert-danger my-2 p-1">
                    {Address.errors.details}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-12">
              <div>
                <label htmlFor="phone">phone</label>
                <input
                  name="phone"
                  onBlur={Address.handleBlur}
                  onChange={Address.handleChange}
                  value={Address.values.phone}
                  className="form-control "
                  type="text"
                  id="phone"
                />
                {Address.errors.phone && Address.touched.phone ? (
                  <div className="alert alert-danger my-2 p-1">
                    {Address.errors.phone}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-12">
              <div>
                <label htmlFor="city">city</label>
                <input
                  name="city"
                  onBlur={Address.handleBlur}
                  onChange={Address.handleChange}
                  value={Address.values.city}
                  className="form-control "
                  type="text"
                  id="city"
                />
                {Address.errors.city && Address.touched.city ? (
                  <div className="alert alert-danger my-2 p-1">
                    {Address.errors.city}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="form-btns my-3 d-flex">
            <button
              onClick={() => {
                setIsCash(true);
              }}
              disabled={!(Address.dirty && Address.isValid)}
              type="submit"
              className="btn bg-main rounded-3 text-white me-3 mt-3 d-block"
            >
              {Loading ? (
                <i className="fa-solid fa-spin fa-spinner text-white"></i>
              ) : (
                "Cash on Delivery"
              )}
            </button>
            <button
              disabled={!(Address.dirty && Address.isValid)}
              type="submit"
              className="btn bg-primary rounded-3 text-white mt-3 d-block"
            >
              {isOnline ? (
                <i className="fa-solid fa-spin fa-spinner text-white"></i>
              ) : (
                "Pay Online"
              )}
            </button>
          </div>

          {/* {isFalse ? (
            <div className="alert alert-danger text-center my-1 p-1">
              {errApiMsg}
            </div>
          ) : (
            ""
          )} */}
          {isSuccess ? (
            <div className="alert alert-success my-1 p-1 text-center">
              Redirecting....
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
}
