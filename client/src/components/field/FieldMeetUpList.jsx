import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FieldMeetUpCard from './FieldMeetUpCard'

function FieldMeetUpList({meetUp, loggedInPlayer, handleAddTeammate, fieldMeetUps, setFieldMeetUps}) {
  // eslint-disable-next-line 
    const [selectedFieldMeetUp, setSelectedFieldMeetUp] = useState();
    const [showMeetUp, setShowMeetUp] = useState(false);
    const [isFull, setIsFull] = useState(false);

    const goToMeetUp = (fMeetUp) => {
        setSelectedFieldMeetUp(fMeetUp)
        setShowMeetUp(true);
    }

    const totalPlayers = meetUp?.teammates?.length + 1
    const playersNumber = () => {
        if (meetUp.sport.type === "Soccer") {
          return (totalPlayers + '/14')
        } if 
          (meetUp.sport.type === "Basketball") {
            return (totalPlayers + '/10')
        } if 
        (meetUp.sport.type === "Tennis") {
          return (totalPlayers + '/4')
      } if 
      (meetUp.sport.type === "Football") {
        return (totalPlayers + '/10')
      } if 
      (meetUp.sport.type === "Volleyball") {
        return (totalPlayers + '/10')
      }
    }
    // determine if a meetUp is full
    const isMeetUpFull = 
      (meetUp?.sport.type === 'Soccer' && totalPlayers >= 14) ||
      (meetUp?.sport.type === 'Basketball' && totalPlayers >= 10) ||
      (meetUp?.sport.type === 'Tennis' && totalPlayers >= 4) ||
      (meetUp?.sport.type === 'Football' && totalPlayers >= 10) ||
      (meetUp?.sport.type === 'Volleyball' && totalPlayers >= 10);

      useEffect(() => {
        if (isMeetUpFull) {
          setIsFull(true);
        } else {
          setIsFull(false);
        }
      }, [isMeetUpFull])
      

    return (
      <Container className='meet-ups-list'>
        <div className={isFull ? 'full' : 'open'} onClick={() => goToMeetUp(meetUp)}>
          <div>
          <img className='mu-field-img' alt={meetUp.sport.type} src={meetUp.sport.image} />
            <div className="mu-info">
              <h4>{meetUp.sport.type}</h4>
              <p> {meetUp.date}</p>
              <p>Host: {meetUp.player.name}</p>
              <p>{playersNumber()}</p>
            </div>
          </div>
        </div>
        {showMeetUp ? <FieldMeetUpCard 
          meetUp={meetUp} 
          loggedInPlayer={loggedInPlayer}
          setShowMeetUp={setShowMeetUp}
          handleAddTeammate={handleAddTeammate}
          fieldMeetUps={fieldMeetUps}
          setFieldMeetUps={setFieldMeetUps}
          isMeetUpFull={isMeetUpFull}
          totalPlayers={totalPlayers}
          /> : null
      }
      </Container>
    )
  };

  const Container = styled.div`
    margin-bottom: 2rem;
    .open{
      border-style: solid;
      border-radius: 2pc;
      width: 16vw;
      height: 90%;
      position: relative;
      left: 35%;
      margin-bottom: 4rem;
      cursor: pointer;
      background-color: white;
    }
    .full {
      border-style: solid;
      border-radius: 2pc;
      width: 16vw;
      height: 90%;
      position: relative;
      left: 35%;
      margin-bottom: 4rem;
      background-color: white;
      filter: brightness(45%)
    }
    .mu-field-img{
      width: 100%;
      height: 13pc;
      position: relative;
      border-top-left-radius: 2pc;
      border-top-right-radius: 2pc;

    }
    .mu-info{
      margin-top: 3rem;
      text-align: center;
    }
  `;

  
  export default React.memo(FieldMeetUpList);