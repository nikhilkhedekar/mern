import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import PriceCard from "../components/cards/PriceCard";
import { UserContext } from "../context/index";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { state, setState } = useContext(UserContext);
  const [prices, setPrices] = useState([]);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrices();
  }, []);

  useEffect(() => {

    let result = [];
    const check = () =>
      state?.user?.subscriptions?.map((sub) => {
        result.push(sub.plan.id);
      });
    check();
    setUserSubscriptions(result);
  }, [state && state.user]);

  useEffect(() => {
    const isPaused = () => {
      state?.user?.subscriptions?.resumes_at &&
        navigate("/account");
    };

    state && state.user && isPaused();
  }, [state && state.user]);

  const fetchPrices = async () => {
    const { data } = await axios.get("/api/prices");
    console.log("prices get request", data);
    setPrices(data);
  };

  const handleClick = async (e, price) => {
    e.preventDefault();
    let url;
    if (userSubscriptions && userSubscriptions.includes(price.id)) {
      navigate(`/${price.nickname.toLowerCase()}`);
      return;
    }
    console.log("event", e);
    console.log("plan clicked", price.id);
    if (state && state.token) {
      const {data} = await axios.post("/api/create-subscription", {
        priceId: price.id,
      })
      window.open(data.url);
    } else {
      navigate("/register");
    }
  };

  return (
    <div >
      <div >
        <h1 >
          Explore the right plan for your business
        </h1>
        <p >Choose a plan that suites you best!</p>
      </div>

      <div >
        {prices &&
          prices.map((price) => (
            <PriceCard
              key={price.id}
              price={price}
              handleSubscription={handleClick}
              userSubscriptions={userSubscriptions}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
