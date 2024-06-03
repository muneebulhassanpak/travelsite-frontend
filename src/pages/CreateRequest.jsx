import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successToast, errorToast } from "../../utils/ErrorToast";
import { createRequestUrl, headers } from "../../utils/urls";
import { motion } from "framer-motion";

const CreateRequest = () => {
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [contactNumber, setContactNumber] = useState("");
  const [tentativeDates, setTentativeDates] = useState([]);
  const [startingCity, setStartingCity] = useState("");
  const [visitingLocation, setVisitingLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [email, setEmail] = useState("");

  const handleDateSelect = (e) => {
    const selectedDate = e.target.value;
    if (tentativeDates.length < 3 && !tentativeDates.includes(selectedDate)) {
      setTentativeDates([...tentativeDates, selectedDate]);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (numberOfDays < 1 || numberOfPeople < 1) {
        errorToast("Number of days and number of people must be at least 1");
        return;
      }

      const contactRegex = /^\d{11}$/;
      if (!contactRegex.test(contactNumber)) {
        errorToast(
          "Contact number must be 11 digits long and contain only numbers"
        );
        return;
      }

      if (tentativeDates.length === 0 || tentativeDates.length > 3) {
        errorToast(
          "Tentative dates must have at least one entry and at most three entries"
        );
        return;
      }

      if (!startingCity.trim()) {
        errorToast("Starting city location cannot be empty");
        return;
      }
      if (!visitingLocation.trim()) {
        errorToast("Visiting location cannot be empty");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errorToast("Invalid email address");
        return;
      }

      const requestBody = {
        numberofdays: numberOfDays,
        numberofpeople: numberOfPeople,
        contactnumber: contactNumber,
        tentativedates: tentativeDates,
        startingcity: startingCity,
        visitinglocation: visitingLocation,
        notes,
        email,
      };

      const response = await fetch(createRequestUrl, {
        method: "POST",
        headers: headers,
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (data.success === true) {
        successToast(data.message);
        setNumberOfDays(1);
        setNumberOfPeople(1);
        setContactNumber("");
        setTentativeDates([]);
        setStartingCity("");
        setVisitingLocation("");
        setNotes("");
        setEmail("");
      } else {
        errorToast(data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      errorToast(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        duration: 8,
      }}
    >
      <form
        className="mt-20 md:mt-32 max-w-[90%] lg:max-w-5xl mx-auto bg-gray-100 p-5 rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="numberofdays"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Number of Days<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="mt-2">
              <input
                type="number"
                id="numberofdays"
                name="numberofdays"
                value={numberOfDays}
                onChange={(e) => setNumberOfDays(e.target.value)}
                autoComplete="numberofdays"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="numberofpeople"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Number of People<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="mt-2">
              <input
                type="number"
                id="numberofpeople"
                name="numberofpeople"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(e.target.value)}
                autoComplete="numberofpeople"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="contactnumber"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Contact Number<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="mt-2">
              <input
                type="tel"
                id="contactnumber"
                name="contactnumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                autoComplete="tel"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="tentativedates"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tentative Dates<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {tentativeDates.length < 3 && (
                <input
                  type="date"
                  id="tentativedates"
                  name="tentativedates"
                  onChange={handleDateSelect}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              )}
              {tentativeDates.map((date, index) => (
                <div
                  key={index}
                  className="bg-gray-200 px-2 py-1 rounded-md text-sm"
                >
                  {date}{" "}
                  <button
                    type="button"
                    className="ml-1 text-red-600 hover:text-red-700 focus:outline-none text-sm"
                    onClick={() =>
                      setTentativeDates(
                        tentativeDates.filter((_, i) => i !== index)
                      )
                    }
                  >
                    &#x2716;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="startingcity"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Starting City<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="startingcity"
                name="startingcity"
                value={startingCity}
                onChange={(e) => setStartingCity(e.target.value)}
                autoComplete="startingcity"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="visitinglocation"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Visiting Location<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="visitinglocation"
                name="visitinglocation"
                value={visitingLocation}
                onChange={(e) => setVisitingLocation(e.target.value)}
                autoComplete="visitinglocation"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="notes"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Notes (Optional)
            </label>
            <div className="mt-2">
              <textarea
                id="notes"
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md light-blue-bg px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Make Request
          </button>
        </div>
      </form>

      <ToastContainer />
    </motion.div>
  );
};

export default CreateRequest;
