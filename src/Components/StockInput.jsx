import { useEffect, useState, useContext } from "react";
import "./StockStyling.css";
import StockCalculator from "./StockCalculator.jsx";
import {
  StockSymbolContext,
  PurchasePriceContext,
  QuantityContext,
} from "./StockContext.jsx";

function StockInput() {
  const { stockSymbol, setStockSymbol } = useContext(StockSymbolContext);
  const { purchasePrice, setPurchasePrice } = useContext(PurchasePriceContext);
  const { quantity, setQuantity } = useContext(QuantityContext);
  const [showResults, setShowResults] = useState(false);
  // useState hooks: [current state variable that holds the value, function to update the value] =  initial value of (empty strings)

  const handleStockSymbolChange = (event) => {
    setShowResults(false);
    let value = event.target.value;
    value = value.toUpperCase();
    value = value.replace(/[^A-Z]/g, "0");
    if (value !== "0" || value === "") {
      setStockSymbol(value);
    }
  };
  //event handler triggered by specific event which calls function(setStockSymbol) to update state variable (stockSymbol)
  // event.target.value: to retrieve the value from the target component that triggered the event.
  // convert value to uppercase and remove non-alphabetic characters, allow empty string input, replacing other on-alphabetic characters with 0. if 0s are detected, state variable is blocked from changes

  const handlePurchasePriceChange = (event) => {
    setShowResults(false);
    const value = event.target.value;
    if (value !== "00") {
      setPurchasePrice(value);
    }
  };
  //event handler triggered by specific event which calls function(setPurchasePrice) to update state variable (purchasePrice)
  // if statement to only allow input of a single 0 incase user inputs decimal point value e.g. 0.25. Can be bypassed with copy and pasting three 0s though.

  const handleQuantityChange = (event) => {
    setShowResults(false);
    const value = event.target.value;
    if (value === "" || (value !== "0" && !value.includes("."))) {
      setQuantity(value);
    }
  };
  //event handler which calls function(setQuantity) to update state variable (quantity)

  const handleCalculate = (event) => {
    event.preventDefault();
    if (stockSymbol == "" || purchasePrice == "" || quantity == "") {
      setShowResults(false);
    } else {
      setShowResults(true);
    }
  };
  //event handler which calls function(setShowresults) to update it be true. For all other event handlers, if any of them are changed or empty, showResults state is set to false. Only upon clicking the calculate button, it will be true and be displayed.

  return (
    <div>
      <div className="inputFields">
        <input
          type="text"
          name="stock-symbol"
          id="stockSymbol"
          placeholder="Stock Symbol"
          value={stockSymbol}
          onChange={handleStockSymbolChange}
        />
        <input
          type="number"
          min="Number.EPSILON"
          name="purchase-price"
          id="purchasePrice"
          placeholder="Purchase Price"
          value={purchasePrice}
          onChange={handlePurchasePriceChange}
        />
        <input
          type="number"
          min="2"
          name="quantity"
          id="quantity"
          placeholder="Quantity"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <button onClick={handleCalculate}>Calculate</button>
      </div>
      <div className="resultsContainer">
        {showResults && (
          <div className="resultsContent">
            <StockCalculator />
          </div>
        )}
      </div>
    </div>
  );
}
export default StockInput;
