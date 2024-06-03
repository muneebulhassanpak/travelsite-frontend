import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import utilReducer from "./generalSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    utils: utilReducer,
  },
});

export default store;
