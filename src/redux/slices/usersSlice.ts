import { createSlice } from '@reduxjs/toolkit';
import { userState } from '../initialState/usersState';
import {usersAction} from '../action/usersAction'

const userSlice = createSlice({
    name: 'user',
    initialState: userState ,
    reducers: {...usersAction},
})

export const {login , logout } = userSlice.actions;
export default userSlice.reducer;