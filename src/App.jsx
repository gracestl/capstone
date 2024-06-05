// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./vite.svg";
import React from "react";
import "./App.css";
import "./Components/StockStyling.css";
import StockInput from "./Components/StockInput.jsx";
import { ContextProvider } from "./Components/StockContext.jsx";

function App() {
  return (
    <>
      <ContextProvider>
        <h1>Finance Dashboard</h1>
        <StockInput />
      </ContextProvider>
    </>
  );
}

export default App;
