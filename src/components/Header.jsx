import React from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logoblue.png";

const navigation = [
  { name: "Home", to: "/" },
  { name: "All Trips", to: "/All-Trips" },
  { name: "Make Your Own Trip", to: "/create-your-tour" },
  { name: "FAQs", to: "/FAQs" },
];

import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { Logout } from "../store/userSlice";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const loggedIn = useSelector((store) => store?.user?.isLoggedIn);
  const userRole = useSelector((store) => store?.user?.user?.role);
  const dispatch = useDispatch();

  const LogoutHandler = () => {
    Cookies.remove("access_token");
    dispatch(Logout());
  };
  return (
    <header className="absolute inset-x-0 top-0 px-5 z-50 bg-white">
      <nav
        className="flex items-center justify-between px-1 py-3 max-w-6xl mx-auto lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="mt-2.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-10 w-auto" src={Logo} alt="Pacfic travels logo" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 ">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "active text-lightBlue font-normal leading-6 text-md tracking-wider"
                  : "font-normal leading-6 text-md text-gray-800 tracking-wider hover:text-lightBlue transition-colors delay-100"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {userRole == "admin" && (
            <Link
              to="/admin/dashboard"
              className="text-sm font-semibold leading-6 mr-4 text-white bg-gray-700 px-6 py-2 rounded-full "
            >
              Dashboard
            </Link>
          )}
          {loggedIn && (
            <>
              <button
                onClick={() => {
                  LogoutHandler();
                }}
                className="text-sm font-semibold leading-6 mr-4 text-white bg-gray-700 px-6 py-2 rounded-full "
              >
                Logout
              </button>
            </>
          )}
          {!loggedIn && (
            <>
              <Link
                to="/signup"
                className="text-sm font-semibold leading-6 mr-4 text-black border rounded-full px-6 py-2 hover:bg-lightBlue hover:text-white transition-colors"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="text-sm font-semibold leading-6 text-white border light-blue-bg rounded-full px-6 py-2  hover:text-lightBlue hover:bg-white"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src={Logo}
                alt="Pacific travels logo"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  text-gray-900 cursor-pointer"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {userRole == "admin" && (
                  <Link
                    to="/admin/dashboard"
                    className="text-sm font-semibold inline-block leading-6 mr-4 text-white bg-gray-700 px-6 py-2 rounded-full "
                  >
                    Dashboard
                  </Link>
                )}
                {loggedIn && (
                  <>
                    <button
                      onClick={() => {
                        LogoutHandler();
                      }}
                      className="text-sm inline-block font-semibold leading-6 mr-4 my-6 text-white bg-purple-400 px-6 py-2 rounded-full"
                    >
                      Logout
                    </button>
                  </>
                )}
                {!loggedIn && (
                  <>
                    <Link
                      to="/signup"
                      className="text-sm block font-semibold leading-6 my-6 text-black border border-black px-6 py-2 rounded-full text-center"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className=" block rounded-full py-2  text-sm font-semibold leading-7 px-6  text-white border light-blue-bg text-center"
                    >
                      Log in
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
