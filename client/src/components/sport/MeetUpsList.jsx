import MeetUpCard from "./MeetUpCard";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';




function MeetUpsList({ meetUp, setSelectedMeetUp, loggedInPlayer }) {
  const [showMeetUp, setShowMeetUp] = useState(false);
  const [isFull, setIsFull] = useState(false);


  const handleMeetUpClick = (meetUp) => {
    setSelectedMeetUp(meetUp)
  setShowMeetUp(true)
}

  // determine the total number of players
  const totalPlayers = meetUp.teammates.length + 1;
  const playersNumber = () => {
    if (meetUp.sport.sport_type === "Soccer") {
      return (totalPlayers + '/14')
    } if 
      (meetUp.sport.sport_type === "Basketball") {
        return (totalPlayers + '/10')
    } if 
    (meetUp.sport.sport_type === "Tennis") {
      return (totalPlayers + '/4')
    } if 
    (meetUp.sport.sport_type === "Football") {
      return (totalPlayers + '/10')
    } if 
    (meetUp.sport.sport_type === "Volleyball") {
      return (totalPlayers + '/10')
    }
  }

  
// determine if a meetUp is full
  const isMeetUpFull = 
      (meetUp.sport.sport_type === 'Soccer' && totalPlayers >= 14) ||
      (meetUp.sport.sport_type === 'Basketball' && totalPlayers >= 10) ||
      (meetUp.sport.sport_type === 'Tennis' && totalPlayers >= 4) ||
      (meetUp.sport.sport_type === 'Football' && totalPlayers >= 10) ||
      (meetUp.sport.sport_type === 'Volleyball' && totalPlayers >= 10);
      

  useEffect(() => {
    if (isMeetUpFull) {
      setIsFull(true);
    } else {
      setIsFull(false);
    }
  }, [isMeetUpFull])


  return (
    <Container className="meet-ups-list">
        <div className={isFull ? `full` : `open`} onClick={() => handleMeetUpClick(meetUp)}>
          <img className="mu-field-img" alt={meetUp?.field.name} src={meetUp?.field.img_url} />
          <div className="mu-info">
            <h4>{meetUp.field.name}</h4>
            <p>{meetUp.date}</p>
            <p>Host: {meetUp.player.name}</p>
            <p>{playersNumber()}</p>
          </div>
        </div>
        {showMeetUp ? <MeetUpCard 
        meetUp={meetUp} 
        loggedInPlayer={loggedInPlayer}
        setShowMeetUp={setShowMeetUp}
        isMeetUpFull={isMeetUpFull}
        totalPlayers={totalPlayers}
        /> : null}
        
    </Container>
  )
}

MeetUpsList.propTypes = {
  meetUp: PropTypes.object.isRequired,
}

const Container = styled.div`
  margin-bottom: 5rem;
  .open{
    border-style: solid;
    border-radius: 2pc;
    width: 16vw;
    height: 90%;
    position: relative;
    left: 36%;
    top: 2rem;
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
    left: 36%;
    top: 2rem;
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


export default React.memo(MeetUpsList);