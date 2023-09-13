import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addNewField } from '../../redux/fields/fieldsSlice';
import { addNewSport } from '../../redux/sports/sportsSlice';

function RequestManagementForm({ locations, formType }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");;
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [bgImage, setBgImage] = useState("");

    
    const handleSubmitField = async(e) => {
        e.preventDefault();
        const newField = {
            "field_name": name,
            "img_url": image,
            "location_id": parseInt(location)
        };
        try {
            let text = "Ready to add?"
            if (window.confirm(text) === true) {
                text = "Successfully added ✅"
                await dispatch(addNewField(newField))
            }
            alert(text);
        } catch {
            alert("An error has occured ❌")
        }
    };

    // form handler to submit new sport 
    const handleSubmitSport = (e) => {
        e.preventDefault();
        const newSport = {
            "sport_type" : name,
            "img_url": image,
            "bg_img": bgImage,
            "location_id": parseInt(location)
        };
        let text = "Ready to add?"
        if (window.confirm(text) === true) {
            text = "Successfully added ✅"
            dispatch(addNewSport(newSport));
        }
        alert(text);
    }


  return (
    <Container>
        {formType ? 
                <form onSubmit={handleSubmitSport}>
                    <p>Add Sport</p>
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input required="" class="form-control" name="name" id="name" type="text" placeholder="Enter name of sport" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="image">Image URL:</label>
                        <input required="" class="form-control" name="image" id="image" type="text" placeholder="Enter image url" value={image} onChange={(e) => setImage(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="bg-image">Background Image URL:</label>
                        <input required="" class="form-control" name="bg-image" id="ibg-image" type="text" placeholder="Enter background image url" value={bgImage} onChange={(e) => setBgImage(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="location">Location:</label>
                        <select onChange={(e) => setLocation(e.target.value)}>
                            <option value="null">Select Here</option>
                            {locations.map((location) => (
                                <option value={location.id}>{location.state}</option>
                            ))}
                        </select>
                    </div>
                    <input type="submit" class="btn" value="submit"/>    
                </form> : <form onSubmit={handleSubmitField}>
                    <p>Add Field</p>
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input required="" class="form-control" name="name" id="name" type="text" placeholder="Enter name of field/park" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="name">Image URL:</label>
                        <input required="" class="form-control" name="image" id="image" type="text" placeholder="Enter image url" value={image} onChange={(e) => setImage(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="location">Location:</label>
                        <select onChange={(e) => setLocation(e.target.value)}>
                            <option value="null">Select Here</option>
                            {locations.map((location) => (
                                <option value={location.id}>{location.state}</option>
                            ))}
                        </select>
                    </div>
                    <input type="submit" class="btn" value="submit"/>    
                </form> }
    </Container>
  )
}

const Container = styled.div``;

export default RequestManagementForm;