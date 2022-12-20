import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserAuth {
    userName: string | null,
    userId: string | null,
    idToken: string | null,
    expiry: number,
    authority: string[],
}

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
        login: (state) => {

        },
        logout: (state) => {
            // state.value -= 1
        },
        refreshToken: (state, action: PayloadAction<UserAuth>) => {
            // state.value += action.payload
        },
    },
    
});

export const { login, logout, refreshToken } = UserAuth.actions

export default UserAuth.reducer