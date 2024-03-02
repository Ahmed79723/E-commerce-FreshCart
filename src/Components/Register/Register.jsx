import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register() {
  // const [NameInput, setNameInput] = useState("");
  // let handleNameChange = (NameInput) => {
  //   setNameInput(NameInput);
  // };
  const [isSuccess, setisSuccess] = useState(false);
  const [isFalse, setisFalse] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [errApiMsg, seterrApiMsg] = useState(undefined);

  let navigate = useNavigate();
  async function sendData(user) {
    setLoading(true);
    const res = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", user)
      .then((x) => {
        if (x.data.message == "success") {
          console.log(x.data);
          setisSuccess(true);
          setisFalse(false);
          setLoading(false);
          setTimeout(function () {
            navigate("/login");
          }, 2000);
          // navigate('/Login')
        }
      })
      .catch((err) => {
        console.log(err);
        setisFalse(true);
        setisSuccess(false);
        setLoading(false);
        seterrApiMsg(err.response.data.message);
      });
  }

  function onSubmit(values) {
    console.log(values);
    sendData(values);
  }
  const userData = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
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
    password: yup
      .string()
      .min(6, "password should be at least 6 characters long")
      .required("Required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password", "passwords does not match")])
      .required("Required"),
  });
  const myFormik = useFormik({
    initialValues: userData,
    onSubmit,
    validationSchema: mySchema,
    // validate: function (values) {
    //   const errors = {};
    //   const nameRegex = /^[A-Z][a-z]{2,7}$/;
    //   if (!nameRegex.test(values.name)) {
    //     errors.name =
    //       "Invalid Name ,name must contains 3-8 letters & start with Capital Letter ";
    //   }
    //   if (!values.email.includes("@") || !values.email.includes(".com")) {
    //     errors.email = "Invalid Email";
    //   }
    //   const phoneRegex = /^01[0125][0-9]{8}$/;
    //   if (!phoneRegex.test(values.phone)) {
    //     errors.phone = "Invalid Phone Number";
    //   }
    //   if (values.password.length < 6 || values.password.length > 12) {
    //     errors.password = "Password should be between 6 and 12 characters";
    //   }
    //   if (values.password !== values.rePassword || values.password == "") {
    //     errors.rePassword = "Passwords don't match";
    //   }
    //   console.log(errors);
    //   return errors;
    // },
  });
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="w-75 p-5 m-auto">
        <h2>Register :</h2>
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
            <div className="col-12">
              <div>
                <label htmlFor="password">Password</label>
                <input
                  onBlur={myFormik.handleBlur}
                  onChange={myFormik.handleChange}
                  value={myFormik.values.password}
                  className={`form-control ${
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
            <div className="col-12">
              <div>
                <label htmlFor="rePassword">Repeat Password</label>
                <input
                  onBlur={myFormik.handleBlur}
                  onChange={myFormik.handleChange}
                  value={myFormik.values.rePassword}
                  className={`form-control ${
                    myFormik.errors.rePassword && myFormik.touched.rePassword
                      ? "is-invalid"
                      : ""
                  }`}
                  type="Password"
                  id="rePassword"
                />
                {myFormik.errors.rePassword && myFormik.touched.rePassword ? (
                  <div className="alert alert-danger my-2 p-1">
                    {myFormik.errors.rePassword}
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
            className="btn bg-main rounded-3 text-white mt-3 d-block me-auto"
          >
            {Loading ? (
              <i className="fa-solid fa-spin fa-spinner text-white"></i>
            ) : (
              "Register"
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
              Account Created Successfully!
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
}
