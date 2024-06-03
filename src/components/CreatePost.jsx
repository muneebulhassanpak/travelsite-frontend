import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { createPostUrl } from "../../utils/urls";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successToast, errorToast } from "../../utils/ErrorToast";
import { useDispatch } from "react-redux";
import { startLoading, closeLoading } from "../store/generalSlice";

export default function CreatePost() {
  const [location, setLocation] = useState("");
  const [tourDate, setTourDate] = useState([]);
  const [price, setPrice] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [services, setServices] = useState([]);
  const [serviceInput, setServiceInput] = useState(""); // State to capture input from the textarea
  const [country, setCountry] = useState("");
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      if (
        tourDate.length === 0 ||
        services.length === 0 ||
        !["regular", "signature"].includes(country)
      ) {
        throw new Error("Form data is invalid");
      }

      const formData = new FormData(); // Create FormData object
      formData.append("tourlocation", location);
      formData.append("tourdates", JSON.stringify(tourDate));
      formData.append("tourprice", price);
      formData.append("tourduration", numberOfDays);
      formData.append("services", JSON.stringify(services)); // Convert services array to JSON string
      formData.append("tourtype", country);
      files.forEach((file) => {
        formData.append("tourimages", file); // Append each file to FormData
      });

      dispatch(startLoading());
      const response = await fetch(createPostUrl, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      if (data.success === true) {
        successToast(data.message);
        setLocation("");
        setTourDate([]);
        setPrice("");
        setNumberOfDays(1);
        setServices([]);
        setCountry("");
        setFiles([]);
      } else {
        errorToast(data.message);
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return errorToast(error.message);
    } finally {
      dispatch(closeLoading());
    }
  };

  // Function to handle file input change
  const handleFileChange = (e) => {
    setFiles([...files, e.target.files[0]]);
  };

  // Function to handle input change in the textarea for services
  const handleServiceInputChange = (e) => {
    setServiceInput(e.target.value);
  };

  // Function to handle pressing the enter key in the textarea for services
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default behavior of the enter key
      if (serviceInput.trim() !== "") {
        setServices([...services, serviceInput.trim()]); // Add the entered service to the services array
        setServiceInput(""); // Clear the textarea
      }
    }
  };

  return (
    <>
      <form
        className="max-w-[90%] lg:max-w-5xl mx-auto bg-gray-100 p-5 rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-10">
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tour Location<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="tour-date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tour Date<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    id="tour-date"
                    name="tour-date"
                    value={tourDate}
                    onChange={(e) => setTourDate([e.target.value])}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price per head<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="number-of-days"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Number of days<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="number-of-days"
                    name="number-of-days"
                    value={numberOfDays}
                    onChange={(e) => setNumberOfDays(e.target.value)}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="services"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Services Offered<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="services"
                    name="services"
                    value={serviceInput}
                    onChange={handleServiceInputChange}
                    onKeyDown={handleKeyDown}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Type a service and press Enter"
                  />
                </div>
                <div className="mt-2">
                  {services.map((service, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-400 rounded-full px-3 py-1 text-sm tracking-wider text-white mr-2 mb-2"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                  >
                    <option value="">Select</option>
                    <option value="signature">Signature</option>
                    <option value="regular">Regular</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
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
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
