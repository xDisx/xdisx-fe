import React from "react";
import "./App.scss";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app">
      <AppRoutes />
      <ToastContainer position="bottom-left" autoClose={3000} />
    </div>
  );
}

export default App;
