import {createSlice} from '@reduxjs/toolkit';
import {IUser} from "../dataTypes/DataTypes";


type Nullable<T> = T | null;

export interface UserState {
    currentUser: Nullable<IUser>,
    loading: boolean,
    error: boolean,
}

const initialState : UserState = {
    currentUser: null,
    loading: false,
    error: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state:UserState) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logOut: (state) => {
            state = initialState
        },
    }
})

export const {loginStart, loginSuccess, loginFailure, logOut} = userSlice.actions;
export default userSlice.reducer;