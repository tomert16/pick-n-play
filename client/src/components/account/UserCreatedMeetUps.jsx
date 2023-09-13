import { useState } from "react";
import styled from "styled-components";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";

function UserCreatedMeetUps({ loggedInPlayer }) {
  const [amountOfMeetUps] = useState(5);
  const [currentSlide, setCurrentSlide] = useState(1);

  const indexOfLastCard = currentSlide * amountOfMeetUps;
  const indexOfFirstCard = indexOfLastCard - amountOfMeetUps;

  const nextSlide = () => setCurrentSlide(currentSlide + 1);
  const previousSlide = () => setCurrentSlide(currentSlide - 1);
  const end = indexOfLastCard >= loggedInPlayer?.meet_ups?.length;
  const beginning = currentSlide === 1;

  return (
    <Container className='user-created-container'>
    <h3 className='your-created'>Your Created Meet Ups</h3>
    <div className='scroll-created'>{loggedInPlayer?.meet_ups?.slice(indexOfFirstCard, indexOfLastCard).map((meetUp) => (
      <div className="your-meet-ups">
            <h2>{meetUp.sport.sport_type}</h2>
            <p className='mu-date'>{meetUp.date}</p>
            <p>{meetUp.field.name}</p>
            <p>Total Players: {meetUp.teammates.length + 1}</p>
      </div>
    ))}
    </div>
    <div className="pagination">
      <button className='prev-btn'  onClick={() => previousSlide()} disabled={beginning}>
              <BsArrowLeftCircle/>
      </button>
      <button className="next-btn" onClick={() => nextSlide()} disabled={end}>
          <BsArrowRightCircle />
      </button>
      </div>
  </Container>
  )
}

const Container = styled.div`
  .pagination {
    text-align: center;
    .prev-btn {
      background-color: transparent;
      border: none;
      cursor: pointer;
      svg{
        font-size: 1.5rem;
        color: rgb(255, 205, 98);
      }
    }
    .next-btn {
      background-color: transparent;
      border: none;
      text-align: center;
      cursor: pointer;
      svg{
        font-size: 1.5rem;
        color: rgb(255, 205, 98);
      }
    }
  }
`;

export default UserCreatedMeetUps;