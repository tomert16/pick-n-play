import React from 'react';
import {useParams} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { joinMeetUp } from '../../redux/meetUps/meetUpsSlice';
import { fetchSportById } from '../../redux/sports/sportsSlice';
import PropTypes from 'prop-types';
import { meetUpDropCanceled, successfullyDropped, successfullyJoined, unsuccessfullyJoined } from '../../ui/Toastify';


function MeetUpCard({ loggedInPlayer, meetUp, setShowMeetUp, isMeetUpFull, totalPlayers }) {
    const {id: sportId} = useParams();
    const dispatch = useDispatch();

   

    // checks if the user has already joined the meet up
    const isJoined = meetUp.teammates.some((teammate) => teammate.id === loggedInPlayer.id)

   
    const handleJoinTeam = async() => {
        const join = {
          "meet_up_id": meetUp.id,
          "player_id": loggedInPlayer.id
        };
        if (loggedInPlayer.id !== meetUp.player.id && !isJoined){
          await dispatch(joinMeetUp(join));
          await dispatch(fetchSportById(sportId));
          successfullyJoined();
        } else {
          unsuccessfullyJoined();
        }
      };

    const handleDropMeetUp = async(id) => {
          let confirmation = window.confirm("Are you sure you want to leave this meet up?");
          if (confirmation === true) {
            await fetch(`/api1/player_meet_ups/${id}`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                "meet_up_id": meetUp.id,
                "player_id": loggedInPlayer.id
              })
            })
            await dispatch(fetchSportById(sportId));
            successfullyDropped();
          } else {
            meetUpDropCanceled();
          }
      }
  

    const handleBackClick = () => {
        setShowMeetUp(false)
    }

  return (
    <Container >
        <Card className="meet-up-card">
          <CardMedia
            sx={{ height: 300 }}
            image={meetUp.field.img_url}
            title="meet-up"
          />
          <CardContent>
            <button className="close" type='button' onClick={() => handleBackClick()}>
              <AiOutlineCloseCircle />
            </button>
            <Typography gutterBottom variant="h5" component="div">
            {meetUp.field.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {meetUp.date}<br></br>
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Total Players: {totalPlayers}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <li>{meetUp.player.name}</li>
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {meetUp.teammates.map((player) => (<li className="teammates">{player.name}</li>))}
            </Typography>
          </CardContent>
          <CardActions>
            {!isMeetUpFull ? <Button size="small" onClick={() => handleJoinTeam()}>Join</Button>
              :
              <p>Full</p>}
            <Button size="small" onClick={() => handleDropMeetUp()}>Leave</Button>
          </CardActions>
        </Card>
    </Container>
  )
};

MeetUpCard.propTypes = {
  loggedInPlayer: PropTypes.object.isRequired,
  meetUp: PropTypes.object.isRequired,
  totalPlayers: PropTypes.number.isRequired,
  isMeetUpFull: PropTypes.bool.isRequired,
  setShowMeetUp: PropTypes.func.isRequired
};

const Container = styled.div`
    border-style: solid;
    border-radius: 3px;
    border-color: black;
    position: relative;
    background: rgba(0,0,0,.5);
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 1000;
    overflow-x: scroll;
    text-align: center;
  .meet-up-card{
    background-color: white;
    border-style: solid;
    border-radius: 10px;
    justify-content: center;
    position: absolute;
    left: 35%;
    top: 15%;
    height: max-content;
    width: 30%;
  }
  .close {
    border: none;
    background-color: transparent;
    position: relative;
    top: -1rem;
    left: 48%;
    z-index: 1;
    cursor: pointer;
    svg {
      font-size: 2rem;
      color: #000000;
    }
  }
  .error-message {
    color: red
  }
`;

export default React.memo(MeetUpCard);