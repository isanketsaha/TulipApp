import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAuth } from "../../interface/UserAuth";


interface IUserAuthState{
    user: UserAuth | null;
}


const initialState: IUserAuthState = {
    user: null
}

const UserAuth = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        login: (state, data: PayloadAction<UserAuth>) => {
            state.user =  data.payload;
        },
        logout: (state) => {
            state.user = initialState.user;
        },
    },
    
});

export const { login, logout } = UserAuth.actions

export default UserAuth.reducer