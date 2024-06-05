import React, { useContext, useState } from "react";

export const StockSymbolContext = React.createContext();
export const PurchasePriceContext = React.createContext();
export const QuantityContext = React.createContext();

export function useStockSymbol() {
  return useContext(StockSymbolContext);
}

export function usePurchasePrice() {
  return useContext(PurchasePriceContext);
}

export function useQuantity() {
  return useContext(QuantityContext);
}

export function ContextProvider({ children }) {
  const [stockSymbol, setStockSymbol] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [quantity, setQuantity] = useState("");

  return (
    <StockSymbolContext.Provider value={{stockSymbol, setStockSymbol}}>
      <PurchasePriceContext.Provider value={{purchasePrice, setPurchasePrice}}>
        <QuantityContext.Provider value={{quantity, setQuantity}}>
          {children}
        </QuantityContext.Provider>
      </PurchasePriceContext.Provider>
    </StockSymbolContext.Provider>
  )
}
