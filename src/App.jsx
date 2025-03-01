// import React from "react"; // not needed because .jsx - see Pizza.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PizzaOfTheDay from "./PizzaOfTheDay";
import Order from "./Order";

const App = () => {
  // in jsx, tags are lowercase, while elements created in react go in their place
  // but are capitalized. see: "Pizza" below
  return (
    <StrictMode>
      <div>
        <h1 className="logo">Padre Gino's - Order Now</h1>
        <Order />
        <PizzaOfTheDay />
      </div>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
