import React from "react";
import Logo from "../asset/Logo.png";

function Footer() {
  return (
    <>
      <div className="grid grid-cols-3 md:grid-cols-3  lg:grid-cols-3  xl:grid-cols-4 py-10  lg:pt-20 lg:pb-10 gap-6 px- md:px-0  bg-footer">
      <div className="col-span-1 self-center">
          <img className="mx-auto" src={Logo} style={{ maxWidth: "200px" }} />
      </div>

        <div className="col-span-2 lg:col-span-2  xl:col-span-3 self-center ">
          <p className=" font-poppins text-white  text-head-xss    lg:text-head-ing   xl:text-heading-six font-normal w-full  md:w-5/6 ">
          Please note that this website reserves the right to modify, update or amend the terms and conditions at any time without prior notice. It is your responsibility to periodically review these terms and conditions to ensure that you are aware of any changes.

Thank you for choosing to register and list your tournaments on our website. We look forward to providing you with a smooth and enjoyable experience.
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
