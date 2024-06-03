import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Shop from "../pages/Shop";
import PageNotFound from "../pages/PageNotFound";
import Login from "./Login";
import Signup from "./Signup";
import SingleRequest from "./SingleRequest";
import Resolved from "./Resolved";
import UnResolved from "./UnResolved";
import CreatePost from "./CreatePost";
import FAQs from "../pages/FAQs";
import CreateRequest from "../pages/CreateRequest";
import DashboardWrapper from "../pages/DashboardWrapper";
import RequestWrapper from "./RequestWrapper";
import AllTrips from "../pages/AllTrips";
import PostList from "./PostList";
import SingleTrip from "../pages/SingleTrip";
import EditPost from "./EditPost";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <div location={location} key={location.pathname}>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/FAQs" element={<FAQs />} />
        <Route path="/All-Trips" element={<AllTrips />} />
        <Route path="/All-Trips/:tripid" element={<SingleTrip />} />
        <Route path="/create-your-tour" element={<CreateRequest />} />
        <Route path="/admin/add-product" element={<CreatePost />} />
        <Route path="/admin/dashboard" element={<DashboardWrapper />}>
          <Route index element={<PostList />} />
          <Route path="edit/:postid" element={<EditPost />} />
          <Route path="requests" element={<RequestWrapper />}>
            <Route index element={<UnResolved />} />
            <Route path=":requestid" element={<SingleRequest />} />
            <Route path="resolved" element={<Resolved />} />
          </Route>

          <Route path="create-post" element={<CreatePost />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default AnimatedRoutes;
