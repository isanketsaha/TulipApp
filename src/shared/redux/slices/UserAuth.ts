import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAuth } from "../../interface/UserAuth";

const initialState: UserAuth = {
    userName: null,
    userId: null,
    idToken: null,
    expiry: 0,
    authority: []
}

const UserAuth = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        login: (state, data: PayloadAction<UserAuth>) => {
           state = data.payload;
        },
        logout: (state) => {
            state = initialState;
        },
    },
    
});

export const { login, logout } = UserAuth.actions

export default UserAuth.reducer