import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form } from "semantic-ui-react";
import MeetUpList from '../components/sport/MeetUpsList';
import NavBar from '../components/NavBar';
import { fetchSportById, isLoadingData, selectSportById } from '../redux/sports/sportsSlice';
import { addNewMeetUp } from '../redux/meetUps/meetUpsSlice';
import { selectLoggedInPlayer } from '../redux/players/playersSlice';
import Pagination from '../ui/Pagination';
import Loader from '../ui/Loader';
import styled from 'styled-components';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';
import { successfullyCreated, unsuccessfullyCreated } from '../ui/Toastify';


function SportInfo({ setSelectedMeetUp, locations }) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const loggedInPlayer = useSelector(selectLoggedInPlayer);
    const [date, setDate] = useState("");
    const [location, setLocation] = useState();
    const [formToggle, setFormToggle] = useState(false);
    const [amountOfMeetUps, setAmountOfMeetUps] = useState();
    const [currentSlide, setCurrentSlide] = useState(1);
    // loading function
    const loading = useSelector(isLoadingData);
    
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
    
    // display amount of meet ups based on screen size
    useEffect(() => {
        if (window.innerWidth >= 768) {
            setAmountOfMeetUps(5)
        } else {
            setAmountOfMeetUps(3)
        }
    }, [amountOfMeetUps])
    
    
    if (individualSport === undefined) return null;
    

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
            <NavBar 
                loggedInPlayer={loggedInPlayer}  
                locations={locations} 
                handleFormToggle={handleFormToggle}
                isInfoPage={true}
            />
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
                                    individualSport={individualSport}
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
                    </Form> : null}
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
        font-size: 5vw;
        font-family: "Ultra", serif;
        position: relative;
        background-color: transparent;
        text-shadow: 2px 2px 3px rgb(255, 205, 98);
    }
    .meet-ups-list{
        display: flex;
        position: relative;
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
        right: 10rem;
        top: -5rem;
        width: 15vw;
        border-style: solid;
        border-width: 20px;
        border-radius: 10px;
        border-color: #535353;
        background-color: #535353;
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
    #pagination {
        position: relative;
        bottom: 15rem;
        @media (max-width: 768px) {
           width: 80%;
           left: 8%;
           bottom: 20%;
        }
    }
`;

export default SportInfo;