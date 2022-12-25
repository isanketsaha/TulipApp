import { createSlice } from "@reduxjs/toolkit";

interface IAppGlobal {
    showSpinner : boolean
}

const initialState: IAppGlobal = {
    showSpinner: false
}

const AppSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        showSpinner : (state) => {
            state.showSpinner = true
        },
        hideSpinner : (state) => {
            state.showSpinner = false
        }
    },
});

export const { hideSpinner , showSpinner} = AppSlice.actions;

export default AppSlice.reducer;

