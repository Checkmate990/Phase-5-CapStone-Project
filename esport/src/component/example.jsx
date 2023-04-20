import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import Logo from "../asset/Logo.svg";
import Navicon from "../asset/navicon.svg";
import Navicon2 from "../asset/navicon2.svg";
import Navicon3 from "../asset/navicon3.svg";
import Navicon4 from "../asset/navicon4.svg";
import Navicon5 from "../asset/navicon5.svg";
import Navicon6 from "../asset/navicon6.svg";
import Navicon7 from "../asset/navicon7.svg";
import Navicon8 from "../asset/navicon8.svg";
import Navicon9 from "../asset/navicon9.svg";
import { Link } from "@mui/material";

export default function Example({ open, setOpen }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-xs pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-nav py-6 shadow-xl">
                    <div class="container grid grid-cols-1 p-3">
                      <img src={Logo} />
                      <Link href="/" className="flex pt-10">
                        <img src={Navicon} />
                        <p className="hover:text-hover font-poppins text-blue  pl-3">
                          Home
                        </p>
                      </Link>

                      <Link href="/features" className="flex pt-10">
                        <img src={Navicon2} />

                        <p className="hover:text-hover font-poppins text-blue pl-3">
                          Features
                        </p>
                      </Link>

                      <Link href="/games" className="flex  pt-10">
                        <img src={Navicon3} />

                        <p className="hover:text-hover font-poppins text-blue pl-3">
                          Games
                        </p>
                      </Link>

                      <Link href="/spaces" className="flex  pt-10">
                        <img src={Navicon4} />

                        <p className="hover:text-hover font-poppins text-blue pl-3">
                          Spaces
                        </p>
                      </Link>

                      <Link href="/marketplace" className="flex  pt-10">
                        <img src={Navicon9} />

                        <p className="hover:text-hover font-poppins text-blue pl-3">
                          Marketplace
                        </p>
                      </Link>

                      <Link href="/organizers" className="flex  pt-10">
                        <img src={Navicon5} />

                        <p className="hover:text-hover font-poppins text-blue pl-3">
                          Organizers
                        </p>
                      </Link>

                      <Link href="/tournament" className="flex  pt-10">
                        <img src={Navicon6} />

                        <p className="hover:text-hover font-poppins text-blue pl-3">
                          Tournaments
                        </p>
                      </Link>

                      <Link href="/leaderboard" className="flex  pt-10">
                        <img src={Navicon7} />

                        <p className="hover:text-hover font-poppins text-blue pl-3">
                          Leaderboard
                        </p>
                      </Link>

                      <Link href="/more" className="flex pt-10 ">
                        <img src={Navicon8} />

                        <p className="hover:text-hover font-poppins text-blue pl-3">
                          More
                        </p>
                      </Link>
                      <button
                        className="block mx-auto w-5/6  bg-gradient-to-r from-blue to-dark p-5  font-poppins text-head-ing text-white mt-10 "
                        style={{
                          borderTopLeftRadius: "80px",
                          borderBottomRightRadius: "80px",
                        }}
                      >
                        Be a Member
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
