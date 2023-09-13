import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import  styled  from 'styled-components';
import SportsList from '../components/sport/SportsList';
import FieldList from '../components/field/FieldList';
import NavBar from '../components/NavBar';
import { selectLocationById, fetchLocationById } from '../redux/locations/locationsSlice';

function Home({ loggedInPlayer }) {
  const [sportFieldToggle, setSportFieldToggle] = useState(true);
  
  const {id} = useParams(); 
  const dispatch = useDispatch();
  //fetch individual state
  const individualLocation = useSelector(selectLocationById);
  useEffect(() => {
    dispatch(fetchLocationById(id));
  },[dispatch, id])

   if (individualLocation === undefined){
     return null;
   }
  

   
  return (
    
    <Container>
      <NavBar loggedInPlayer={loggedInPlayer}  setSportFieldToggle={setSportFieldToggle} isHome={true}/>
      {sportFieldToggle ? <SportsList 
        individualLocation={individualLocation}  
      />
      :
      <FieldList 
        individualLocation={individualLocation}
      />}
    </Container>
  )
};

const Container = styled.div`
  
`;

export default Home;