import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import * as yup from "yup";
import { toast } from "react-toastify";

export default function ResetCode() {
  const [isSuccess, setIsSuccess] = useState(false);

  async function ResetCode(resetCode) {
    setIsSuccess(true)
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        resetCode,
      })
      .then(function (response) {
        console.log(response);
        toast.success(response.data.message);
        setIsSuccess(false);
        setTimeout(() => {
          window.location = "http://localhost:3000/#/ResetPass";
        }, 1000);
      })
      .catch(function (err) {
        console.log(err);
        toast.error(err.response.data.message);
        setIsSuccess(false);
      });
  }

  function onSubmit(values) {
    ResetCode(values.code);
    console.log("from code", values);
  }
  const userCode = {
    code: "",
  };
  const ForgotPASS = yup.object({
    code: yup
      .string()
      .matches(/^[0-9]{6}$/, "Reset Code InValid")
      .required("Required"),
  });
  const Forgot = useFormik({
    initialValues: userCode,
    onSubmit,
    validationSchema: ForgotPASS,
  });
  return (
    <>
      <>
        <Helmet>
          <title>Reset Code Password</title>
        </Helmet>
        <div className="w-75 p-5 m-auto">
          <h2 className="pt-5">Type the Code sent To Your Email Below:</h2>
          <form onSubmit={Forgot.handleSubmit}>
            <div className="row gy-3">
              <div className="col-12">
                <div>
                  <label htmlFor="code">Code</label>
                  <input
                    name="code"
                    onBlur={Forgot.handleBlur}
                    onChange={Forgot.handleChange}
                    value={Forgot.values.code}
                    className="form-control "
                    type="text"
                    id="code"
                  />
                  {Forgot.errors.code && Forgot.touched.code ? (
                    <div className="alert alert-danger my-2 p-1">
                      {Forgot.errors.code}
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
                className="btn bg-success rounded-3 text-white mt-3 d-block"
              >
                {isSuccess ? (
                  <i className="fa-solid fa-spin fa-spinner text-white"></i>
                ) : (
                  "Verify"
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
