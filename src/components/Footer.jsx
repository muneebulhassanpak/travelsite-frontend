import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logowhite.png";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Trips", to: "/Trips" },
  { name: "Make Your Own Trip", to: "/create-your-tour" },
  { name: "FAQs", to: "/FAQs" },
];

const Footer = () => {
  return (
    <footer className="bg-moderateBlue py-14 mt-4">
      <div className="px-4 xl:px-0  max-w-6xl mx-auto flex justify-center md:justify-between items-start md:items-start gap-8 flex-col md:flex-row">
        <div className="order-3 md:order-1">
          <h4 className="uppercase text-white font-semibold text-xl mb-4">
            important Links
          </h4>
          {navigation.map((item, index) => (
            <Link
              to={item.to}
              key={index}
              className="mb-3 block decoration-none text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="order-1 md:order-2">
          <Link to="/">
            <img
              src={Logo}
              alt="Pacific travels logo"
              className="h-16 md:h-20 w-auto"
            />
          </Link>
        </div>
        <div className="order-2 md:order-3 text-right text-white">
          <h4 className="uppercase text-white font-semibold text-xl mb-4">
            contact information
          </h4>
          <p className="flex justify-start md:justify-end items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>{" "}
            muneeb@gmail.com
          </p>
          <p className="flex justify-start md:justify-end items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
              />
            </svg>{" "}
            03028609440
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
