// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./vite.svg";
import React from "react";
import "./App.css";
import "./Components/StockStyling.css";
import StockInput from "./Components/StockInput.jsx";
import { StockProvider } from "./Components/StockContext.jsx"; // Ensure this is correctly imported

function App() {
  return (
    <StockProvider>
      <h1>Finance Dashboard</h1>
      <StockInput />
    </StockProvider>
  );
}

export default App;
