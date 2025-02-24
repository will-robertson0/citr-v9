// import React from "react"; // not needed because .jsx - see Pizza.jsx
import { createRoot } from "react-dom/client";
import Order from "./Order";

const App = () => {
  // in jsx, tags are lowercase, while elements created in react go in their place
  // but are capitalized. see: "Pizza" below
  return (
    <div>
      <h1>Padre Gino's - Order Now</h1>
      <Order />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
