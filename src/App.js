import React from "react";
import "./App.css";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="App" style={{ paddingTop: "56px" }}>
      <header className="App-header">
        <AppRoutes />
      </header>
    </div>
  );
}

export default App;
