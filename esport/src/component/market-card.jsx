import React from "react";
import Dropdown from "./dropdown";

function Marketplace() {
  return (
    <>
      <div className="mt-28 mb-10 ml-16 grid  grid-cols-3 xsss:hidden lg:grid   lg:grid-cols-3 xl:grid-cols-3 xl:w-[56%]  ">
        <div class="relative  w-[94%]">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="p-4 pl-10 text-sm  rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-feild dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:font-poppins dark:text-head-line "
            placeholder="Search games"
            required
          />
        </div>

        <Dropdown />
        <div>
          <button
            id="dropdownInformationButton"
            data-dropdown-toggle="dropdownInformation"
            class="text-black w-2/3 justify-center   bg-green hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-4 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Find
          </button>
        </div>
      </div>
    </>
  );
}

export default Marketplace;
