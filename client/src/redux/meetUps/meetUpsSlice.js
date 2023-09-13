import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addNewMeetUp = createAsyncThunk(
    'meetUps/createNewMeetUp',
    async({date, field_id, sport_id, player_id}) => {
        const reqBody = { date, field_id, sport_id, player_id };
        const req  = await axios.post(`/api1/meet_ups`, reqBody);
        return req.data;
    }
);

export const joinMeetUp = createAsyncThunk(
    'meetUps/joinMeetUp',
    async({meet_up_id, player_id}) => {
        const reqBody = { meet_up_id, player_id };
        const req = await axios.post(`/api1/join_meet_up`, reqBody);
        return req.data;
    }
)

export const removeMeetUp = createAsyncThunk(
    'meetUps/removeMeetUp',
    async(id) => {
        const req = await axios.delete(`/api1/meet_ups/${id}`);
        return req.data;
    }
)

const meetUpsSlice = createSlice(
    {
        name: "meetUps",
        initialState: {
            list: [],
            teammates: []
        },
        extraReducers: (builder) =>{
            builder
                .addCase(addNewMeetUp.fulfilled, (state, action) => {
                    state.list.push(action.payload)
                })
                .addCase(joinMeetUp.fulfilled, (state, action) => {
                    state.teammates.push(action.payload)
                })
                .addCase(removeMeetUp.fulfilled, (state, action) => {
                    state.list = state.list.filter((meetUp) => meetUp.id !== action.payload.id)
                })
        }
    }
);


export default meetUpsSlice.reducer;