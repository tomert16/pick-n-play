import { useState } from 'react'
import styled from "styled-components";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs"


function UserJoinedMeetUps({ loggedInPlayer }) {
    const [amountOfMeetUps] = useState(5);
    const [currentSlide, setCurrentSlide] = useState(1);
  
    const indexOfLastCard = currentSlide * amountOfMeetUps;
    const indexOfFirstCard = indexOfLastCard - amountOfMeetUps;
  
    const nextSlide = () => setCurrentSlide(currentSlide + 1);
    const previousSlide = () => setCurrentSlide(currentSlide - 1);
    const end = indexOfLastCard >= loggedInPlayer?.player_meet_ups?.length;
    const beginning = currentSlide === 1;


  return (
    <Container className='user-joined-container'>
        <h3 className='your-joined'>Your Joined Meet Ups</h3>
        <div className='scroll-joined'>{loggedInPlayer?.player_meet_ups?.slice(indexOfFirstCard, indexOfLastCard).map((meetUp) => (
            <div className="your-joined-meet-ups">
                <h2>{meetUp.sport}</h2>
                <p>{meetUp.date}</p>
                <p>{meetUp.field.name}</p>
                <p>Host: {meetUp.host}</p>
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
`
export default UserJoinedMeetUps