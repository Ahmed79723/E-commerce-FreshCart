import React, { useContext, useState } from "react";
import { authContext } from "../Context/AuthContextProvider";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function Profile() {
  const [updateData, setUpdateData] = useState(false);
  const [updatePass, setUpdatePass] = useState(false);
  const { userInfo } = useContext(authContext);
  console.log(userInfo);
  // ^----------------------------------------------------------------------------------------------------
  function updateUserData(name, email, phone) {
    setUpdateData(true);
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
        { name, email, phone },
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      )
      .then((res) => {
        console.log("1", res);
        if (res.data.message == "success") {
          toast.success("Info Updated Successfully!");
          setUpdateData(false);
        }
      })
      .catch((err) => {
        console.log("updateUserData", err);
        toast.error(err.response.data.errors.msg);
        setUpdateData(false);
      });
  }

  function onSubmit(values) {
    console.log("1", values);
    updateUserData(values.name, values.email, values.phone);
  }

  const userData = {
    name: "",
    email: "",
    phone: "",
  };
  const mySchema = yup.object({
    name: yup
      .string()
      .min(3, "must be > three letters")
      .max(12, "must be < 12 letters")
      .required("name is required"),
    email: yup.string().email("Invalid Email").required("Email is Required"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "enter Valid Egyptian Number")
      .required("Required"),
  });
  const myFormik = useFormik({
    initialValues: userData,
    onSubmit,
    validationSchema: mySchema,
  });
  // ^-----------------------------------------------form1-----------------------------------------------------
  function changePass(currentPassword, password, rePassword) {
    setUpdatePass(true);
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
        { currentPassword, password, rePassword },
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      )
      .then((res) => {
        console.log("2", res);
        if (res.data.message == "success") {
          toast.success("Password Updated Successfully!");
          setUpdatePass(false);
          setTimeout(() => {
            window.location = "http://localhost:3000/#/Login";
          }, 1000);
        }
      })
      .catch((err) => {
        console.log("updateUserData", err);
        toast.error(err.response.data.message);
        setUpdatePass(false);
      });
  }

  function onSubmit1(values) {
    console.log("2", values);
    changePass(values.currentPassword, values.password, values.rePassword);
  }

  const userData1 = {
    currentPassword: "",
    password: "",
    rePassword: "",
  };
  const mySchema1 = yup.object({
    currentPassword: yup
      .string()
      .min(6, "password should be at least 6 characters long")
      .required("Required"),
    password: yup
      .string()
      .min(6, "password should be at least 6 characters long")
      .required("Required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password", "passwords does not match")])
      .required("Required"),
  });
  const myFormik1 = useFormik({
    initialValues: userData1,
    onSubmit: onSubmit1,
    validationSchema: mySchema1,
  });

  if (!userInfo) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>My Profile</title>
      </Helmet>
      <div className="container pt-4">
        <div className="CART mt-5 bg-main-light py-1 px-3 rounded-3 overflow-hidden">
          <h2 className="mt-5 fw-bold">My Profile:</h2>
          <div className="d-flex px-5">
            <ul className="list-unstyled border-black w-100">
              <li className="py-3 border-bottom">
                <p className="text-black">Name: {userInfo.name}</p>
              </li>
              <li className="py-3 border-bottom">
                <p className="text-black">ID: {userInfo.id}</p>
              </li>
            </ul>
          </div>
          {/* *------------------------------------------------------------------------------------------- */}
          <div>
            <h3 className="text-main fw-bold h2">Edit Your Data:</h3>
            {/* *------------------------------------------------------------------------------------------- */}
            <div className="forms px-5 py-3 row gy-3">
              <div className="col-md-6">
                <form onSubmit={myFormik.handleSubmit} action="">
                  <div className="row gy-3">
                    <div className="col-12">
                      <div>
                        <label htmlFor="name">Name</label>
                        <input
                          onBlur={myFormik.handleBlur}
                          onChange={myFormik.handleChange}
                          value={myFormik.values.name}
                          className={`form-control ${
                            myFormik.errors.name && myFormik.touched.name
                              ? "is-invalid"
                              : ""
                          }`}
                          type="text"
                          id="name"
                        />
                        {myFormik.errors.name && myFormik.touched.name ? (
                          <div className="alert alert-danger my-2 p-1">
                            {myFormik.errors.name}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
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
                        <label htmlFor="phone">Phone</label>
                        <input
                          onBlur={myFormik.handleBlur}
                          onChange={myFormik.handleChange}
                          value={myFormik.values.phone}
                          className={`form-control ${
                            myFormik.errors.phone && myFormik.touched.phone
                              ? "is-invalid"
                              : ""
                          }`}
                          type="text"
                          id="phone"
                        />
                        {myFormik.errors.phone && myFormik.touched.phone ? (
                          <div className="alert alert-danger my-2 p-1">
                            {myFormik.errors.phone}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    disabled={!(myFormik.dirty && myFormik.isValid)}
                    type="submit"
                    className="btn bg-info rounded-3 text-white mt-3 d-block me-auto"
                  >
                    {updateData ? (
                      <i className="fa-solid fa-spin fa-spinner text-white"></i>
                    ) : (
                      "Update Your Info"
                    )}
                  </button>
                  {/* {isFalse ? (
                    <div className="alert alert-danger text-center my-1 p-1">
                      {errApiMsg}
                    </div>
                  ) : (
                    ""
                  )}
                  {isSuccess ? (
                    <div className="alert alert-success my-1 p-1 text-center">
                      Account Created Successfully!
                    </div>
                  ) : (
                    ""
                  )} */}
                </form>
              </div>
              {/* *--------------------------------------------from1----------------------------------------------- */}
              <div className="col-md-6">
                <form onSubmit={myFormik1.handleSubmit} action="">
                  <div className="row gy-3">
                    <div className="col-12">
                      <div>
                        <label htmlFor="currentPassword">
                          Current Password
                        </label>
                        <input
                          onBlur={myFormik1.handleBlur}
                          onChange={myFormik1.handleChange}
                          value={myFormik1.values.currentPassword}
                          className={`form-control ${
                            myFormik1.errors.currentPassword &&
                            myFormik1.touched.currentPassword
                              ? "is-invalid"
                              : ""
                          }`}
                          type="currentPassword"
                          id="currentPassword"
                        />
                        {myFormik1.errors.currentPassword &&
                        myFormik1.touched.currentPassword ? (
                          <div className="alert alert-danger my-2 p-1">
                            {myFormik1.errors.currentPassword}
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
                          onBlur={myFormik1.handleBlur}
                          onChange={myFormik1.handleChange}
                          value={myFormik1.values.password}
                          className={`form-control ${
                            myFormik1.errors.password &&
                            myFormik1.touched.password
                              ? "is-invalid"
                              : ""
                          }`}
                          type="password"
                          id="password"
                        />
                        {myFormik1.errors.password &&
                        myFormik1.touched.password ? (
                          <div className="alert alert-danger my-2 p-1">
                            {myFormik1.errors.password}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div>
                        <label htmlFor="rePassword">Repeat Password</label>
                        <input
                          onBlur={myFormik1.handleBlur}
                          onChange={myFormik1.handleChange}
                          value={myFormik1.values.rePassword}
                          className={`form-control ${
                            myFormik1.errors.rePassword &&
                            myFormik1.touched.rePassword
                              ? "is-invalid"
                              : ""
                          }`}
                          type="Password"
                          id="rePassword"
                        />
                        {myFormik1.errors.rePassword &&
                        myFormik1.touched.rePassword ? (
                          <div className="alert alert-danger my-2 p-1">
                            {myFormik1.errors.rePassword}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    disabled={!(myFormik1.dirty && myFormik1.isValid)}
                    type="submit"
                    className="btn bg-info rounded-3 text-white mt-3 d-block me-auto"
                  >
                    {updatePass ? (
                      <i className="fa-solid fa-spin fa-spinner text-white"></i>
                    ) : (
                      "Update Password"
                    )}
                  </button>
                  {/* {isFalse ? (
                    <div className="alert alert-danger text-center my-1 p-1">
                      {errApiMsg}
                    </div>
                  ) : (
                    ""
                  )}
                  {isSuccess ? (
                    <div className="alert alert-success my-1 p-1 text-center">
                      Password Updated Successfully!
                    </div>
                  ) : (
                    ""
                  )} */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
