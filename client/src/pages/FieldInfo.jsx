import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import FieldMeetUpList from '../components/field/FieldMeetUpList';
import NavBar from '../components/NavBar';
import { Form } from "semantic-ui-react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchFieldById, isLoadingData, selectFieldById } from '../redux/fields/fieldsSlice';
import { selectLoggedInPlayer } from '../redux/players/playersSlice';
import styled from 'styled-components';
import { addNewMeetUp } from '../redux/meetUps/meetUpsSlice';
import Pagination from '../ui/Pagination';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Loader from '../ui/Loader';
import { ToastContainer } from 'react-toastify';
import { successfullyCreated, unsuccessfullyCreated } from '../ui/Toastify';


function FieldInfo({selectedField, setSelectedField, locations}) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const loggedInPlayer = useSelector(selectLoggedInPlayer)
    const [date, setDate] = useState("");
    const [sportInput, setSportInput] = useState();
    const [formToggle, setFormToggle] = useState(false);
    const [amountOfMeetUps, setAmountOfMeetUps] = useState();
    const [currentSlide, setCurrentSlide] = useState(1);

    // loader functionality
    const loading = useSelector(isLoadingData);
   
    // fetch individual field
    const individualField = useSelector(selectFieldById);
    useEffect(() => {
        dispatch(fetchFieldById(id))
    },[dispatch, id])

    const createMeetUp = async() => {
        const newMeetUp = {
            "date": date,
            "field_id": individualField.id,
            "sport_id": sportInput,
            "player_id": loggedInPlayer.id
        }
        const addNew = await dispatch(addNewMeetUp(newMeetUp))
        await dispatch(fetchFieldById(id));
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

    if (individualField === undefined) return null;
     
    // pagination variables and values
    const indexOfLastCard = currentSlide * amountOfMeetUps;
    const indexOfFirstCard = indexOfLastCard - amountOfMeetUps;
    // // change slides functionalities
    const nextSlide = () => setCurrentSlide(currentSlide + 1);
    const previousSlide = () => setCurrentSlide(currentSlide - 1);
    const end = indexOfLastCard >= individualField.meet_ups.length
    const beginning = currentSlide === 1;
    
    
 
    const handleFormToggle = () => {
        setFormToggle(true)
    }
  return (
    <Container>
        <NavBar 
            locations={locations}
            isInfoPage={true}
            handleFormToggle={handleFormToggle}
        />
        <ToastContainer />
        {loading ? 
            <Loader />
        :
        <>
            <h1 className="field-info-title">{individualField.field_name}:</h1>
            <div className="meet-ups-list">
                {individualField.meet_ups.slice(indexOfFirstCard, indexOfLastCard).map((meetUp) => 
                    (
                        <FieldMeetUpList 
                            meetUp={meetUp}
                            key={meetUp.id}
                            selectedField={selectedField}
                            setSelectedField={setSelectedField}
                            loggedInPlayer={loggedInPlayer}
                        />
                    )
                )}
            </div>
            <div id="pagination">
                <Pagination 
                    displayNum={true}
                    amount={amountOfMeetUps}
                    next={nextSlide}
                    prev={previousSlide}
                    total={individualField.meet_ups.length}
                    beginning={beginning}
                    end={end}
                    currentSlide={currentSlide}
                />
            </div>
            <div className='new-meet-up-container'>
                {formToggle ? <Form className='new-mu-form'>
                    <h3>Create a Meet Up</h3> 
                    <input fluid type="datetime-local" name="date" value={date}onChange={(e) => setDate(e.target.value)}/>
                    <select onChange={(e) => setSportInput(e.target.value)}>
                        <option value="">Pick a Sport</option>
                        {loggedInPlayer.location.sports.map((sport) => (
                            <option key={sport.id} value={sport.id}>{sport.sport_type}</option>
                        ))}
                    </select><br></br>
                    <button 
                        className="create"
                        type="button" 
                        value="Create Meet Up" 
                        onClick={() => {
                            createMeetUp()}}
                    >Create</button>
                    <button className="close-form" type='button' onClick={() => setFormToggle(false)}>
                        <AiOutlineCloseCircle />
                    </button>
                </Form> : null}
            </div>
        </>
        }
    </Container>
  )
}

const Container = styled.div`
    .field-info-title {
        color: rgb(12, 12, 12);
        text-align: center;
        font-size: 4.5vw;
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
        top: 14%;
        left: 99%;
    }
    .new-mu-form{
        display:flex;
        flex-direction: column;
        position: absolute;
        right: 18rem;
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
    #pagination {
       position: relative;
       bottom: 16rem;
       @media (max-width: 768px) {
           width: 80%;
           left: 8%;
           bottom: 10rem;
        }
    }
`;

export default FieldInfo;