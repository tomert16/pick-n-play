import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form } from "semantic-ui-react";
import MeetUpList from '../components/sport/MeetUpsList';
import NavBar from '../components/NavBar';
import { fetchSportById, selectSportById } from '../redux/sports/sportsSlice';
import { addNewMeetUp } from '../redux/meetUps/meetUpsSlice';
import { selectLoggedInPlayer } from '../redux/players/playersSlice';
import Pagination from '../ui/Pagination';
import Loader from '../ui/Loader';
import styled from 'styled-components';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';
import { successfullyCreated, unsuccessfullyCreated } from '../ui/Toastify';


function SportInfo({ setSelectedMeetUp, handleAddTeammate, locations }) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [date, setDate] = useState("");
    const [location, setLocation] = useState();
    const [formToggle, setFormToggle] = useState(false);
    const loggedInPlayer = useSelector(selectLoggedInPlayer);
    const [amountOfMeetUps] = useState(5);
    const [currentSlide, setCurrentSlide] = useState(1);
    const [loading, setLoading] = useState(false);

    // loading function
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    },[])
    
    // fetch individual sport
    const individualSport = useSelector(selectSportById);
    useEffect(() => {
        dispatch(fetchSportById(id));
    },[dispatch, id]);

    const handleFormToggle = () => {
        setFormToggle(true)
    }

    const createMeetUps = async() => {
        const newMeetUp = {
            "date": date,
            "field_id": parseInt(location),
            "sport_id": parseInt(individualSport.id),
            "player_id": parseInt(loggedInPlayer.id)  
        };
        const addNew = await dispatch(addNewMeetUp(newMeetUp))
        await dispatch(fetchSportById(id));
        if (!addNew.error) {
            setFormToggle(false);
            successfullyCreated();
            setDate("");
        } else {
            unsuccessfullyCreated();
        }
    };  
    
    
    
    if (individualSport === undefined){
        return null;
    }
    // Pagination variables and values 
    const indexOfLastCard = currentSlide * amountOfMeetUps;
    const indexOfFirstCard = indexOfLastCard - amountOfMeetUps;
    // Change slides functionalities
    const nextSlide = () => setCurrentSlide(currentSlide + 1);
    const previousSlide = () => setCurrentSlide(currentSlide - 1);
    const end = indexOfLastCard >= individualSport.meet_ups.length;
    const beginning = currentSlide === 1;
    
    
    return (
          <Container>
            <NavBar loggedInPlayer={loggedInPlayer}  locations={locations}/>
            <ToastContainer />
            {loading ? 
             <Loader />
            :
            <div className="bg-image" style={{backgroundImage: `url(${individualSport.bg_img})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover"}}>
                <h1 className="info-title">{individualSport.sport_type}:</h1>
                    <div className="meet-ups-list">
                        {individualSport.meet_ups.slice(indexOfFirstCard, indexOfLastCard).map((meetUp) => 
                            (
                                <MeetUpList 
                                    setSelectedMeetUp={setSelectedMeetUp}
                                    meetUp={meetUp}
                                    key={meetUp.id}
                                    loggedInPlayer={loggedInPlayer}
                                    handleAddTeammate={handleAddTeammate}
                                />
                            )
                        )}
                    </div>
                <div id="pagination">
                    <Pagination 
                        isSport={true}
                        displayNum={true}
                        amount={amountOfMeetUps}
                        next={nextSlide}
                        prev={previousSlide}
                        total={individualSport.meet_ups.length}
                        beginning={beginning}
                        end={end}
                        currentSlide={currentSlide}
                    />
                </div>
            <div className='new-meet-up-container'>
                <button className='learn-more' onClick={handleFormToggle}>
                    <span class="circle" aria-hidden="true">
                    <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">Want To Create Your Own</span>
                </button>
                {formToggle ?
                    <Form className='new-mu-form'>
                        <h3>Create a Meet Up</h3> 
                        <input fluid type="datetime-local" name="date" value={date}  onChange={(e) => setDate(e.target.value)}/>
                        <select key={loggedInPlayer.location.fields.length} onChange={(e) => setLocation(e.target.value)} >
                            <option value="" >Pick your field/court</option>
                            {loggedInPlayer?.location?.fields.map((field) => (
                                <option key={field.id }value={field.id}>{field.field_name}</option>
                            ))}
                        </select>
                        <button 
                            type="button" 
                            value="Create Meet Up" 
                            className="create"
                            onClick={() =>{ createMeetUps() }}
                        >Create</button>
                        <button className="close-form" type='button' onClick={() => setFormToggle(false)}>
                            <AiOutlineCloseCircle />
                        </button>
                    </Form> 
                : null}
                </div>
            </div>}
        </Container>
      );
};

const Container = styled.div`
    .bg-image{
        height: 100vh;
        width: 100vw;
        position: fixed;
        overflow-x: scroll;
    }
    .info-title {
        color: rgb(246, 247, 248);
        text-align: center;
        font-size: 5pc;
        font-family: "Ultra", serif;
        position: relative;
        background-color: transparent;
        text-shadow: 2px 2px 3px rgb(255, 205, 98);
    }
    .meet-ups-list{
        display: flex;
        position: relative;
        bottom: 10%;
        gap: 1rem;
    }
    .new-meet-up-container{
        position: absolute;
        top: 4rem;
        right: 10%;
    }
.new-mu-form{
    display:flex;
    flex-direction: column;
    position: absolute;
    right: 1rem;
    width: 15vw;
    border-style: solid;
    border-width: 20px;
    border-radius: 10px;
    border-color: rgb(8, 7, 7);
    background-color: black;
}
.create {
  margin-bottom: 15px;
  height: 35px;
  padding-left: 12px;
  padding-right: 12px;
  font-family: 'Ultra', serif;
  color: #4d4574;
  background-color: aliceblue;
  border-color: rgb(255, 205, 98);
  border-radius: 40px;
  text-align: center;
  cursor: pointer;
}
.close-form {
    background-color: transparent;
    border: none;
    color: white;
    position: relative;
    top: -14rem;
    left: 50%;
    cursor: pointer;
    svg {
        font-size: 2rem;
    }
}
.new-mu-form > input {
  margin-bottom: 15px;
  height: 25px;
}
.new-mu-form > select {
  margin-bottom: 15px;
  height: 25px;
}
.new-mu-form > h3 {
  color: white;
  font-size: larger;
  font-family: 'Ultra', serif;
  padding-bottom: 20px;
}
`;

export default SportInfo;