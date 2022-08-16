import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import main from '../assets/main.svg';
import { AppContext } from '../context';

function Dashboard() {
  const useGlobalContext = useContext(AppContext);
  const { name, userId, role } = useGlobalContext.user;
  return (
    <>
      <Wrapper className='page'>
        <h2>Hello there, {name}</h2>
        <p>
          Your ID : <span>{userId}</span>
        </p>
        <p>
          Your Role : <span>{role}</span>
        </p>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  p span {
    background: var(--primary-500);
    padding: 0.15rem 0.25rem;
    color: var(--white);
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
  }
`;

export default Dashboard;
