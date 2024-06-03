import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getSingleRequestData,
  headers,
  approveRequest,
} from "../../utils/urls";
import { successToast, errorToast } from "../../utils/ErrorToast";
import { useParams } from "react-router-dom";
import Loader from "../assets/loader.gif";
import { useNavigate } from "react-router-dom";

export default function SingleRequest() {
  const [request, setRequest] = useState(null);
  const { requestid } = useParams();
  const urlParams = new URLSearchParams(window.location.search);
  const resolved = urlParams.get("resolved");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getSingleRequestData(requestid), {
          method: "GET",
          headers: headers,
          credentials: "include",
        });
        const data = await response.json();
        if (data.success === true) {
          setRequest(data.data);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        return errorToast("Failed to fetch request data");
      }
    };

    requestid && fetchData();
  }, [requestid]); // Include requestid in the dependency array

  // Function to filter out unwanted fields
  const filterFields = (obj) => {
    const filteredObj = { ...obj };
    delete filteredObj.createdAt;
    delete filteredObj.updatedAt;
    delete filteredObj.__v;
    delete filteredObj._id;
    return filteredObj;
  };

  // Function to render date items correctly
  const renderDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleResolve = async () => {
    try {
      const response = await fetch(approveRequest(requestid), {
        method: "GET",
        headers: headers,
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        successToast("Request resolved");
        setTimeout(() => {
          navigate("/admin/dashboard/requests");
        }, 1000);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      return errorToast("Failed to resolve request");
    }
  };

  return (
    <div className="max-w-[90%] lg:max-w-5xl mx-auto py-14 mt-2 px-10 rounded-md bg-gray-100 relative">
      {request ? (
        <>
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Request Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Personal details and application.
            </p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {Object.entries(filterFields(request)).map(([key, value]) => (
                <div
                  key={key}
                  className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                >
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    {key}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {Array.isArray(value)
                      ? value.map((item, index) => (
                          <span key={index} className="p-1 bg-red-100">
                            {renderDate(item)}
                            {index < value.length - 1 && ", "}
                          </span>
                        ))
                      : value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          {resolved === "true" && (
            <div className="absolute right-3 top-3">
              <button
                className="px-4 py-2 rounded-md bg-green-200 text-sm"
                onClick={handleResolve}
              >
                Resolve
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center">
          <img src={Loader} className="w-12 h-12 rounded-full" alt="Loading" />
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
