import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Notfound from "./Components/Notfound/Notfound";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Brands from "./Components/Brands/Brands";
import Products from "./Components/Products/Products";
import WhishList from "./Components/WhishList/WhishList";
import Cart from "./Components/Cart/Cart";
import AuthLayout from "./Components/AuthLayout/AuthLayout";
import { Offline } from "react-detect-offline";
import AuthContextProvider from "./Components/Context/AuthContextProvider";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProDetails from "./Components/ProDetails/ProDetails";
import CartContextProvider from "./Components/Context/CartContextProvider";
import { ToastContainer } from "react-toastify";
import Address from "./Components/Address/Address";
import AllOrders from "./Components/AllOrders/AllOrders";
import Profile from "./Components/Profile/Profile";
import WishListContextProvider from "./Components/Context/WishListContext";
import ForgotPass from "./Components/ForgetPass/ForgotPass";
import ResetCode from "./Components/ResetCode/ResetCode";
import ResetPass from "./Components/ResetPass/ResetPass";
import ECategories from "./Components/ECategories/ECategories";
const myRouting = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/Home", element: <Home /> },
      { path: "/Products", element: <Products /> },
      { path: "/ProDetails/:id", element: <ProDetails /> },
      { path: "/Categories", element: <ECategories /> },
      { path: "/Brands", element: <Brands /> },
      {
        path: "/Cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/WhishList",
        element: (
          <ProtectedRoute>
            <WhishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/AllOrders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Address/:id",
        element: (
          <ProtectedRoute>
            <Address />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Register /> },
      { path: "/Register", element: <Register /> },
      { path: "/Login", element: <Login /> },
      { path: "/ForgotPass", element: <ForgotPass /> },
      { path: "/ResetCode", element: <ResetCode /> },
      { path: "/ResetPass", element: <ResetPass /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <ToastContainer theme="colored" autoClose="1000" />
      <AuthContextProvider>
        <WishListContextProvider>
          <CartContextProvider>
            <RouterProvider router={myRouting} />
          </CartContextProvider>
        </WishListContextProvider>
      </AuthContextProvider>
      <Offline>
        <div className="offline text-center text-white">
          You are Offline!, Please Check Your Internet Connection.
        </div>
      </Offline>
    </>
  );
}
