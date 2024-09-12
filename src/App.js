import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/screens/LoginPage";
import CaptureToken from "./components/CaptureToken";
import GenerateModal from "./temp/components/GenerateModal";
import LicenceManagment from "./components/screens/LicensceManagment";
import "@coreui/coreui/dist/css/coreui.min.css";
import "@coreui/coreui-pro/dist/css/coreui.min.css";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/licence-management" element={<LicenceManagment />} />
          <Route path="/generate-modal" element={<GenerateModal />} />
          <Route path="/auth/callback" element={<CaptureToken />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
