import { useEffect } from "react";

import Header from "../src/components/Header";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Overlay from "./components/Overlay";
import Footer from "./components/Footer";

import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getExisitingUserDataUrl, headers } from "../utils/urls";
import {
  Login as LoginAction,
  Logout as LogoutAction,
} from "./store/userSlice";

const App = () => {
  const cookie = Cookies.get("access_token");
  const dispatch = useDispatch();
  useEffect(() => {
    const pullUserData = () => {
      fetch(getExisitingUserDataUrl, {
        method: "GET",
        headers: headers,
        credentials: "include",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          data.success == true && dispatch(LoginAction(data.data));
          data.success == false && dispatch(LogoutAction());
        });
    };
    cookie && pullUserData();
  }, []);

  const loading = useSelector((store) => store?.utils?.loading);
  return (
    <section>
      <Header />
      <AnimatedRoutes />
      <Footer />
      {loading && <Overlay />}
    </section>
  );
};
export default App;
