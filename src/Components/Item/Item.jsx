import React, { useContext, useState } from "react";
import { cartContext } from "../Context/CartContextProvider";
import { toast } from "react-toastify";

export default function Item({ product }) {
  const { deleteCartItem, updateQty, getCart } = useContext(cartContext);
  let [Removing, setRemoving] = useState(false);
  async function deleteProduct(id) {
    setRemoving(true);
    let res = await deleteCartItem(id);
    if (res.status === "success") {
      toast.warning("Product deleted successfully");
      setRemoving(false);
      getCart();
    }
  }

  async function updateCartQTY(productId, count) {
    let res = await updateQty(productId, count);
    if (res.status == "success") {
      getCart();
      toast.success("Product Updated successfully");
    } else {
      toast.error("An Error Ocurred");
    }
  }

  return (
    <>
      <div className="row align-items-center py-3 border-bottom">
        <div className="col-md-1">
          <img src={product.product.imageCover} className="w-100" alt="" />
        </div>
        <div className="col-md-11 d-flex justify-content-between">
          <div>
            <h4>{product.product.title.split(" ").splice(0, 2).join(" ")}</h4>
            <p className="text-main m-0">Price: {product.price} EGP</p>
            <button
              disabled={Removing}
              onClick={() => {
                deleteProduct(product.product._id);
              }}
              className="btn px-0 mx-0"
            >
              {Removing ? (
                <i className="fa-solid fa-spin fa-spinner text-main"></i>
              ) : (
                <>
                  <i className="fa-solid text-main fa-trash-can"></i> Remove
                </>
              )}
            </button>
          </div>
          <div>
            <button
              onClick={() =>
                updateCartQTY(product.product._id, product.count + 1)
              }
              className="btn brdr"
            >
              +
            </button>
            <span className="px-2">{product.count}</span>
            <button
              disabled={product.count <= 1}
              onClick={() =>
                updateCartQTY(product.product._id, product.count - 1)
              }
              className="btn brdr"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
