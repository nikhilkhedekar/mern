import React, { useContext } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { AppContext } from '../context';

const Navbar = () => {
  const useGlobalContext = useContext(AppContext);
  return (
    <Wrapper>
      <div className='nav-center'>
        <Link to='/' className='home-link'>
          <img src={logo} alt='jobs app' className='logo' />
        </Link>
        {useGlobalContext.user && (
          <div className='nav-links'>
            <p>hello, {useGlobalContext.user.name}</p>
            <button
              className='btn btn-small'
              onClick={() => {
                useGlobalContext.logoutUser();
              }}
            >
                <Link to='/' className='home-link'>logout</Link>              
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  background: var(--white);
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-center {
    width: var(--fluid-width);
    max-width: var(--max-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .nav-links {
    display: flex;
    flex-direction: column;
  }
  .nav-links p {
    margin: 0;
    text-transform: capitalize;
    margin-bottom: 0.25rem;
  }
  .home-link {
    display: flex;
    align-items: flex-end;
  }
  @media (min-width: 776px) {
    .nav-links {
      flex-direction: row;
      align-items: center;
    }
    .nav-links p {
      margin: 0;
      margin-right: 1.5rem;
    }
  } ;
`;

export default Navbar;
