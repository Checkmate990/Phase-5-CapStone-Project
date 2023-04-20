import React from "react";
import Esports from "../asset/esports-cards.svg";
import RightBanner from "../asset/banner_right 1.svg";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    overlay: "Overlays",
    card_img: Esports,
    price: "$30.0",
    para: "Amet minim mollit non deserunt ullamco est sit ",
  },
  {
    overlay: "Overlays",
    card_img: Esports,
    price: "$30.0",
    para: "Amet minim mollit non deserunt ullamco est sit ",
  },
  {
    overlay: "Overlays",
    card_img: Esports,
    price: "$30.0",
    para: "Amet minim mollit non deserunt ullamco est sit ",
  },
  {
    overlay: "Overlays",
    card_img: Esports,
    price: "$30.0",
    para: "Amet minim mollit non deserunt ullamco est sit ",
  },
  {
    overlay: "Overlays",
    card_img: Esports,
    price: "$30.0",
    para: "Amet minim mollit non deserunt ullamco est sit ",
  },
  {
    overlay: "Overlays",
    card_img: Esports,
    price: "$30.0",
    para: "Amet minim mollit non deserunt ullamco est sit ",
  },
  {
    overlay: "Overlays",
    card_img: Esports,
    price: "$30.0",
    para: "Amet minim mollit non deserunt ullamco est sit ",
  },
  {
    overlay: "Overlays",
    card_img: Esports,
    price: "$30.0",
    para: "Amet minim mollit non deserunt ullamco est sit ",
  },
];

function Card({tourmamentList}) {
  let navigate = useNavigate();
  const handleNavigate = (link) => {
    navigate(link);
  };
  console.log("tourmamentList",tourmamentList)
  return (
    <>
      <div className=" grid grid-cols-1  mt-20">
        <div className="ml-5 md:ml-10 lg:ml-20">
          <h3 className="  font-poppins text-white lg:text-heading-seven md:text-heading-seven text-heading-three font-semibold">
            Explore <span className="text-green font-normal"> Upcoming Tournaments</span>
          </h3>
        </div>
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-[87%]  ml-5 md:ml-10 lg:ml-20 my-20">
        {tourmamentList.length>0?
        tourmamentList?.map((item) => (
          <div className="bg-primary p-2 rounded-xl cursor-pointer">
            <img src={item?.image_url} />
            <div className="flex justify-between align-items-center pt-2 px-2">
              <p className="text-heading-four font-poppins font-bold text-white">
                {item?.name}
              </p>
              <p className="text-lg font-poppins font-bold text-white mt-1" >
                {item?.start_date.slice(0,10)}
              </p>
            </div>
            <div className="flex justify-between w-[90%] mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-blue hover:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>

              <svg
                onClick={() => handleNavigate(`/list/${item?.id}`)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-blue hover:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
          </div>
        )):<p className="text-white">No Tournament</p>}
        {}
      </div>

      <div className="flex justify-center  xsss:hidden md:flex pb-20">
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <a
            href="#"
            aria-current="page"
            style={{ marginRight: "10px" }}
            className="px-5 py-2 bg-feild text-white border border-feild hover:border-white font-poppins "
          >
            1
          </a>

          <a
            href="#"
            aria-current="page"
            style={{ marginRight: "10px" }}
            className="px-5 py-2 bg-feild text-white border border-feild hover:border-white font-poppins "
          >
            2
          </a>

          <a
            href="#"
            aria-current="page"
            className="px-5 py-2 bg-feild text-white border border-feild hover:border-white font-poppins "
          >
            3
          </a>

          <span class="relative inline-flex items-center px-6 py-2   font-semibold text-feild text-heading-one h-0 -mt-4">
            .....
          </span>
          <a
            href="#"
            aria-current="page"
            style={{ marginRight: "10px" }}
            className="px-5 py-2 bg-feild text-white border border-feild hover:border-white  font-poppins mr-2"
          >
            533
          </a>
          <a
            href="#"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 bg-feild  text-white  border border-feild hover:border-white "
          >
            <span class="sr-only">Next</span>
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 bg-bg w-5/6 mx-auto mt-20 lg:mt-40 py-5 px-10 rounded-2xl mb-20">
        <div className="  col-span-2 self-center">
          <h3 className=" font-poppins text-white xxl:text-heading-two xl:text-heading-seven lg:text-heading-three md:text-heading-five text-heading-four font-semibold">
            Contact us to List your tournaments on this website and get more players
          </h3>
          <h3 className="text-head-ing xxl:text-heading-four text-white font-poppins font-medium  w-[100%]  md:w-[400px] xxl:w-[600px] ">
          If you want to be a chess master,
You must work hard and work faster.
If you want to achieve success,
You must go beyond what you guess.

If you want something you've never had,
You must be willing to do something you've never done.
You must train hard and train smart,
And never give up when things get hard.

          </h3>

        
        </div>
        
      </div>
    </>
  );
}

export default Card;
