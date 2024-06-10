import React, { createContext, useState } from "react";

export const StockSymbolContext = createContext();
export const PurchasePriceContext = createContext();
export const QuantityContext = createContext();
export const StockListContext = createContext();

export const StockProvider = ({ children }) => {
  const [stockSymbol, setStockSymbol] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stocks, setStocks] = useState([]);

  const addStock = (newStock) => {
    setStocks((prevStocks) => [newStock, ...prevStocks]);
  };

  return (
    <StockSymbolContext.Provider value={{ stockSymbol, setStockSymbol }}>
      <PurchasePriceContext.Provider
        value={{ purchasePrice, setPurchasePrice }}
      >
        <QuantityContext.Provider value={{ quantity, setQuantity }}>
          <StockListContext.Provider value={{ stocks, addStock }}>
            {children}
          </StockListContext.Provider>
        </QuantityContext.Provider>
      </PurchasePriceContext.Provider>
    </StockSymbolContext.Provider>
  );
};
