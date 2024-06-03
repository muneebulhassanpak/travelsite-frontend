import React from "react";
import Loader from "../assets/loader.gif";

const Overlay = () => {
  return (
    <div className=" h-full w-full inset-0 fixed bg-[rgba(0,0,0,0.2)] grid place-items-center">
      <img src={Loader} className="w-12 h-12" />
    </div>
  );
};

export default Overlay;
