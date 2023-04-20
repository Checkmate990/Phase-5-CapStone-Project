import Chess from "../../asset/chess.jpg";
import Chess2 from "../../asset/chess2.jpg";
import Chess3 from "../../asset/chess3.jpg";
import Chess4 from "../../asset/chess4.jpg";
import React, { Component } from "react";
import Slider from "react-slick";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}

export default class GameSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },

        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
      ],
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <div className="relative">
              <img className="h-[80vh] w-full" src={Chess} />

              {/* <div className="absolute top-4 xss:top-4 sm:top-10 left-10">
                <h3 className="font-poppins text-white xl:text-heading-two lg:text-heading-seven text-heading-four sm:text-heading-three font-semibold">
                  Games
                </h3>

                <div className="xss:mt-6 sm:mt-28 lg:mt-28 xl:mt-64">
                  <h3 className="font-poppins text-white xl:text-heading-two lg:text-heading-seven text-heading-four sm:text-heading-three font-semibold">
                    The Division 2
                  </h3>
                  <p className=" w-4/5 lg:w-1/2 font-poppins text-white text-head-s sm:text-head-line md:text-heading-line font-normal ">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit. Exercitation veniam consequat sunt nostrud amet.
                  </p>
                </div>
              </div> */}
            </div>
          </div>

          <div>
            <div className="relative">
              <img className="h-[700px] w-full" src={Chess2} />

              {/* <div className="absolute top-4 xss:top-4 sm:top-10 left-10">
                <h3 className="font-poppins text-white xl:text-heading-two lg:text-heading-seven text-heading-four sm:text-heading-three font-semibold">
                  Games
                </h3>

                <div className="xss:mt-6 sm:mt-28 lg:mt-28 xl:mt-64">
                  <h3 className="font-poppins text-white xl:text-heading-two lg:text-heading-seven text-heading-four sm:text-heading-three font-semibold">
                    The Division 2
                  </h3>
                  <p className=" w-4/5 lg:w-1/2 font-poppins text-white text-head-s sm:text-head-line md:text-heading-line font-normal ">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit. Exercitation veniam consequat sunt nostrud amet.
                  </p>
                </div>
              </div> */}
            </div>
          </div>

          <div>
            <div className="relative">
              <img className="h-[700px] w-full" src={Chess3} />

              {/* <div className="absolute top-4 xss:top-4 sm:top-10 left-10">
                <h3 className="font-poppins text-white xl:text-heading-two lg:text-heading-seven text-heading-four sm:text-heading-three font-semibold">
                  Games
                </h3>

                <div className="xss:mt-6 sm:mt-28 lg:mt-28 xl:mt-64">
                  <h3 className="font-poppins text-white xl:text-heading-two lg:text-heading-seven text-heading-four sm:text-heading-three font-semibold">
                    The Division 2
                  </h3>
                  <p className=" w-4/5 lg:w-1/2 font-poppins text-white text-head-s sm:text-head-line md:text-heading-line font-normal ">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit. Exercitation veniam consequat sunt nostrud amet.
                  </p>
                </div>
              </div> */}
            </div>
          </div>

          <div>
            <div className="relative">
              <img className="h-[700px] w-full" src={Chess4} />

              {/* <div className="absolute top-4 xss:top-4 sm:top-10 left-10">
                <h3 className="font-poppins text-white xl:text-heading-two lg:text-heading-seven text-heading-four sm:text-heading-three font-semibold">
                  Games
                </h3>

                <div className="xss:mt-6 sm:mt-28 lg:mt-28 xl:mt-64">
                  <h3 className="font-poppins text-white xl:text-heading-two lg:text-heading-seven text-heading-four sm:text-heading-three font-semibold">
                    The Division 2
                  </h3>
                  <p className=" w-4/5 lg:w-1/2 font-poppins text-white text-head-s sm:text-head-line md:text-heading-line font-normal ">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit. Exercitation veniam consequat sunt nostrud amet.
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
