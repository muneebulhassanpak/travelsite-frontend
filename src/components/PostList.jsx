import React, { useState, useEffect } from "react";
import { headers, getTourList, deleteOnePost } from "../../utils/urls";
import { errorToast, successToast } from "../../utils/ErrorToast";
import Loader from "../assets/loader.gif";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLoading, closeLoading } from "../store/generalSlice";
import { ToastContainer } from "react-toastify";

export default function PostList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(getTourList, {
          method: "GET",
          headers: headers,
          credentials: "include",
        });
        const responseData = await response.json();
        if (responseData.success) {
          setData(responseData.data);
        } else {
          setData([]);
          throw new Error(responseData.message);
        }
      } catch (error) {
        console.error("Error:", error);
        return errorToast(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteTourPost = async (id) => {
    dispatch(startLoading());
    try {
      const response = await fetch(deleteOnePost(id), {
        method: "DELETE",
        headers: headers,
        credentials: "include",
      });
      const responseData = await response.json();
      if (responseData.success) {
        setData((prev) => {
          return prev.filter((item) => item._id !== id);
        });
        return successToast("Item deleted successfully");
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      return errorToast(error.message);
    } finally {
      dispatch(closeLoading());
    }
  };

  return (
    <>
      <ul
        role="list"
        className="divide-y divide-gray-100 max-w-[90%] lg:max-w-5xl mx-auto"
      >
        {loading ? ( // Render loader if loading is true
          <div className="flex justify-center items-center">
            <img
              src={Loader}
              className="w-12 h-12 rounded-full"
              alt="Loading"
            />
          </div>
        ) : (
          // Render list items if loading is false
          data &&
          data.map((tour, index) => (
            <li
              key={tour._id}
              className="flex flex-col sm:flex-row justify-center sm:justify-between gap-x-6 py-3"
            >
              <div className="flex min-w-0 gap-x-4 text-center md:text-left">
                <div
                  className={`h-6 w-6 grid place-items-center rounded-full ${
                    tour.type === "signature" ? "bg-red-200" : "bg-green-200"
                  }`}
                >
                  {index}
                </div>
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {tour.from}
                  </p>
                  <div className="mt-1 flex justify-center md:justify-start">
                    {tour?.dates?.map((date, idx) => (
                      <p
                        key={idx}
                        className="truncate text-xs leading-5 text-gray-500 mr-2"
                      >
                        {new Date(date).toDateString()}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="shrink-0  mt-2 md:mt-0 flex sm:flex-row gap-1 justify-center sm:items-end">
                <Link
                  to={`/All-Trips/${tour._id}`}
                  className="px-4 py-2 text-xs rounded-full bg-green-100"
                >
                  View
                </Link>
                <Link
                  to={`/admin/dashboard/edit/${tour._id}`}
                  className="px-4 py-2 text-xs rounded-full bg-green-100"
                >
                  Edit
                </Link>
                <button
                  className="px-4 py-2 text-xs rounded-full bg-red-100"
                  onClick={() => {
                    deleteTourPost(tour._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      <ToastContainer />
    </>
  );
}
