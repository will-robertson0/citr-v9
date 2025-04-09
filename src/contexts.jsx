import { createContext } from "react";

// important to do 'named exports' here for whatever reason
export const CartContext = createContext([[], function () {}]);
