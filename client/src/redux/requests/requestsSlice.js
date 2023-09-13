import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRequests = createAsyncThunk(
    'requests/fetchRequest',
    async() => {
        const req = await axios.get('/api1/requests');
        return req.data;
    }
)

export const fetchManagedRequests = createAsyncThunk(
    'requests/fetchManagedRequest',
    async() => {
        const req = await axios.get('/api1/managed_requests');
        return req.data;
    }
);

export const createNewRequest = createAsyncThunk(
    'request/newRequest',
    async({ name, location, player_id}) => {
        const reqBody = { name, location, player_id };
        const req = await axios.post(`/api1/requests`, reqBody);
        return req.data;
    }
)

export const removeRequest = createAsyncThunk(
    'request/removeRequest',
    async(id) => {
        const req = await axios.delete(`/api1/requests/${id}`);
        return req.data;
    }
)

export const updateRequestLikes = createAsyncThunk(
    'request/updateRequestLikes',
    async(payload) => {
        const { likes, id } = payload;
        const reqBody = { likes }; 
        const req = await axios.patch(`/api1/requests/${id}`, reqBody);
        return req.data;
    }
)

export const updateRequestDislikes = createAsyncThunk(
    'requests/updateRequestDislikes',
    async(payload) => {
        const { dislikes, id } = payload;
        const reqBody ={ dislikes };
        const req = await axios.patch(`/api1/requests/${id}`, reqBody);
        return req.data;
    }
)

const requestsSlice = createSlice(
    {
        name: 'requests',
        initialState: {
            list: [],
            cannotCreate: false
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchRequests.fulfilled, (state, action) => {
                    state.list = action.payload;
                })
                .addCase(createNewRequest.fulfilled, (state, action) => {
                    state.list.push(action.payload);
                })
                .addCase(removeRequest.fulfilled, (state, action) => {
                    state.list.filter((request) => request.id !== action.payload)
                })
                .addCase(updateRequestLikes.fulfilled, (state, action) => {
                    state.list = state.list.map((request) => {
                        if (request.id === action.payload.id) {
                           return {...request, likes: action.payload.likes};
                        }
                        return request;
                    })
                })
                .addCase(updateRequestDislikes.fulfilled, (state, action) => {
                    state.list = state.list.map((request) => {
                        if (request.id === action.payload.id) {
                            return {...request, dislikes: action.payload.dislikes};
                        }
                        return request;
                    })
                })
                .addCase(fetchManagedRequests.fulfilled, (state, action) => {
                    state.list = action.payload;
                })
        }
    }
);

export const selectRequests = (state) => state.requests.list;
export const selectManagedRequests = (state) => state.requests.list;
export default requestsSlice.reducer;