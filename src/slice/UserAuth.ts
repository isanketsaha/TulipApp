import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserAuth {
    name: string | null,
    userId: string | null,
    token: string | null,
    expiry: number,
    success: boolean,
}

const initialState: UserAuth = {
    name: null,
    userId: null,
    token: null,
    expiry: 0,
    success: false,
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