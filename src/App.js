import React from "react";
import Home from "./userResponseForm/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import ErrorPage from "./GlobalComponents/ErrorPage";

function App() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      fontFamily: 'Roboto, sans-serif'
    }}>
      <BrowserRouter>
        <Routes>
          {/* <PrivateRoute path="/form" element={<PrivateRoute Component={<Home />} />} /> */}
          <Route path="/form" element={<Home />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
