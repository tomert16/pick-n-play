import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function FieldCard({ field }) {
    const [mouseOverImage, setMouseOverImage] = useState(1);
    const [mouseOverInfo, setMouseOverInfo] = useState(0);
    const { field_name, img_url  } = field;
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
        <p style={{opacity: mouseOverInfo}}>{field_name}</p>
        <img 
          className="field-image" 
          src={img_url} alt={field_name} 
          style={{opacity: mouseOverImage}}
          onClick={() => navigate(`/fields/${field.id}`)}  
        />
    </Container>
  )
}

const Container = styled.div`
  justify-content: center;
  border-style: solid;
  border-radius: 3px;
  border-color: transparent;
  text-align: center;
  cursor: pointer;
  p {
    position: relative;
    top: 13rem;
    left: 3rem;
    font-size: 1.5rem;
    font-family:"Ultra", serif;
    font-weight: bolder;
    height: 3rem;
    width: 15vw;
    color: rgb(0, 0, 0);
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

export default FieldCard;