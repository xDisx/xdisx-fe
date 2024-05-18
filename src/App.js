import React from "react";
import "./App.scss";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <AppRoutes />
        <ToastContainer position="bottom-left" autoClose={3000} />
      </div>
    </AuthProvider>
  );
}

export default App;
