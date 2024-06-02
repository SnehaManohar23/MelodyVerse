import React from "react";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import Listings from "./pages/Listings";
import CreateListing from "./pages/CreateListing";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route exact path="/" element={<Listings />} />
        <Route exact path="/create-listing" element={<CreateListing />} />
      </Routes>
    </BrowserRouter>
  );
}
