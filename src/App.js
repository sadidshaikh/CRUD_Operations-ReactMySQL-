import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home.js";
import AddEdit from "./pages/AddEdit.js";
import Views from "./pages/Views.js";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route index path="/addContact" element={<AddEdit />} />
          <Route index path="/update/:id" element={<AddEdit />} />
          <Route index path="/view/:id" element={<Views />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
