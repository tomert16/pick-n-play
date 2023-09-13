import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import pnplogo from '../assets/pnplogo.png';

function Header(props) {
    const navigate = useNavigate();

  return (
    <Container className="flex a-center j-between">
        <div className="logo" onClick={() => navigate('/')}>
            <img src={pnplogo} alt="logo" />
        </div>
       {props.isAdmin ? null : props.login ? 
            <button onClick={() => navigate('/login')}>Login</button> 
            : 
            <button onClick={() => navigate('/signup')}>Sign Up</button>
     }
    </Container>
  )
}

const Container = styled.div`
    background-color: white;   
    padding: 0 4rem;
    .logo {
        img {
            height: 5rem;
        }
    }
    button {
        padding: 0.5rem 1rem;
        background-color: #724f72;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
        height: fit-content;
    }
`;

export default Header;