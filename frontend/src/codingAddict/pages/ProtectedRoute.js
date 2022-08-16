import React from 'react';
import { Route, Navigate } from 'react-router-dom';
// import { useUserContext } from '../context/user_context'
import { useContext } from 'react';
import { AppContext } from '../context';

const PrivateRoute = ({ children, ...rest }) => {
  const useGlobalContext = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={() => {
        return useGlobalContext.user ? children : <Navigate to='/'></Navigate>;
      }}
    ></Route>
  );
};
export default PrivateRoute;
