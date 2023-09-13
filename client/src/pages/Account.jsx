import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../components/NavBar';
import UserCreatedMeetUps from '../components/account/UserCreatedMeetUps';
import UserJoinedMeetUps from '../components/account/UserJoinedMeetUps';
import { fetchAllLocations, selectAllLocations } from '../redux/locations/locationsSlice';
import { selectLoggedInPlayer, updateLocation } from '../redux/players/playersSlice';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Account() {
  const dispatch = useDispatch();
  const loggedInPlayer = useSelector(selectLoggedInPlayer) || {};
  const [location, setLocation] = useState({});
  const [displaySelect, setDisplaySelect] = useState(false);

  const notify = () => {
    toast.success('Location Updated🌎', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const locations = useSelector(selectAllLocations);
  useEffect(() => {
    dispatch(fetchAllLocations())
  },[dispatch])

  if (locations === undefined) return null;

  const changeLocation = () => {
    const id = loggedInPlayer.id;
    const parsedLocation = JSON.parse(location);
    dispatch(updateLocation({location: parsedLocation, id}));
    window.location.reload();
    notify();
  }

  const handleDisplay = () => {
    setDisplaySelect(!displaySelect);
  }



  return (
    <Container className="account-info-page">
      <div className='header-div'>
        <NavBar locations={locations}/>
      </div>
      <ToastContainer />
       <div className="user-info-container">
          <h1 className="user-info-name">Profile Info</h1>
          <div className="details-container">
            <div className='user-info-details'>
              <h2 className="user-info-title">Name: </h2> 
              <p className="user-info-detail">{`${loggedInPlayer?.first_name} ${loggedInPlayer?.last_name}`}</p>
              <h2 className="user-info-title">Email:  </h2>
              <p className="user-info-detail">{loggedInPlayer?.email}</p>
              <h2 className="user-info-title">Password:  </h2>
              <p className="user-info-detail">{loggedInPlayer?.password} ************</p>
              <h2 className="user-info-title">Current Location:</h2>
              <p className="user-info-detail">{loggedInPlayer?.location?.state}</p>
              <button class="Btn" onClick={() => handleDisplay()}>Update Location 
                <svg class="svg" viewBox="0 0 512 512">
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
              </button>
            {displaySelect ? 
              <div className="update-location"> 
                <select onChange={(e) => setLocation(e.target.value)}>
                    <option value="">Select Location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={JSON.stringify(location)}>{location.state}</option>
                    ))}
                  </select>
                  <button onClick={() => changeLocation(location)}>Submit</button>
              </div> 
              :
              null}
          </div>
          <UserCreatedMeetUps loggedInPlayer={loggedInPlayer} />
        </div>
          <UserJoinedMeetUps loggedInPlayer={loggedInPlayer} />
       </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  .user-info-details {
    display: flex;
    flex-direction: column;
    width: 40%;
    color: rgb(255, 190, 130);
    text-align: center;
    padding-right: 15px;
  }
  .user-info-title{
    font-family: "ultra", serif;
    font-size: 25px;
    margin-left: 40px;
  }
  .user-info-detail{
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 20px;
    margin-left: 40px;
    margin-top: 0;
  }
  .user-info-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: black;
    width: 80vw;
    margin-left: 10%;
    margin-top: 1.5%;
    border-radius: 8px;
  }
  .user-info-name{
    display:flex;
    justify-content: center;
    font-family: "Ultra", serif;
    font-size: 40px;
    color: rgb(255, 190, 130);
    margin-top: 30px;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .user-created-container {
    display: flex;
    flex-direction: column;
    width: 60%;
    border-left: solid #ff51001c;
    text-align: right;
  }
  .user-joined-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60%;
    border-left: solid #ff51001c;
    text-align: right;
    position: relative;
    left: 40%;
    bottom: 7rem;
  }
  .your-created {
    font-family: "Ultra", serif;
    color: rgb(255, 190, 130);
    font-size: 30px;
    text-align: center
  }
  .scroll-created {
    overflow-x: scroll ;
    display: flex;
    overflow-y: scroll;
    gap: 1rem;
  }
  .details-container {
    display: flex;
    flex-direction: row;
  }
  .your-meet-ups{
    background-color: white;
    border-style: solid;
    border-radius: 10px;
    width: 20%;
    left: 37%;
    height: 100%;
    text-align: center;
  }
  .your-joined-meet-ups{
    background-color: white;
    border-style: solid;
    border-radius: 10px;
    width: 20%;
    left: 37%;
    height: 100%;
    /* gap: 0.5rem; */
    text-align: center;
  }
  .your-joined{
    font-family: "Ultra", serif;
    color: rgb(255, 190, 130);
    font-size: 30px;  
    text-align: center;
  }
  .scroll-joined{
    overflow-x: scroll ;
    display: flex;
    overflow-y: scroll;
    gap: 1rem;
  }


  .Btn {
    position: relative;
    left: 36%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 10rem;
    height: 40px;
    border: none;
    padding: 0px 20px;
    background-color: rgb(255, 190, 130);
    color: black;
    font-weight: 500;
    cursor: pointer;
    border-radius: 10px;
    transition-duration: .3s;
  }

  .svg {
    width: 13px;
    position: absolute;
    right: 0;
    margin-right: 20px;
    fill: black;
    transition-duration: .3s;
  }

  .Btn:hover {
    color: transparent;
  }

  .Btn:hover svg {
    right: 43%;
    margin: 0;
    padding: 0;
    border: none;
    transition-duration: .3s;
  }

  .Btn:active {
    transform: translate(3px , 3px);
    transition-duration: .3s;
    box-shadow: 2px 2px 0px rgb(140, 32, 212);
  }
  .update-location {
    display: flex;
    flex-direction: column;
    width: 30%;
    justify-content: center;
    position: relative;
    left: 39%;
    top: 0.3rem;
    
  }
`;

export default Account;