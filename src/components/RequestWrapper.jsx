import React from "react";
import { Link, Outlet } from "react-router-dom";

const RequestWrapper = () => {
  return (
    <>
      <div className="flex justify-evenly items-center py-4 bg-gray-100 max-w-5xl mx-auto">
        <Link
          to="/admin/dashboard/requests"
          className="p-2 bg-gray-400 text-white rounded-md text-sm sm:text-md"
        >
          New Requests
        </Link>
        <Link
          to="resolved"
          className="p-2 bg-gray-400 text-white rounded-md text-sm sm:text-md"
        >
          Resolved
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default RequestWrapper;
