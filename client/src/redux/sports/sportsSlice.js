import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllSports = createAsyncThunk(
    'sports/fetchAllSports',
    async() => {
        const req = await axios.get(`/api1/sports`);
        return req.data;
    }
)

export const fetchSportById = createAsyncThunk(
    'sports/fetchSportById',
    async(id) => {
        const req = await axios.get(`/api1/sports/${id}`);
        return req.data;
    }
)

export const addNewSport = createAsyncThunk(
    'sports/addNewSport',
    async({ sport_type, img_url, bg_img, location_id}) => {
        const reqBody = { sport_type, img_url, bg_img, location_id};
        const req = await axios.post(`/api1/sports`, reqBody);
        return req.data;
    }
)


export const sportsSlice = createSlice(
    {
        name: 'sports',
        initialState: {
            list: [],
            byId: undefined,
            isLoading: false
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchAllSports.fulfilled, (state, action) => {
                    state.list = action.payload;
                })
                .addCase(fetchSportById.pending, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(fetchSportById.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.byId = action.payload;
                })
                .addCase(addNewSport.fulfilled, (state, action) => {
                    state.list.push(action.payload);
                })
        }
    }
);

export const selectAllSports = (state) => state.sports.list;
export const selectSportById = (state) => state.sports.byId;
export const isLoadingData = (state) => state.sports.isLoading;
export default sportsSlice.reducer;