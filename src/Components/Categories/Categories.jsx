import React, { useContext } from "react";
import Slider from "react-slick";
import Loader from "../Loader/Loader";
import { wishListContext } from "../Context/WishListContext";
import { Link } from "react-router-dom";

export default function Categories() {
  const { getOneCat, allCats } = useContext(wishListContext);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    // rows: 2
  };
  if (!allCats) return <Loader />;
  return (
    <>
      <div className="container-fluid px-5">
        <div className="pt-5">
          <h2 className="pt-5">Popular Categories :</h2>
          <div className="title-bar__products mt-1"></div>
          <Slider {...settings}>
            {allCats.map((item, index) => {
              return (
                <Link
                  role="button"
                  onClick={() => {
                    getOneCat(item._id);
                  }}
                  to={`/CatDetails/${item._id}`}
                  className="px-1"
                  key={index}
                >
                  <img
                    src={item.image}
                    height={200}
                    className="w-100 rounded-3 shadow-sm"
                    alt=""
                  />
                  <h6 className="text-center fw-bold">{item.name}</h6>
                </Link>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}
