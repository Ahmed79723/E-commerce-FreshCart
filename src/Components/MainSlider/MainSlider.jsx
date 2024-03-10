import React from "react";
import Slider from "react-slick";
import slide1 from "../../finalProject assets/images/images/slider-image-2.jpeg";
import slide2 from "../../finalProject assets/images/images/banner20.jpg";
import slide3 from "../../finalProject assets/images/slider-image-3.jpeg";
import "./MainSlider.css"

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    arrows:false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="w-100 px-0">
        <div className="py-4"></div>
        <Slider {...settings}>
          <img height={330} src={slide1} alt="" />
          <img height={330} src={slide2} alt="" />
          <img height={330} src={slide3} alt="" />
        </Slider>
      </div>
    </>
  );
}
