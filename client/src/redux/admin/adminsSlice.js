import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const adminLogin = createAsyncThunk(
    `admin/adminLogin`,
    async ({ email, password }) => {
        const reqBody = {email, password};
        const req = await axios.post('/api1/admin_login', reqBody);
        return req.data;
    }
);

export const adminLogout = createAsyncThunk(
    'admin/adminLogout',
    async() => {
        const req = await axios.delete('/api1/admin_logout');
        return req.data;
    }
);

export const adminStayLoggedIn = createAsyncThunk(
    'admin/adminStayLoggedIn',
    async() => {
        const req = await axios.get('/api1/is_logged_in');
        return req.data;
    }
);

const adminSlice = createSlice(
    {
        name: 'admins',
        initialState: {
            data: [],
            admin: undefined
        },
        extraReducers: (builder) => {
            builder
                .addCase(adminLogin.fulfilled, (state, action) => {
                    state.admin = action.payload;
                })
                .addCase(adminLogin.rejected, (action) => {
                    console.error("Unable to login:", action.error.message)
                })
                .addCase(adminLogout.fulfilled, (state, action) => {
                    state.admin = null;
                })
                .addCase(adminStayLoggedIn.fulfilled, (state, action) => {
                    state.admin = action.payload;
                })
        }
    }
);

export const selectLoggedInAdmin = (state) => state.admins.admin;
export default adminSlice.reducer;