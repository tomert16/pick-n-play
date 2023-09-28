import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FieldMeetUpCard from './FieldMeetUpCard'

function FieldMeetUpList({meetUp, loggedInPlayer}) {
  // eslint-disable-next-line 
    const [selectedFieldMeetUp, setSelectedFieldMeetUp] = useState();
    const [showMeetUp, setShowMeetUp] = useState(false);
    const [isFull, setIsFull] = useState(false);

    const handleMeetUpClick = (fMeetUp) => {
        setSelectedFieldMeetUp(fMeetUp)
        setShowMeetUp(true);
    }

    const totalPlayers = meetUp?.teammates?.length + 1
    // determine if a meetUp is full
    const isMeetUpFull = totalPlayers >= meetUp.sport.total_players;

      useEffect(() => {
        if (isMeetUpFull) {
          setIsFull(true);
        } else {
          setIsFull(false);
        }
      }, [isMeetUpFull])
      

    return (
      <Container className='meet-ups-list'>
        <div className={isFull ? 'full' : 'open'} onClick={() => handleMeetUpClick(meetUp)}>
          <img className='mu-field-img' alt={meetUp.sport.type} src={meetUp.sport.image} />
            <div className="mu-info">
              <h4>{meetUp.sport.type}</h4>
              <p> {meetUp.date}</p>
              <p>Host: {meetUp.player.name}</p>
              <p>{`${totalPlayers}/${meetUp.sport.total_players}`}</p>
            </div>
        </div>
        {showMeetUp ? <FieldMeetUpCard 
          meetUp={meetUp} 
          loggedInPlayer={loggedInPlayer}
          setShowMeetUp={setShowMeetUp}
          // fieldMeetUps={fieldMeetUps}
          // setFieldMeetUps={setFieldMeetUps}
          isMeetUpFull={isMeetUpFull}
          totalPlayers={totalPlayers}
          /> : null}
      </Container>
    )
  };

  const Container = styled.div`
    margin-bottom: 2rem;
    .open{
      border-style: solid;
      border-radius: 2pc;
      width: 17vw;
      height: 60vh;
      position: relative;
      left: 30%;
      margin-bottom: 4rem;
      cursor: pointer;
      background-color: white;
      @media (max-width: 768px) {
        height: 120%;
        width: 20vw;
        left: 90%;
      }
    }
    .full {
      border-style: solid;
      border-radius: 2pc;
      width: 16vw;
      height: 60vh;
      position: relative;
      left: 30%;
      margin-bottom: 4rem;
      background-color: white;
      filter: brightness(45%);
      @media (max-width: 768px) {
        height: 120%;
        width: 20vw;
        left: 90%;
      }
    }
    .mu-field-img{
      width: 100%;
      height: 52%;
      position: relative;
      border-top-left-radius: 2pc;
      border-top-right-radius: 2pc;
  }
    .mu-info{
      /* margin-top: 3rem; */
      text-align: center;
    }
  `;

  
  export default React.memo(FieldMeetUpList);