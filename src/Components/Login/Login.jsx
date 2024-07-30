import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../Context/AuthContextProvider";
import { Helmet } from "react-helmet";
import { cartContext } from "../Context/CartContextProvider.js";
import { wishListContext } from "../Context/WishListContext.js";
import Cookies from "js-cookie";

export default function Login() {
  const { setToken, getUserData } = useContext(authContext);
  const [isSuccess, setisSuccess] = useState(false);
  const [isFalse, setisFalse] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [errApiMsg, seterrApiMsg] = useState(undefined);
  let navigate = useNavigate();
  const { getCart } = useContext(cartContext);
  const { getWhish } = useContext(wishListContext);

  useEffect(() => {
    getCart();
    getWhish();
  }, []);

  async function sendData(user) {
    setLoading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", user)
      .then((x) => {
        if (x.data.message === "success") {
          setisSuccess(true);
          setLoading(false);
          setisFalse(false);
          Cookies.set("tkn", x.data.token);
          getUserData();
          setToken(x.data.token);

          setTimeout(function () {
            navigate("/Home");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        setisFalse(true);
        setLoading(false);
        setisSuccess(false);
        seterrApiMsg(err.message);
      });
  }
  const userData = {
    email: "",
    password: "",
  };
  const mySchema = yup.object({
    email: yup.string().email("Invalid Email").required("Email is Required"),
    password: yup
      .string()
      .min(6, "password should be at least 6 characters long")
      .required("Required"),
  });

  function onSubmit(values) {
    sendData(values);
  }

  const myFormik = useFormik({
    initialValues: userData,
    onSubmit,
    validationSchema: mySchema,
  });
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-75 p-5 mx-auto">
        <h2 className="fw-bold mb-3">Login :</h2>
        <div className="title-bar__products mt-1"></div>
        <form onSubmit={myFormik.handleSubmit}>
          <div className="row gy-3">
            <div className="col-12">
              <div>
                <label htmlFor="email">Email</label>
                <input
                  onBlur={myFormik.handleBlur}
                  onChange={myFormik.handleChange}
                  value={myFormik.values.email}
                  className={`form-control ${
                    myFormik.errors.email && myFormik.touched.email
                      ? "is-invalid"
                      : ""
                  }`}
                  type="email"
                  id="email"
                />
                {myFormik.errors.email && myFormik.touched.email ? (
                  <div className="alert alert-danger my-2 p-1">
                    {myFormik.errors.email}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-12">
              <div>
                <label htmlFor="password">Password</label>
                <input
                  onBlur={myFormik.handleBlur}
                  onChange={myFormik.handleChange}
                  value={myFormik.values.password}
                  className={`form-control mb-3 ${
                    myFormik.errors.password && myFormik.touched.password
                      ? "is-invalid"
                      : ""
                  }`}
                  type="password"
                  id="password"
                />
                {myFormik.errors.password && myFormik.touched.password ? (
                  <div className="alert alert-danger my-2 p-1">
                    {myFormik.errors.password}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <Link className="f-pass fw-bold mb-2" to={"/ForgotPass"}>
            Forgot Password?
          </Link>{" "}
          <br />
          <button
            disabled={!(myFormik.dirty && myFormik.isValid)}
            type="submit"
            className="btn bg-main rounded-3 text-white mt-3 d-block me-auto"
          >
            {Loading ? (
              <i className="fa-solid fa-spin fa-spinner text-white"></i>
            ) : (
              "Login"
            )}
          </button>
          {isFalse ? (
            <div className="alert alert-danger text-center my-1 p-1">
              {errApiMsg}
            </div>
          ) : (
            ""
          )}
          {isSuccess ? (
            <div className="alert alert-success my-1 p-1 text-center">
              Welcome Back, Redirecting....
            </div>
          ) : (
            ""
          )}
        </form>
        <div className="d-flex justify-content-between align-content-center mt-2 mx-auto text-center">
          <span
            className="bg-dark w-25 ms-auto align-self-center"
            style={{ height: "2px" }}
          ></span>
          <Link
            className="f-pass fw-bold text-center align-self-center px-2"
            to={"/Register"}
          >
            <span className="text-nowrap">Don't have an Account, </span>
            <span className="text-nowrap">Sign Up?</span>
          </Link>
          <span
            className="bg-dark w-25 me-auto align-self-center "
            style={{ height: "2px" }}
          ></span>
        </div>
      </div>
    </>
  );
}
