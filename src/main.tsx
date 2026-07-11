import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { MainProvider } from "./context"; 
import { router } from "./router"; 
import './index.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainProvider>
      <RouterProvider router={router} />
    </MainProvider>
  </React.StrictMode>
);