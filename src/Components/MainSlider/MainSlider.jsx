import React from "react";
import Slider from "react-slick";
import slide1 from "../../finalProject assets/images/en_dk_uae-hero-01-hp.1707484022.7463012.avif";
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  return (
    <>
      <div className="mt-5">
        <Slider {...settings}>
          <img src={slide1} alt="" />
          <img src={slide1} alt="" />
          <img src={slide1} alt="" />
        </Slider>
      </div>
    </>
  );
}
