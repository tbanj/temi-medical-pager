import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
// import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "react-toastify/dist/ReactToastify.min.css";

// ReactDOM.createRoot(<App />, document.getElementById("root"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </React.StrictMode>
);

// reportWebVitals();
