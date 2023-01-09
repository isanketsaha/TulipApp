import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFeesCatalog } from "../../interface/IFeesCatalog";


interface ICatalog {
    feesCatalog : IFeesCatalog[]
}

const initialState: ICatalog = {
    feesCatalog: []
}

const CatalogSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        updateFeesCatalog : (state, data: PayloadAction<IFeesCatalog[]>) => {
            state.feesCatalog = data.payload
        }
    },
});

export const { updateFeesCatalog } = CatalogSlice.actions;

export default CatalogSlice.reducer;