import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  StockSymbolContext,
  PurchasePriceContext,
  QuantityContext,
  StockListContext,
} from "./StockContext.jsx";
import "./StockStyling.css";

function StockCalculator(props) {
  const { stocks } = useContext(StockListContext);
  return (
    <div className="resultContent">
      <h2>Stock List</h2>
      {props.error && <p>Sorry! {props.error} Please try again.</p>}
      <div className="stocksContainer">
        {stocks.map(
          (stock, index) =>
            stock.stockSymbol &&
            stock.quantity !== undefined &&
            stock.purchasePrice !== undefined &&
            stock.currentPrice !== undefined &&
            stock.totalValue !== undefined &&
            stock.profitLoss !== undefined && (
              <div key={index} className="stockItem">
                <p><b>Symbol:</b> {stock.stockSymbol}</p>
                <p><b>Quantity:</b> {stock.quantity}</p>
                <p><b>Purchase Price:</b> {stock.purchasePrice}</p>
                <p><b>Current Price:</b> {stock.currentPrice}</p>
                <p><b>Total Value:</b> {stock.totalValue.toFixed(2)}</p>
                <p className={stock.profitLoss >= 0 ? "profit" : "loss"}>
                <b>Profit/Loss:</b>{" "}{stock.profitLoss >= 0? 
                `+${stock.profitLoss.toFixed(2)}`: stock.profitLoss.toFixed(2)}
                </p>
                {index < stocks.length - 1 && <hr />}{" "}
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default StockCalculator;
