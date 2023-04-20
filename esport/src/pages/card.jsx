import React from "react";
import Navbar from "../component/navbar";
import Images from "../asset/images.jpg";
import Download from "../asset/download.jpg";
import Gta from "../asset/gta.jpg";
import Footer from "../component/footer";

function Card({setOpen, open }) {
  return (
    <React.Fragment>
      <Navbar setOpen={setOpen} open={open} />
      <div class="container mx-auto my-20">
        <div class="flex shadow-md my-10 gap-5">
          <div class="w-3/4 border-2 border-blue px-10 py-10 rounded-lg">
            <div class="flex justify-between border-b pb-8">
              <h1 class="font-semibold font-mono text-blue text-2xl">
                Shopping Cart
              </h1>
              <h2 class="font-semibold text-2xl font-mono text-blue">
                3 Items
              </h2>
            </div>
            <div class="flex mt-10 mb-5">
              <h3 class="font-semibold  text-xs uppercase w-2/5 font-mono text-white">
                Product Details
              </h3>
              <h3 class="font-semibold text-center font-mono text-white text-xs uppercase w-1/5 ">
                Quantity
              </h3>
              <h3 class="font-semibold text-center font-mono text-white text-xs uppercase w-1/5 ">
                Price
              </h3>
              <h3 class="font-semibold text-center font-mono text-white text-xs uppercase w-1/5 ">
                Total
              </h3>
            </div>
            <div class="flex items-center cursor-pointer -mx-8 px-6 py-5">
              <div class="flex w-2/5">
                <div class="w-20">
                  <img class="h-24" src={Images} alt="" />
                </div>
                <div class="flex flex-col justify-between ml-4 flex-grow">
                  <span class="font-bold text-sm font-mono text-white">
                    Call of Duty
                  </span>
                  <span class="text-red-500 text-xs ">Limited edition</span>
                  <a
                    href="#"
                    class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                  >
                    Remove
                  </a>
                </div>
              </div>
              <div class="flex justify-center w-1/5">
                <svg
                  class="fill-current text-gray-600 w-3"
                  viewBox="0 0 448 512"
                >
                  <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>

                <input
                  class="mx-2 border text-center w-8"
                  type="text"
                  value="1"
                />

                <svg
                  class="fill-current text-gray-600 w-3"
                  viewBox="0 0 448 512"
                >
                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
              </div>
              <span class="text-center w-1/5 font-semibold font-mono text-white text-sm">
                $400.00
              </span>
              <span class="text-center w-1/5 font-semibold font-mono text-white text-sm">
                $400.00
              </span>
            </div>

            <div class="flex items-center cursor-pointer -mx-8 px-6 py-5">
              <div class="flex w-2/5">
                <div class="w-20">
                  <img class="h-24 w-24" src={Download} alt="" />
                </div>
                <div class="flex flex-col justify-between ml-4 flex-grow">
                  <span class="font-bold text-sm font-mono text-white">
                    God of War
                  </span>
                  <span class="text-red-500 text-xs">Limited edition</span>
                  <a
                    href="#"
                    class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                  >
                    Remove
                  </a>
                </div>
              </div>
              <div class="flex justify-center w-1/5">
                <svg
                  class="fill-current text-gray-600 w-3"
                  viewBox="0 0 448 512"
                >
                  <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>

                <input
                  class="mx-2 border text-center w-8"
                  type="text"
                  value="1"
                />

                <svg
                  class="fill-current text-gray-600 w-3"
                  viewBox="0 0 448 512"
                >
                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
              </div>
              <span class="text-center w-1/5 font-semibold text-sm font-mono text-white">
                $40.00
              </span>
              <span class="text-center w-1/5 font-semibold text-sm font-mono text-white">
                $40.00
              </span>
            </div>

            <div class="flex items-center cursor-pointer  -mx-8 px-6 py-5">
              <div class="flex w-2/5">
                <div class="w-20">
                  <img class="h-24" src={Gta} alt="" />
                </div>
                <div class="flex flex-col justify-between ml-4 flex-grow">
                  <span class="font-bold text-sm font-mono text-white">
                    GTA V
                  </span>
                  <span class="text-red-500 text-xs">Sold Out</span>
                  <a
                    href="#"
                    class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                  >
                    Remove
                  </a>
                </div>
              </div>
              <div class="flex justify-center w-1/5">
                <svg
                  class="fill-current text-gray-600 w-3"
                  viewBox="0 0 448 512"
                >
                  <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
                <input
                  class="mx-2 border text-center w-8"
                  type="text"
                  value="1"
                />

                <svg
                  class="fill-current text-gray-600 w-3"
                  viewBox="0 0 448 512"
                >
                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
              </div>
              <span class="text-center w-1/5 font-semibold text-sm font-mono text-white">
                $150.00
              </span>
              <span class="text-center w-1/5 font-semibold text-sm font-mono text-white">
                $150.00
              </span>
            </div>
          </div>

          <div
            id="summary"
            class="w-1/4 px-8 py-10 border-2 border-blue rounded-lg"
          >
            <h1 class="font-semibold text-2xl border-b pb-8 font-mono text-blue">
              Order Summary
            </h1>
            <div class="flex justify-between mt-10 mb-5">
              <span class="font-semibold text-sm uppercase font-mono text-white">
                Items 3
              </span>
              <span class="font-semibold text-sm font-mono text-white">
                590$
              </span>
            </div>
            <div>
              <label class="font-medium inline-block mb-3 text-sm uppercase font-mono text-white">
                Shipping
              </label>
              <select class="block p-2 text-white w-full text-sm bg-transparent border-[1px] border-white">
                <option>Standard shipping - $10.00</option>
              </select>
            </div>
            <div class="py-10">
              <label
                for="promo"
                class="font-semibold inline-block mb-3 text-sm uppercase font-mono text-white"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                class="p-2 text-sm w-full bg-transparent border-[1px] border-white"
              />
            </div>
            <button class="bg-gradient-to-r from-blue to-dark rounded-md font-semibold px-5 py-2 text-sm text-white uppercase">
              Apply
            </button>
            <div class="border-t mt-8">
              <div class="flex font-semibold justify-between py-6 text-sm uppercase font-mono text-white">
                <span>Total cost</span>
                <span>$600</span>
              </div>
              <button class="bg-gradient-to-r from-blue to-dark rounded-md font-semibold py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Card;
