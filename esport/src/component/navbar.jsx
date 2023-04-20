import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import Logo from "../asset/Logo.svg";
import Logo from "../asset/chess14.png";

import Navicon from "../asset/navicon.svg";
import Navicon2 from "../asset/navicon2.svg";
import Navicon3 from "../asset/navicon3.svg";
import Navicon6 from "../asset/navicon6.svg";
import Navicon8 from "../asset/navicon8.svg";
import Bell from "../asset/bell.svg";
import Example from "./example";
import Login from "./login";
import Headroom from "react-headroom";
import TodoList from "../pages/TodoList";

function Navbar({open,setOpen,BaseUrl}) {
  let navigate = useNavigate();
  const [openDrawer,setOpenDrawer]=useState(false)
  const handleNavigate = (link) => {
    navigate(link);
  };

  const handleOnClose = () => setOpenDrawer(false);
  return (
    <>
      <Headroom>
        <div
          className=" backdrop-blur-sm bg-nav/30  grid grid-cols-2 lg:grid-cols-5  p-4 mx-2 xl:gap-4"
          // style={{
          //   borderBottomLeftRadius: "100px",
          //   borderBottomRightRadius: "100px",
          // }}
        >
          <div className="col-span-1  lg:col-span-1 mx-0 lg:mx-auto self-center cursor-pointer">
            <img src={Logo} onClick={()=>navigate("/")} style={{height:"100px",width:"100px"}}/>
          </div>
          <div className=" col-span-1 lg:col-span-3   justify-around self-center  text-blue font-medium text-head-line   hidden lg:flex">
            <div className="flex ">
              <img src={Navicon}  onClick={()=>navigate("/")}/>
              <p
                onClick={() => handleNavigate("/")}
                className="ml-1 cursor-pointer"
              >
                Home
              </p>
            </div>


            


            

            <div className="flex">
              <img src={Navicon2} onClick={() => navigate("/chess-events")} />
              <p onClick={() => navigate("/chess-events")} className="ml-1 cursor-pointer">
              Learn to Play Chess!
              </p>
            </div>


            <div className="flex">
            <img src={Navicon3} onClick={() => navigate("/chess-to-do-list")} />
            <p onClick={() => navigate("/chess-to-do-list")} className="ml-1 cursor-pointer">
          Your Chess to do list
        </p>
      </div>

          </div>
          <div className="self-center col-span-1 lg:col-span-1 hidden lg:flex justify-end">
            
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />

            <Login setOpen={setOpen} open={open} BaseUrl={BaseUrl}/>
          </div>
          <div className="block lg:hidden visible lg:invisible self-center">
            <svg
              onClick={() => setOpenDrawer(true)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 self-center text-white    ml-auto mr-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>

          <Example open={openDrawer} setOpen={handleOnClose} />
        </div>
      </Headroom>
    </>
  );
}

export default Navbar;
