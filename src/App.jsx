// import React from "react"; // not needed because .jsx - see Pizza.jsx
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import PizzaOfTheDay from "./PizzaOfTheDay";
import Order from "./Order";
import Header from "./Header";
import { CartContext } from "./contexts";


const App = () => {
    const cartHook = useState([]);
  // in jsx, tags are lowercase, while elements created in react go in their place
  // but are capitalized. see: "Header" below
  return (
    <StrictMode>
      <CartContext.Provider value={cartHook}>
          <div>
            <Header />
            <Order />
            <PizzaOfTheDay />
          </div>
      </CartContext.Provider>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
