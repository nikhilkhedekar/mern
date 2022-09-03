import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/index";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const {state,setState} = useContext(UserContext);
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getSubscriptions = async () => {
      const { data } = await axios.get("/api/subscriptions");
      console.log("subs => ", data);
      setSubscriptions(data.data);
    };

    if (state?.token) getSubscriptions();
  }, [state?.token]);

  const manageSubscriptions = async () => {
    const { data } = await axios.get("/api/customer-portal");
    window.open(data);
  };

  return (
    <div>
      <div>
        <h1>Account</h1>
        <p>Subscription status</p>
        {/* <pre>{JSON.stringify(subscriptions, null, 4)}</pre> */}
      </div>

      <div>
        {
          subscriptions?.map((sub) => (
            <div key={sub.id}>
              <section>
                <hr />
                <h4>{sub.plan.nickname}</h4>
                <h5>
                  {(sub.plan.amount / 100).toLocaleString("en-US", {
                    style: "currency",
                    currency: sub.plan.currency,
                  })}
                </h5>
                <p>Status: {sub.status}</p>
                <p>
                  Card last 4 digit: {sub.default_payment_method.card.last4}
                </p>
                <p>
                  Current period end:{" "}
                  {moment(sub.current_period_end * 1000)
                    .format("dddd, MMMM Do YYYY h:mm:ss a")
                    .toString()}
                </p>
                <button
                  onClick={() =>
                    navigate(`/${sub.plan.nickname.toLowerCase()}`)
                  }                
                >
                  Access
                </button>{" "}
                <button
                  onClick={manageSubscriptions}                 
                >
                  Manage Subscription
                </button>
              </section>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Account;
