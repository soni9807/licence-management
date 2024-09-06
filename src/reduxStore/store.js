// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import licenceReducer from "./slices/licenceSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    licence: licenceReducer,
  },
});

export default store;
