import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { wishListContext } from "../Context/WishListContext";
import Loader from "../Loader/Loader";

export default function CatDetails() {
  const { oneCat } = useContext(wishListContext);
  if (!oneCat) {
    return <Loader />;
  }
  return (
    <>
      <Helmet>
        <title>{oneCat.name}</title>
      </Helmet>
      <div className="container pt-4">
        <div className="py-5"></div>
        <div className="pt-5 rounded-3 shadow-lg position-relative">
          <div className="position-absolute top-0 end-0 bg-main p-1">
            {oneCat.name}
          </div>
          <div className="row align-items-center">
            <div className="col-md-4">
              <div className="p-3">
                <img
                  className="w-100 rounded-3 text-center"
                  src={oneCat.image}
                  alt={oneCat.slug}
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="p-3">
                <h4 className="fw-bold">{oneCat.name}</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                  mollitia quasi blanditiis saepe atque expedita laboriosam!
                  Minus officiis excepturi, illo animi amet reprehenderit nam
                  quidem blanditiis sit qui a porro!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
