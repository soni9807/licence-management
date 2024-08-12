import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/screens/LoginPage";
import CaptureToken from "./components/CaptureToken";
import Home from "./components/userResponseForm/Home";

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
          <Route path="/" element={<Login />} />
          <Route path="/form" element={<Home />} />
          <Route path="/auth/callback" element={<CaptureToken />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
