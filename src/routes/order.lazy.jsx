import { useEffect, useState, useContext} from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import Pizza from "../Pizza";
import Cart from '../Cart';
import { CartContext } from "../contexts";

export const Route = createLazyFileRoute("/order")({
    component: Order,
});

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// named function, unlike in Pizza.jsx. name shows up in stack trace
// removed "export default" from the line below after creating the Route function above
function Order() {
  // these are hooks. they depend on being called in the same order every time,
  // so they cannot be called inside a conditional or loop.
  // here useState returns an array with the variable and a setter function.
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [cart, setCart] = useContext(CartContext);
    const [loading, setLoading] = useState(true);

    async function checkout() {
        setLoading(true);
        await fetch("/api/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({cart}),
        });
        setCart([]);
        setLoading(false);
    }

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = intl.format(
      selectedPizza.sizes ? selectedPizza.sizes[pizzaSize] : "",
    );
  }

  async function fetchPizzaTypes() {
    const pizzaRes = await fetch("/api/pizzas");
    const pizzaJson = await pizzaRes.json();
    setPizzaTypes(pizzaJson);
    setLoading(false);
  }

  // effects are used for things that need to happen independent of renders.
  // in this case, we want fetchPizzaTypes() to be called only once. the second
  // parameter we give it is a variable, upon every change to which the
  // effect will be run. [] results in it only being run once.
  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  return (
    <div className="order-page">
        <div className="order">
          <h2>Create Order</h2>
          <form onSubmit={(e) => {
            e.preventDefault()
            setCart([...cart, {pizza: selectedPizza, size: pizzaSize, price }]);
            }}
          >
            <div>
              <div>
                <label htmlFor="pizza-type">Pizza Type</label>
                <select
                  onChange={(e) => setPizzaType(e.target.value)}
                  name="pizza-type"
                  value={pizzaType}
                >
                  {pizzaTypes.map((pizza) => (
                    <option key={pizza.id} value={pizza.id}>
                      {pizza.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="pizza-size">Pizza Size</label>
                <div>
                  <span>
                    <input
                      onChange={(e) => setPizzaSize(e.target.value)}
                      checked={pizzaSize === "S"}
                      type="radio"
                      name="pizza-size"
                      value="S"
                      id="pizza-s"
                    />
                    <label htmlFor="pizza-s">Small</label>
                  </span>
                  <span>
                    <input
                      onChange={(e) => setPizzaSize(e.target.value)}
                      checked={pizzaSize === "M"}
                      type="radio"
                      name="pizza-size"
                      value="M"
                      id="pizza-m"
                    />
                    <label htmlFor="pizza-m">Medium</label>
                  </span>
                  <span>
                    <input
                      onChange={(e) => setPizzaSize(e.target.value)}
                      checked={pizzaSize === "L"}
                      type="radio"
                      name="pizza-size"
                      value="L"
                      id="pizza-l"
                    />
                    <label htmlFor="pizza-l">Large</label>
                  </span>
                </div> 
              </div>
              <button type="submit">Add to Cart</button>
            </div>
            {loading ? (
              <h3>LOADING …</h3>
            ) : (
              <div className="order-pizza">
                <Pizza
                  name={selectedPizza.name}
                  description={selectedPizza.description}
                  image={selectedPizza.image}
                />
                <p>{price}</p>
              </div>
            )}
          </form>
        </div>
        { loading ? <h2>LOADING ...</h2> : <Cart checkout={checkout} cart={cart} /> }
    </div>
  );
}
