import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { headers, getOneTour } from "../../utils/urls";
import { errorToast } from "../../utils/ErrorToast";
import { useSelector, useDispatch } from "react-redux";
import { startLoading, closeLoading } from "../store/generalSlice";
import Loader from "../assets/loader.gif";
import Card from "../assets/card.png";

const SingleTrip = () => {
  const { tripid } = useParams();
  const [data, setData] = useState(null);

  const dispatch = useDispatch();
  const loading = useSelector((store) => store?.utils?.loading);

  useEffect(() => {
    const fetchData = async (id) => {
      dispatch(startLoading());
      try {
        const response = await fetch(getOneTour(id), {
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
        dispatch(closeLoading());
      }
    };

    tripid && fetchData(tripid);
  }, []);
  return loading ? (
    <div className="flex justify-center mt-5">
      <img src={Loader} alt="" className="w-12 h-12 rounded-full" />
    </div>
  ) : (
    <div className="mt-32 flex flex-col-reverse md:flex-row justify-center gap-10 items-center max-w-4xl px-8 mx-auto">
      <div className="left w-full md:w-1/2">
        <img
          src={data?.tourimages[0]}
          alt={data?.tourlocation}
          className="max-h-[60vh] w-auto"
        />
      </div>
      <div className="right w-full md:w-1/2">
        <h1 className="text-3xl text-center mb-5">
          <span className="font-bold">DESTINATION: </span>
          {data?.tourlocation}
        </h1>
        <div className="div my-8 flex justify-center items-center flex-wrap">
          <div className="left bg-gray-600 text-white px-6 py-1 inline-block mb-2 rounded-3xl">
            <span className="font-semibold">Duaration:</span>{" "}
            {data?.tourduration} days
          </div>
        </div>
        <div className="my-8">
          <h2 className="text-2xl text-center">Services</h2>
          <div className="max-w-lg flex justify-center mt-2 gap-3 flex-wrap">
            {data &&
              data.services &&
              data.services.map((item, index) => (
                <div
                  key={index}
                  className="px-4 text-sm py-1 rounded-full bg-gray-600 text-white"
                >
                  {item}
                </div>
              ))}
          </div>
        </div>
        <div>
          <p className="text-center">
            <span className="font-semibold ">Price:</span> {data?.tourprice}
            PKR
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleTrip;
