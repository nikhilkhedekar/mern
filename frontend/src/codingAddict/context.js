import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import url from './utils/url';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const saveUser = (user) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/users/showMe`, {
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJzYXBuYSIsInVzZXJJZCI6IjYyZmIyN2RlMjY0YzAyMGYxOWU5Y2RhYyIsInJvbGUiOiJ1c2VyIn0sImlhdCI6MTY2MDYyODc3OX0.QznY5HvdlRaTCTUU6Ndn9OEFyz8Im3-vIWFfH5TtYgY"
        }
      });
      saveUser(data.user);
    } catch (error) {
      removeUser();
    }
    setIsLoading(false);
  };

  const logoutUser = async () => {
    try {
      await axios.delete('http://localhost:8080/api/v1/auth/logout',  {
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJzYXBuYSIsInVzZXJJZCI6IjYyZmIyN2RlMjY0YzAyMGYxOWU5Y2RhYyIsInJvbGUiOiJ1c2VyIn0sImlhdCI6MTY2MDYyODc3OX0.QznY5HvdlRaTCTUU6Ndn9OEFyz8Im3-vIWFfH5TtYgY"
        }
      });
      removeUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        saveUser,
        user,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
