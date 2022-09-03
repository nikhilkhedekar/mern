import React, { useContext } from "react";
import { UserContext } from "../../context/index";

const PriceCard = ({ price, handleSubscription, userSubscriptions }) => {
  const {state, setState} = useContext(UserContext);

  const dynamicDescription = () => {
    if (price.nickname === "Silver") {
      return "10 exclusice books";
    } else if (price.nickname === "Golden") {
      return "20 exclusice books";
    } else if (price.nickname === "Platinum") {
      return "30 exclusice books";
    }else {
      return "5 exclusice books"
    }
  };

  const buttonText = () => {
    console.log('usertoken', state?.token);
    return state?.token ? "Buy the plan" : "Sign up";
  };

  return (
    <div className="col">
      <div >
        <div >
          <h4 >{price.nickname}</h4>
        </div>

        <div >
          <h1 >
            {(price.unit_amount / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}{" "}
            <small >/mo</small>
          </h1>
          <ul >
            <li >{dynamicDescription()}</li>
            <li>Free market analysis</li>
            <li>Email support</li>
            <li>Help center access</li>
          </ul>

          {/* <pre>{JSON.stringify(price, null, 4)}</pre> */}

          {/* <Link to="/register"> */}
          <button
            onClick={(e) => handleSubscription(e, price)}           
          >
            {userSubscriptions && userSubscriptions.includes(price.id)
              ? "Access plan"
              : buttonText()}
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
