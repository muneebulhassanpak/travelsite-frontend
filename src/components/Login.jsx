import { useRef } from "react";
import { loginUrl, headers } from "../../utils/urls";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successToast, errorToast } from "../../utils/ErrorToast";
import logo from "../assets/logoblue.png";
import { useNavigate } from "react-router-dom";

import { Login as loginAction } from "../store/userSlice.js";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

const requestHandler = async (email, password) => {
  const dataobject = {
    email,
    password,
  };
  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify(dataobject),
    });
    const data = await response.json();
    if (data.success == true) {
      successToast(data.message);
      return data.data;
    } else {
      errorToast(data.message);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const loginFormHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email.includes("@")) {
      errorToast("Invalid email address.");
      return;
    }

    if (password.trim().length < 1) {
      errorToast("Password must be provided.");
      return;
    }

    const data = await requestHandler(email, password);
    if (!null) {
      const isAdmin = data.role == "admin";
      if (isAdmin) {
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      }
      dispatch(loginAction(data));
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          duration: 10,
        }}
        className="flex min-h-full w-[95%] md:max-w-sm rounded-md mx-auto border mt-28 flex-1 flex-col justify-center px-6 py-10 lg:px-8"
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-12 w-auto"
            src={logo}
            alt="Pacific Travels"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-2" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  ref={emailRef}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  ref={passwordRef}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={loginFormHandler}
                className="flex w-full justify-center rounded-md light-blue-bg px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-4 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </motion.div>
      <ToastContainer />
    </>
  );
}
