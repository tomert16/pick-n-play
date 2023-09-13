import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllLocations = createAsyncThunk(
    'locations/fetchAllLocations',
    async() => {
            const req = await axios.get(`/api1/locations`);
            return req.data;
        }
);

export const fetchLocationById = createAsyncThunk(
    'locations/fetchLocationById',
    async(id) => {
        const req = await axios.get(`/api1/locations/${id}`);
        return req.data;
    }
)

const locationsSlice = createSlice(
    {
        name: 'locations',
        initialState: {
            list: [],
            byId: undefined
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchAllLocations.fulfilled, (state, action) => {
                    state.list = action.payload;
                })
                .addCase(fetchLocationById.fulfilled, (state, action) => {
                    state.byId = action.payload;
                })
        }
    }
);

export const selectAllLocations = (state) => state.locations.list;
export const selectLocationById = (state) => state.locations.byId;
export default locationsSlice.reducer;