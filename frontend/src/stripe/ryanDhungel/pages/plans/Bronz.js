import React, { Fragment, useEffect, useContext } from "react";
import { UserContext } from "../../context/index";
import { useNavigate, useLocation } from "react-router-dom";

const Bronz = ({ match }) => {
  const {state, setState} = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let result = [];
    const check = () =>
      state?.user?.subscriptions.map((sub) => {
        result.push(sub.plan.nickname.toLowerCase());  
      });
      setTimeout(() => {
        check();
      },1000);

    const pathname = location.pathname.slice(1);
    setTimeout(() => {
      if (!result.includes(pathname)) {
        navigate("/");
      }
    }, 1000)
  }, [state && state.user]);

  return (
    <Fragment>
      <div>
        <div>
          <h1>Bronz</h1>
          <p>Here are your 5 exclusive books of this month</p>
        </div>
      </div>

      <div >
        <div>
          <div>
            <ul>
              <li>Lord of Rings</li>
              <li>Game of Thrones</li>
              <li>Star Wars</li>
              <li>Harry Potter</li>
              <li>Alladin</li>
            </ul>
          </div>

          <div>
            <h4>Market analysis</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium ratione pariatur ab unde voluptatem ea, quae veniam
              aperiam sint porro aliquid animi eveniet, culpa id reiciendis vel
              nihil veritatis qui.
            </p>
            <h4>Email support</h4>
            <p>subscriptions@domain.com</p>
            <h4>Help center</h4>
            1300 123 456
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Bronz;
