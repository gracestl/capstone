import { useEffect, useState, useCallback, useContext } from "react";
import "./StockStyling.css";
import {
  StockSymbolContext,
  PurchasePriceContext,
  QuantityContext,
} from "./StockContext.jsx";
// import context const from file

function StockCalculator() {
  const { stockSymbol } = useContext(StockSymbolContext);
  const { purchasePrice } = useContext(PurchasePriceContext);
  const { quantity } = useContext(QuantityContext);
  const [totalPurchasePrice, setTotalPurchasePrice] = useState(0);
  const [marketRate, setMarketRate] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [error, setError] = useState(null);

  const getStockData = useCallback(() => {
    if (stockSymbol && quantity && purchasePrice) {
      fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=ZL9W7LIEZX9WETLG`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data["Global Quote"] && data["Global Quote"]["05. price"]) {
            const currentPrice = parseFloat(data["Global Quote"]["05. price"]);
            setMarketRate(currentPrice);
            setError(null); // clear an earlier error
          } else {
            setError("The stock you've entered cannot be found."); // error message for wrong stock symbol
          }
        })
        .catch((error) => {
          setError("We've encountered an error."); // error message for fetching errors
          console.error(error);
        });
    }
  }, [stockSymbol]);
  // event handler to detect changes to stock symbol, purchasePrice and quantity. Once there are changes, if statement will check if stockSymbol, purchasePrice or quantity are defined/true before fetching market value of stock.

  // if data is successfully fetch, calculate the market value of the stock based on the current price and entered quantity.
  // if the stock symbol is not found, set an error message.

  useEffect(() => {
    getStockData();
    console.log("Update stock data");
  }, [getStockData]);

  useEffect(() => {
    if (marketRate && quantity && purchasePrice) {
      const totalValue = marketRate * quantity;
      const paidAmount = parseFloat(purchasePrice) * quantity;
      setTotalValue(totalValue);
      setTotalPurchasePrice(paidAmount);
    }
  }, [marketRate, purchasePrice, quantity]);

  // event handler to detect changes to marketRate, purchasePrice and quantity. Once there are changes, if statement will check if these values are defined to calculate the total price based on market and entry by user.

  const difference = totalValue - totalPurchasePrice;
  const differenceResult = difference >= 0 ? "profit" : "loss";
  // if difference is > or = to 0, return profit. Else, return loss.
  const differenceDisplay =
    difference >= 0 ? `+${difference.toFixed(2)}` : difference.toFixed(2);


  return (
    <div className="resultContent">
      <h2>Stock List</h2>
      {error ? (
        <p>Sorry! {error} Please try again.</p>
      ) : (
        <>
          <p>
            <b>Symbol: {stockSymbol}</b>
          </p>
          <p>Quantity: {quantity}</p>
          <p>Purchase Price: {totalPurchasePrice}</p>
          <p>Current Price: {totalValue.toFixed(2)}</p>
          <p className={differenceResult}>Profit/Loss: {differenceDisplay}</p>
        </>
      )}
    </div>
  );
}

export default StockCalculator;
