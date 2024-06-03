import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { getOneTour, headers, editPostUrl } from "../../utils/urls";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successToast, errorToast } from "../../utils/ErrorToast";
import { useDispatch } from "react-redux";
import { startLoading, closeLoading } from "../store/generalSlice";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPost() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [tourDate, setTourDate] = useState([]);
  const [price, setPrice] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [services, setServices] = useState([]);
  const [serviceInput, setServiceInput] = useState("");
  const [country, setCountry] = useState("");
  const [files, setFiles] = useState([]);
  const [existingImage, setExistingImage] = useState(null);

  const dispatch = useDispatch();
  const { postid } = useParams();

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
          const {
            tourlocation,
            tourdates,
            tourduration,
            tourimages,
            tourprice,
            tourtype,
            services,
          } = responseData.data;
          setLocation(tourlocation);
          setTourDate(
            tourdates.map((date) => new Date(date).toISOString().split("T")[0])
          );
          setPrice(tourprice);
          setNumberOfDays(tourduration);
          setServices(services);
          setCountry(tourtype);
          setExistingImage(tourimages[0] || null);
        } else {
          throw new Error(responseData.message);
        }
      } catch (error) {
        console.error("Error:", error);
        errorToast(error.message);
      } finally {
        dispatch(closeLoading());
      }
    };

    if (postid) {
      fetchData(postid);
    }
  }, [postid, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        tourDate.length === 0 ||
        services.length === 0 ||
        !["regular", "signature"].includes(country)
      ) {
        throw new Error("Form data is invalid");
      }

      const formData = new FormData();
      formData.append("tourlocation", location);
      formData.append("tourdates", JSON.stringify(tourDate));
      formData.append("tourprice", price);
      formData.append("tourduration", numberOfDays);
      formData.append("services", JSON.stringify(services));
      formData.append("tourtype", country);

      if (files.length > 0) {
        files.forEach((file) => {
          formData.append("tourimages", file);
        });
      }

      dispatch(startLoading());
      const response = await fetch(editPostUrl(postid), {
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
        setExistingImage(null);
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      } else {
        errorToast(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      return errorToast(error.message);
    } finally {
      dispatch(closeLoading());
    }
  };

  const handleFileChange = (e) => {
    setFiles([...files, e.target.files[0]]);
  };

  const handleServiceInputChange = (e) => {
    setServiceInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (serviceInput.trim() !== "") {
        setServices([...services, serviceInput.trim()]);
        setServiceInput("");
      }
    }
  };

  const removeService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const removeExistingImage = () => {
    setExistingImage(null);
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
                  Tour Location
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
                  Tour Dates
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    id="tour-date"
                    name="tour-date"
                    value={tourDate[0] || ""}
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
                  Price per head
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
                  Number of days
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
                  Services Offered
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
                <ul className="mt-2 flex justify-start gap-2">
                  {services.map((service, index) => (
                    <li
                      key={index}
                      className="flex items-center bg-gray-200 px-2 py-1 rounded-full"
                    >
                      {service}
                      <button
                        type="button"
                        className="ml-2 text-red-500"
                        onClick={() => removeService(index)}
                      >
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Select Country</option>
                    <option value="regular">Regular</option>
                    <option value="signature">Signature</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6">
                {existingImage && (
                  <div className=" grid place-items-center">
                    <div className="relative">
                      <img
                        src={existingImage}
                        alt="Tour"
                        className="h-24 w-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 px-2 py-1 bg-red-500 text-white rounded-full"
                        onClick={removeExistingImage}
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                )}
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
            Save
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
