// import React from "react"; // not needed because .jsx - see Pizza.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

const App = () => {
  // in jsx, tags are lowercase, while elements created in react go in their place
  // but are capitalized. see: "StrictMode" below
  return (
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
