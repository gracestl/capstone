import { useContext, useState, useCallback } from "react";
import "./StockStyling.css";
import StockCalculator from "./StockCalculator.jsx";
import {
  StockSymbolContext,
  PurchasePriceContext,
  QuantityContext,
  StockListContext,
} from "./StockContext.jsx";

function StockInput() {
  const { stockSymbol, setStockSymbol } = useContext(StockSymbolContext);
  const { purchasePrice, setPurchasePrice } = useContext(PurchasePriceContext);
  const { quantity, setQuantity } = useContext(QuantityContext);
  const { stocks, addStock } = useContext(StockListContext);
  const [error, setError] = useState(null);

  const handleStockSymbolChange = (event) => {
    let value = event.target.value;
    value = value.toUpperCase();
    value = value.replace(/[^A-Z]/g, "0");
    if (value !== "0" || value === "") {
      setStockSymbol(value);
    }
    setError(null); // Clear error on input change
  }; // Only allow alphabets

  const handlePurchasePriceChange = (event) => {
    const value = event.target.value;
    if (value !== "00") {
      setPurchasePrice(value);
    }
    setError(null); // Clear error on input change
  }; // Only allow numbers/decimal inputs

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (value === "" || (value !== "0" && !value.includes("."))) {
      setQuantity(value);
    }
    setError(null); // Clear error on input change
  }; // Only integers

  const handleCalculate = useCallback(
    (event) => {
      event.preventDefault();
      if (stockSymbol && purchasePrice && quantity) {
        fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=ZL9W7LIEZX9WETLG`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data["Global Quote"] && data["Global Quote"]["05. price"]) {
              const currentPrice = parseFloat(
                data["Global Quote"]["05. price"]
              );
              const newStock = {
                stockSymbol,
                quantity: parseFloat(quantity),
                purchasePrice: parseFloat(purchasePrice),
                currentPrice,
                totalValue: currentPrice * parseFloat(quantity),
                totalPurchasePrice:
                  parseFloat(purchasePrice) * parseFloat(quantity),
                profitLoss:
                  currentPrice * parseFloat(quantity) -
                  parseFloat(purchasePrice) * parseFloat(quantity),
              };
              addStock(newStock);
              setError(null);
            } else {
              setError("The stock you've entered cannot be found.");
            }
          })
          .catch((error) => {
            setError("We've encountered an error.");
            console.error(error);
          });
      }
    },
    [stockSymbol, purchasePrice, quantity, addStock]
  ); // clicking button checks if all inputs are filled. calculates amount paid for stock and save these details as current stock

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
          min="0.01"
          name="purchase-price"
          id="purchasePrice"
          placeholder="Purchase Price"
          value={purchasePrice}
          onChange={handlePurchasePriceChange}
        />
        <input
          type="number"
          min="1"
          name="quantity"
          id="quantity"
          placeholder="Quantity"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <button onClick={handleCalculate}>Add stock</button>
      </div>
      <div className="resultsContainer">
        {stocks.length > 0 && (
          <div className="resultsContent">
            {/* results contents should not show if there are no inputs and be kept visible as long as 1 stock has been successfully added*/}
            <StockCalculator error={error} />
          </div>
        )}
      </div>
    </div>
  );
}

export default StockInput;
