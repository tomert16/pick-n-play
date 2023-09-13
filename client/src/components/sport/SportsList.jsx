import styled from 'styled-components';

import SportCard from './SportCard';

function SportsList({  handleSelectedSport, individualLocation }) {

      
  return (
      <Container>
        <h1 className='home-prompt'>Pick A Sport</h1>
        <div className='sports-list' >
        { individualLocation.sports.map((sport) => (
            <SportCard 
                key={sport.id} 
                sport={sport} 
                handleSelectedSport={handleSelectedSport}
            />
      ))}
        </div>
      </Container>
  )
}

const Container = styled.div`
  .sports-list { 
    display: flex; 
    flex-wrap: wrap;
    margin-top: -8rem;
    justify-content: center;
    gap: 1.5rem;
    width: 100vw;
 } 
 .home-prompt {
  font-size: 4.5rem;
  color: rgb(12, 12, 12);
  text-align: center;
  font-family: "Ultra", serif;
  background-color: transparent;
  text-shadow: 2px 2px 3px rgb(255, 205, 98);
}
`;

export default SportsList