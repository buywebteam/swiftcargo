import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ShipmentProvider } from "./context/ShipmentContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ShipmentProvider>
          <App />
        </ShipmentProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
