import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFeesCatalog } from "../../interface/IFeesCatalog";
import { IProductCatlog } from "../../interface/IProductCatalog";


interface ICatalog {
    feesCatalog : IFeesCatalog[]
    productCatalog: IProductCatlog[]
}

const initialState: ICatalog = {
    feesCatalog: [],
    productCatalog:[]
}

const CatalogSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        updateFeesCatalog : (state, data: PayloadAction<IFeesCatalog[]>) => {
            state.feesCatalog = data.payload
        },
        updateProductCatalog: (state, data: PayloadAction<IProductCatlog[]>) => {
            state.productCatalog = data.payload
        }
    },
});

export const { updateFeesCatalog , updateProductCatalog} = CatalogSlice.actions;

export default CatalogSlice.reducer;