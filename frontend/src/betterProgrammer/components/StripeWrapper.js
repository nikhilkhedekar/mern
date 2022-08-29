import React from "react";

import config from "../utils/config.json";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(config.stripePublishableKey);

export default function Stripe(props) {
  const options = {
    clientSecret: props.client_secret,
  };
  console.log("clientSecret", options)

  return (
    <Elements stripe={stripePromise} options={options}>
      {props.children}
    </Elements>
  );
}
