import { createSlice } from "@reduxjs/toolkit";

interface IAppGlobal {
    showSpinner : boolean
    apiRequestCount: number
}

const initialState: IAppGlobal = {
    showSpinner: false,
    apiRequestCount: 0
}

const GlobalAppSlice = createSlice({
    name: 'globalAppState',
    initialState,
    reducers: {
        increaseApiRequestCount : (state) =>{
            state.apiRequestCount +=1;
            if( state.apiRequestCount >0 && !state.showSpinner){
                state.showSpinner = true
            }
        },
        decreaseApiRequestCount : (state) =>{
            state.apiRequestCount -=1;
            if(state.apiRequestCount == 0){
                state.showSpinner = false
            }
        }
    },
});

export const { increaseApiRequestCount, decreaseApiRequestCount} = GlobalAppSlice.actions;

export default GlobalAppSlice.reducer;

