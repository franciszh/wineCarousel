'use client'

import React from "react";
import Slider from "react-slick";

interface CarouselProps {
    children: React.ReactNode
}

const carouselSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1145,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

export const Carousel = (props: CarouselProps) => {
    const { children } = props;
    return (
        <div className="slider-container">
            <Slider {...carouselSettings}>
                {children}
            </Slider>
        </div>
    );
}