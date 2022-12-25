import { createSlice } from "@reduxjs/toolkit";

interface IAppGlobal {
    showSpinner : boolean
}

const initialState: IAppGlobal = {
    showSpinner: false
}

const GlobalAppSlice = createSlice({
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

export const { hideSpinner , showSpinner} = GlobalAppSlice.actions;

export default GlobalAppSlice.reducer;

