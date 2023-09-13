import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import RequestCard from '../components/requests/RequestCard';
import { selectLoggedInPlayer } from '../redux/players/playersSlice';
import { createNewRequest, fetchRequests, selectRequests } from '../redux/requests/requestsSlice';
import { fetchAllLocations, selectAllLocations } from '../redux/locations/locationsSlice';
import { requestCreated, requestNotCreated } from '../ui/Toastify';
import { ToastContainer } from 'react-toastify';

function Requests() {
    const dispatch = useDispatch();
    const loggedInPlayer = useSelector(selectLoggedInPlayer) || {};
    const [name, setName] = useState("");
    const [location, setLocation] = useState();

    // fetch request data
    const requests = useSelector(selectRequests);
    useEffect(() => {
        dispatch(fetchRequests())
        .then(() => {
            dispatch(fetchRequests());
        })
    },[dispatch])

    // fetch locations for form dropdown
    const locations = useSelector(selectAllLocations);
    useEffect(() => {
        dispatch(fetchAllLocations());
    },[dispatch])

    // create a new request
    const handleSubmit = async(e) => {
        e.preventDefault();
        const newRequest = {
            "name": name,
            "location": location,
            "player_id": loggedInPlayer.id
        };
        const addNew = await dispatch(createNewRequest(newRequest));
        if (!addNew.error) {
            requestCreated();
            setName("");
            setLocation("");
        } else {
           requestNotCreated(); 
        }
    }

  return (
    <Container>
        <NavBar />
        <h1 className="request-title">Sport or Field Requests:</h1>
        <ToastContainer />
        <div className="request-container flex">
            {requests.map((request) => (
                <RequestCard key={request.id} request={request} />
            ))}
        </div>
        <div class="card">
            <div class="card-header">
                <div class="text-header">Create a request</div>
            </div>
            <div class="card-body">
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input required="" class="form-control" name="name" id="name" type="text" placeholder="Enter name of sport or field/park" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="location">Location:</label>
                        <select onChange={(e) => setLocation(e.target.value)}>
                            <option value="null">Select Here</option>
                            {locations.map((location) => (
                                <option key={location.id} value={location.state}>{location.state}</option>
                            ))}
                        </select>
                    </div>
                    <input type="submit" class="btn" value="submit"/>    
                </form>
            </div>
        </div>
    </Container>
  )
}

const Container = styled.div`
    .card {
        width: 350px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
        overflow: hidden;
        margin: 10px;
        position: relative;
        left: 37.5%;
        top: 3rem;
    }
    .card-header {
        background-color: #333;
        padding: 16px;
        text-align: center;
    }

    .card-header .text-header {
        margin: 0;
        font-size: 18px;
        color: rgb(255, 255, 255);
    }

    .card-body {
        padding: 16px;
    }

    .form-group {
        margin-bottom: 10px;
    }

    .form-group label {
        display: block;
        font-size: 14px;
        color: #333;
        font-weight: bold;
        margin-bottom: 1px;
    }

    .form-group input[type="text"],
    .form-group input[type="email"],
    .form-group input[type="password"] {
        width: 100%;
        padding: 8px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .btn {
        padding: 12px 24px;
        margin-left: 13px;
        font-size: 16px;
        border: none;
        border-radius: 4px;
        background-color: #333;
        color: #fff;
        text-transform: uppercase;
        transition: background-color 0.2s ease-in-out;
        cursor: pointer
    }

    .btn:hover {
        background-color: #ccc;
        color: #333;
    }
    .request-title {
        color: rgb(0, 0, 0);
        text-align: center;
        font-size: 5pc;
        font-family: "Ultra", serif;
        /* position: relative;
        bottom: 3rem; */
        background-color: transparent;
        text-shadow: 2px 2px 3px rgb(255, 205, 98);
    }
    .request-container {
       justify-content: center;
       gap: 1rem;
       flex-wrap: wrap;
    }
`;

export default Requests;