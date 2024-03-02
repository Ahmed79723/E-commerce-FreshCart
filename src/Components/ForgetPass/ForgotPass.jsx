import React, { useState } from "react";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

export default function ForgotPass() {
  const [isSuccess, setIsSuccess] = useState(false);

  async function forgotPassword(email) {
    setIsSuccess(true);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
        email,
      })
      .then(function (response) {
        toast.success(response.data.message);
        setIsSuccess(false);
        setTimeout(() => {
          window.location = "http://localhost:3000/#/ResetCode";
        }, 1000);
      })
      .catch(function (err) {
        toast.error(err.data.message);
        setIsSuccess(false);
      });
  }

  function onSubmit(values) {
    forgotPassword(values.email);
    console.log("from forgot", values);
  }
  const userEmail = {
    email: "",
  };
  const ForgotPASS = yup.object({
    email: yup.string().email("Invalid Email").required("Email is Required"),
  });
  const Forgot = useFormik({
    initialValues: userEmail,
    onSubmit,
    validationSchema: ForgotPASS,
  });
  return (
    <>
      <>
        <Helmet>
          <title>Forgot Password</title>
        </Helmet>
        <div className="w-75 p-5 m-auto">
          <h2 className="pt-5 fw-bold">
            Enter Your Email to receive Reset Code:
          </h2>
          <form onSubmit={Forgot.handleSubmit}>
            <div className="row gy-3">
              <div className="col-12">
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    onBlur={Forgot.handleBlur}
                    onChange={Forgot.handleChange}
                    value={Forgot.values.email}
                    className="form-control "
                    type="text"
                    id="email"
                  />
                  {Forgot.errors.email && Forgot.touched.email ? (
                    <div className="alert alert-danger my-2 p-1">
                      {Forgot.errors.email}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="form-btns my-3 d-flex">
              <button
                disabled={!(Forgot.dirty && Forgot.isValid)}
                type="submit"
                className="btn bg-primary rounded-3 text-white mt-3 d-block"
              >
                {isSuccess ? (
                  <i className="fa-solid fa-spin fa-spinner text-white"></i>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
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
    </>
  );
}
