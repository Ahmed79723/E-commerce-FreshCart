import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import * as yup from "yup";
import { toast } from "react-toastify";

export default function ResetPass() {
  const [isUpdated, setIsUpdated] = useState(false);

  async function ResetPass(email, newPassword) {
    setIsUpdated(true);
    await axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
        email,
        newPassword,
      })
      .then((res) => {
        console.log("from reset", res);
        if (res.data.token) {
          toast.success("Password updated successfully!");
          setTimeout(() => {
            window.location = "http://localhost:3000/#/Login";
          }, 1000);
          setIsUpdated(false);
        }
      })
      .catch((err) => {
        console.log("from reset err", err);
        toast.error("An Error Ocurred!");
        setIsUpdated(false);
      });
  }

  function onSubmit(values) {
    ResetPass(values.email, values.newPassword);
    console.log("from update", values);
  }
  const userData = {
    email: "",
    newPassword: "",
  };
  const ForgotPASS = yup.object({
    email: yup.string().email("Invalid Email").required("Email is Required"),
    newPassword: yup
      .string()
      .min(6, "password should be at least 6 characters long")
      .required("Required"),
  });
  const Forgot = useFormik({
    initialValues: userData,
    onSubmit,
    validationSchema: ForgotPASS,
  });
  return (
    <>
      <>
        <Helmet>
          <title>Update Password</title>
        </Helmet>
        <div className="w-75 p-5 m-auto">
          <h2 className="pt-5">Reset a New Password:</h2>
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
              <div className="col-12">
                <div>
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    name="newPassword"
                    onBlur={Forgot.handleBlur}
                    onChange={Forgot.handleChange}
                    value={Forgot.values.newPassword}
                    className="form-control"
                    type="text"
                    id="newPassword"
                  />
                  {Forgot.errors.newPassword && Forgot.touched.newPassword ? (
                    <div className="alert alert-danger my-2 p-1">
                      {Forgot.errors.newPassword}
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
                {isUpdated ? (
                  <i className="fa-solid fa-spin fa-spinner text-white"></i>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
            {isUpdated ? (
              <div className="alert alert-success my-1 p-1 text-center">
                Password Updated Successfully ,Redirecting....
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
