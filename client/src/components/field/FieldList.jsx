import styled from 'styled-components';
import FieldCard from './FieldCard';


function FieldList({ individualLocation}) {
  
  return (
      <Container>
        <h1 className='home-prompt'>Pick A Field</h1>
        <div className='fields-list'>
        {individualLocation.fields.map((field) => (
            <FieldCard 
                key={field.id}
                field={field}
            />
        ))}
        </div>
      </Container>
  )
}

const Container = styled.div`
  .fields-list {
    display: flex;
    flex-wrap: wrap; 
    margin-top: -6rem;
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

export default FieldList;