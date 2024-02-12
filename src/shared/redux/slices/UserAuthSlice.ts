import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAuth } from "../../interface/UserAuth"

interface IUserAuthState {
  user: UserAuth | null
}

const getToken = (key: string) => {
  const tokenString = localStorage.getItem(key)
  if (tokenString != null) {
    const userToken = JSON.parse(tokenString)
    return userToken
  }
  return null
}

const initialState: IUserAuthState = {
  user: getToken("tulipAuth"),
}

const UserAuthAction = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    login: (state, data: PayloadAction<UserAuth>) => {
      state.user = data.payload
    },
    logout: (state) => {
      localStorage.removeItem("tulipAuth")
      state.user = null
    },
  },
})

export const { login, logout } = UserAuthAction.actions

export default UserAuthAction.reducer