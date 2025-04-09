// this file was named in camelCase instead of PascalCase/UpperCamelCase
// because it is not a component

import { useState, useEffect, useDebugValue } from "react";

// a custom hook is just a function that calls other hooks:
// naming our custom hook like useXXXXX helps the react linting understand
// that it is a hook (all hooks have 'use' at the front of the name)
export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);
  useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.id}` : "loading...");

  useEffect(() => {
    async function fetchPizzaOfTheDay() {
      const response = await fetch("/api/pizza-of-the-day");
      const data = await response.json();
      setPizzaOfTheDay(data);
    }
    fetchPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
};
