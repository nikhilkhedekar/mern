import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Home,
  Error,
  Register,
  Login,
  Verify,
  Dashboard,
  ProtectedRoute,
  ForgotPassword,
  ResetPassword,
} from './pages/index';
import Navbar from './components/Navbar';
import { useContext } from 'react';
import { AppContext } from './context'

function App() {
  const useGlobalContext = useContext(AppContext)
  if (useGlobalContext.isLoading) {
    return (
      <section className='page page-center'>
        <div className='loading'></div>
      </section>
    );
  }
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />          
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/user/verify-email' element={<Verify />} />
          <Route path='/user/reset-password' element={<ResetPassword />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
