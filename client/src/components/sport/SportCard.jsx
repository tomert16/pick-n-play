import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function SportCard({ sport }) {
    const {sport_type, img_url} = sport;
    const [mouseOverImage, setMouseOverImage] = useState(1);
    const [mouseOverInfo, setMouseOverInfo] = useState(0);
    const navigate = useNavigate();


  return (
      <Container 
        onMouseOver={()=>{
          setMouseOverImage(.3);
          setMouseOverInfo(1);
        }}
        onMouseLeave={()=>{
          setMouseOverImage(1);
          setMouseOverInfo(0);
        }} 
      >
          <p style={{opacity: mouseOverInfo}}>{sport_type}</p>
            <img className="sport-image" 
              src={img_url} 
              alt={sport_type} 
              style={{opacity: mouseOverImage}}
              onClick={() =>{ 
                navigate(`/sports/${sport.id}`)
              }}
            />
      </Container>
  )
}

const Container = styled.div`
  height: 90%;
  border-style: solid;
  border-radius: 3px;
  border-color: transparent;
  text-align: center; 
  cursor: pointer;
  p {
    position: relative;
    top: 15rem;
    font-size: 1.5rem;
    font-family:"Ultra", serif;
    height: 3em;
    color: rgb(0, 0, 0);
    font-weight: bolder;
  }
  img {
    height: 18rem;
    width: 20rem;
    border-style: solid;
    border-radius: .5rem;
    border-color: rgb(255, 205, 98);
    background-color: transparent;
  }
`;



export default SportCard;