import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { MainProvider } from "./context"; // Import Provider
import { router } from "./router"; // Import router yang sudah dipisah
import './index.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Bungkus RouterProvider dengan MainProvider */}
    <MainProvider>
      <RouterProvider router={router} />
    </MainProvider>
  </React.StrictMode>
);