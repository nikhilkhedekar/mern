import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import Route from "./components/routes/Route";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import StripeSuccess from "./pages/stripe-success";
import StripeCancel from "./pages/stripe-cancel";
import Account from "./pages/Account";
import Bronz from "./pages/plans/Bronz";
import Silver from "./pages/plans/Silver";
import Platinum from "./pages/plans/Platinum";
import Gold from "./pages/plans/Gold";
import { UserProvider } from "./context";

function App() {
  return (
    <UserProvider>
      <Router>
        <Nav />
        <Toaster
          position="buttom-right"
          toastOptions={{
            duration: 2000,
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stripe/success" element={<StripeSuccess />} />
          <Route path="/stripe/cancel" element={<StripeCancel />} />
          <Route path="/account" element={<Account />} />
          <Route path="/bronz" element={<Bronz />} />
          <Route path="/silver" element={<Silver />} />
          <Route path="/gold" element={<Gold />} />
          <Route path="/platinum" element={<Platinum />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
