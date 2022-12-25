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
        subscription: (state, action) => {
            if (state.currentUser?.subscribeUsers?.includes(action.payload)) {
                state.currentUser?.subscribeUsers.splice(
                    state.currentUser.subscribeUsers.findIndex(channelId=>channelId === action.payload), 1)
            } else {
                state.currentUser?.subscribeUsers?.push(action.payload);
            }
        }
    }
})

export const {loginStart, loginSuccess, loginFailure, logOut, subscription} = userSlice.actions;
export default userSlice.reducer;