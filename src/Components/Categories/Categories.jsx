import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";

export default function Categories() {
  // const [Categories, setCategories] = useState([]);
  // async function getCategories() {
  //   let { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/categories"
  //   );
  //   setCategories(data.data);
  //   console.log(data.data);
  // }
  // useEffect(() => {
  //   getCategories();
  // }, []);
  async function fetchCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { isLoading, data } = useQuery("categories", fetchCategories);
  // console.log(data);
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
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
    // rows: 2
  };
  if (isLoading) return <Loader />;
  return (
    <>
      <div className="container-fluid px-5">
        <div className="pt-5">
          <h2 className="pt-5">Popular Categories :</h2>
          <Slider {...settings}>
            {data?.data.data.map((item, index) => {
              return (
                <div className="px-1" key={index}>
                  <img src={item.image} height={200} className="w-100" alt="" />
                  <h6 className="fw-bold">{item.name}</h6>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}
