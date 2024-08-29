import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/screens/LoginPage";
import CaptureToken from "./components/CaptureToken";
import RefreshModal from "./temp/components/RefreshModal";
import DisableModal from "./temp/components/DisableModal";
import GenerateModalAudit from "./temp/components/GenerateModalAudit";
import GenerateModal from "./temp/components/GenerateModalcopy";
import LicenceManagment from "./components/screens/LicensceManagment";
import GenerateLincence from "./components/screens/GenerateLincence";

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
          <Route path="/generate-licence" element={<GenerateLincence />} />
          <Route path="/licence-management" element={<LicenceManagment />} />
          <Route path="/generate-modal" element={<GenerateModal />} />
          <Route path="/refresh-licence" element={<RefreshModal />} />
          <Route path="/auth/callback" element={<CaptureToken />} />
          <Route path="/disable-licence" element={<DisableModal />} />
          <Route
            path="/generate-audit-licence"
            element={<GenerateModalAudit />}
          />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
