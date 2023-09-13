import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllFields = createAsyncThunk(
    'fields/fetchAllFields',
    async() => {
        const req = await axios.get(`/api1/fields`);
        return req.data;
    }
)

export const fetchFieldById = createAsyncThunk(
    'fields/fetchFieldById',
    async(id) => {
        const req = await axios.get(`/api1/fields/${id}`);
        return req.data;
    }
)

export const addNewField = createAsyncThunk(
    'fields/addNewField',
    async({field_name, img_url, location_id}) => {
        const reqBody = {field_name, img_url, location_id};
        const req = await axios.post('/api1/fields', reqBody);
        return req.data;
    }
)

const fieldsSlice = createSlice(
    {
        name: 'fields',
        initialState: {
            list: [],
            byId: undefined
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchAllFields.fulfilled, (state, action) => {
                    state.list = action.payload;
                })
                .addCase(fetchFieldById.fulfilled, (state, action) => {
                    state.byId = action.payload;
                })
                .addCase(addNewField.fulfilled, (state, action) => {
                    state.list.push(action.payload);
                })
        }
    }
);

export const selectAllFields = (state) => state.fields.list;
export const selectFieldById = (state) => state.fields.byId;
export default fieldsSlice.reducer;