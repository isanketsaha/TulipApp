import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAuth } from "../../interface/UserAuth";


interface IUserAuthState{
    user: UserAuth | null;
}


const getToken = (key: string ) => {
    const tokenString = sessionStorage.getItem(key);
    if(tokenString != null){
    const userToken = JSON.parse(tokenString);
    return userToken;
    }
    return null;
  }; 

const initialState: IUserAuthState = {
    user: getToken("tulipAuth")
}

const UserAuth = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        login: (state, data: PayloadAction<UserAuth>) => {
            state.user =  data.payload;
        },
        logout: (state) => {
            sessionStorage.removeItem("tulipAuth");
            state.user = null;
        },
    },
    
});

export const { login, logout } = UserAuth.actions

export default UserAuth.reducer