import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../Context/AuthContextProvider";
import { Helmet } from "react-helmet";

export default function Login() {
  const { setToken, getUserData, userInfo } = useContext(authContext);
  const [isSuccess, setisSuccess] = useState(false);
  const [isFalse, setisFalse] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [errApiMsg, seterrApiMsg] = useState(undefined);
  let navigate = useNavigate();

  async function sendData(user) {
    setLoading(true);
    const res = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", user)
      .then((x) => {
        if (x.data.message == "success") {
          console.log(x.data);
          setisSuccess(true);
          setLoading(false);
          setisFalse(false);
          localStorage.setItem("tkn", x.data.token);
          getUserData();
          setToken(x.data.token);

          setTimeout(function () {
            navigate("/Home");
          }, 2000);
          // navigate("/Home");
        }
      })
      .catch((err) => {
        console.log(err);
        setisFalse(true);
        setLoading(false);
        setisSuccess(false);
        seterrApiMsg(err.response.data.message);
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
    console.log('from login',values);
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
      <div className="w-75 p-5 m-auto">
        <h2>Login :</h2>
        <form onSubmit={myFormik.handleSubmit}>
          <div className="row gy-3">
            <div className="col-12">
              <div>
                <label htmlFor="email">email</label>
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
                <label htmlFor="password">password</label>
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
          <Link className="f-pass fw-bold" to={'/ForgotPass'}>Forgot Password?</Link>
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
              Welcome Back ,Redirecting....
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
}
