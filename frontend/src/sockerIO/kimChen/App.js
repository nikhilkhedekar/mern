import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import Chat from './components/chat/Chat';
import Home from './components/home/Home';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {

    const verifyUser = async () => {

      try {
        const res = await fetch('http://localhost:8080/verifyuser', {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        setUser(data);
        console.log("signedInUser", user);
      } catch (error) {
        console.log(error)
      }

    }
    verifyUser()

  }, []);

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:room_id/:room_name" element={<Chat />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
