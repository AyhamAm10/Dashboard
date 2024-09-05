import { reduxUser } from "../../type/userType";
import { PayloadAction } from '@reduxjs/toolkit';

export const usersAction = {
    login: (state:any, action: PayloadAction<'admin' | 'superAdmin' | 'sellManager'>) => {
        state.isAuthenticated = true;
        state.userType = action.payload;
      },
    logout: (state:any) => {
        state.isAuthenticated = false;
        state.userType = null;
    }
}