import React, { useState } from "react";
// import style from "./PaymentScreen.module.scss";

import { postRequest } from "../utils/api";

import PaymentForm from "./PaymentForm";
import ListPaymentMethods from "./ListPaymentMethods";

export default function PaymentScreen() {
  // const [selectedMethod, setSelectedMethod] = useState({});
  // const [paymentIntent, setPaymentIntent] = useState(null);
  // const [activeScreen, setActiveScreen] = useState({
  //   prePayment: true,
  //   paymentMethods: false,
  //   paymentForm: false,
  // });

  function handleSelectCard(method) {
    // setSelectedMethod(method);
    // createPaymentIntent(method);
  }

  // function createPaymentIntent(selectedPaymentMethod) {

  //   postRequest(`/payment/create-payment-intent`, {
  //     // paymentMethod: selectedPaymentMethodId,
  //         amount: 1000,
  //     currency: "INR",
  //     customer: selectedPaymentMethod.customer,//"cus_MGdM2aP7mvWKkR",
  //     payment_method_types: ["${selectedPaymentMethod.type}"],
  //   })
  //     .then((resp) => {
  //       setPaymentIntent(resp.data);
  //       setActiveScreen({ paymentForm: false, paymentMethods: true });
  //       changeActiveScreen("paymentForm");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // function changeActiveScreen(screen) {
  //   let toUpdate = { prePayment: false, paymentMethods: false, paymentForm: false };
  //   toUpdate[screen] = true;
  //   setActiveScreen(toUpdate);
  // }

  // function handleClickMakePayment() {
  //   changeActiveScreen("paymentMethods");
  // }

  return (
    <div 
    // className={style.wrapper}
    >
      {/* {activeScreen.prePayment && <button onClick={handleClickMakePayment}>Make Payment</button>} */}

      {/* {activeScreen.paymentMethods &&  */}
      {/* <ListPaymentMethods handleSelectCard={handleSelectCard} /> */}
      {/* } */}

      {/* {activeScreen.paymentForm && paymentIntent && (
        <PaymentForm paymentIntent={paymentIntent} paymentMethod={selectedMethod} />
      )} */}
    </div>
  );
}
