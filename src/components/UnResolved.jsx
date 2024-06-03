import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUnResolvedRequests, headers } from "../../utils/urls";
import { successToast, errorToast } from "../../utils/ErrorToast";
import { Link } from "react-router-dom";
import Loader from "../assets/loader.gif";

const ListItem = ({ item, index }) => (
  <Link
    to={`/admin/dashboard/requests/${item._id}/?resolved=true`}
    className="cursor-pointer px-2 sm:px-10 block w-full hover:bg-white border-b border-[rgba(0,0,0,0.2)]"
  >
    <li className="flex justify-between gap-x-6 py-3">
      <div className="flex min-w-0 gap-x-4">
        <div
          className={`h-6 w-6 grid place-items-center rounded-full bg-gray-400 text-white`}
        >
          {index}
        </div>
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {item.email}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {item.contactnumber}
          </p>
        </div>
      </div>
      <div className="hidden sm:block shrink-0">
        <p className="truncate text-xs leading-5 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 inline-block mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          {item.startingcity}
        </p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 inline-block mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
          {item.visitinglocation}
        </p>
      </div>
    </li>
  </Link>
);

const UnResolved = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getUnResolvedRequests, {
          method: "GET",
          headers: headers,
          credentials: "include",
        });
        const responseData = await response.json();
        if (responseData.success) {
          setData(responseData.data);
        } else {
          setData([]);
          return errorToast(responseData.message);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-5xl bg-gray-100">
      {loading ? (
        <div className="flex justify-center items-center">
          <img src={Loader} className="w-12 h-12 rounded-full" alt="Loading" />
        </div>
      ) : (
        <>
          {data.length > 0 ? (
            <ul
              role="list"
              className="divide-y divide-gray-100 max-w-[90%] lg:max-w-5xl mx-auto"
            >
              {data.map((item, index) => (
                <ListItem key={index} index={index} item={item} />
              ))}
            </ul>
          ) : (
            <p className="text-center text-md">No Requests to show</p>
          )}
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default UnResolved;
