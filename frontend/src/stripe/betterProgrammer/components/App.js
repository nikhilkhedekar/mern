import axios from "axios";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PaymentScreen from "./PaymentScreen";
// import AddPayMethod from "./AddPayMethod";
import Register from "./Register";
import StripeWrapper from "./StripeWrapper";

function App() {
  useEffect(() => {
    const resp = axios.get("http://localhost:8080");
    console.log("resp", resp);
  }, []);
  return (
    <StripeWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          {/* <Route path="/add-payment-method" element={<AddPayMethod />} /> */}
          <Route path="/make-payment" element={<PaymentScreen />} />
        </Routes>
      </BrowserRouter>
    </StripeWrapper>
  );
}

export default App;
