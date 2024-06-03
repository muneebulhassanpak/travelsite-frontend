import { useRef, useState } from "react";
import { registerUrl, headers } from "../../utils/urls";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successToast, errorToast } from "../../utils/ErrorToast";
import { motion } from "framer-motion";
import logo from "../assets/logoblue.png";

const requestHandler = async (fullname, email, password, role) => {
  const dataobject = {
    fullname,
    email,
    password,
    role,
  };
  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify(dataobject),
    });
    const data = await response.json();
    data.success == true && successToast(data.message);
    data.success == false && errorToast(data.message);
  } catch (error) {
    console.error("Error:", error);
  }
};

export default function Signup() {
  const fullnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef(); // Add a ref for the role select element
  const [selectedRole, setSelectedRole] = useState("user");
  const signupFormHandler = async (e) => {
    e.preventDefault();
    const fullname = fullnameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const role = selectedRole;

    if (fullname.length < 3) {
      errorToast("Full name must be at least 3 characters long.");
      return;
    }

    if (!email.includes("@")) {
      errorToast("Invalid email address.");
      return;
    }

    if (password.length < 5) {
      errorToast("Password must be at least 5 characters long.");
      return;
    }

    await requestHandler(fullname, email, password, role);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          duration: 10,
        }}
        className="flex min-h-full w-[95%] md:max-w-sm rounded-md mx-auto border mt-24 flex-1 flex-col justify-center px-6 py-8 lg:px-8"
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-md rounded-md">
          <img
            className="mx-auto h-12 w-auto"
            src={logo}
            alt="Pacific Travels"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up for your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-2" action="#" method="POST">
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Full Name
              </label>
              <div className="mt-2">
                <input
                  id="fullname"
                  name="fullname"
                  type="fullname"
                  autoComplete="text"
                  placeholder="Atleast 3 characters"
                  required
                  ref={fullnameRef}
                  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

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
                  placeholder="Your valid email"
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
                  ref={passwordRef}
                  placeholder="Atleast 5 characters"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Role
              </label>

              <select
                name="role"
                id="role"
                ref={roleRef}
                value={selectedRole}
                onChange={handleRoleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                onClick={signupFormHandler}
                className="flex w-full justify-center rounded-md light-blue-bg px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-4 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </motion.div>
      <ToastContainer />
    </>
  );
}
