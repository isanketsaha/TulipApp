import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultOptionType } from "antd/es/select";


interface ICommonSelect {
    gender: DefaultOptionType[],
    religion: DefaultOptionType[],
    bloodGroup: DefaultOptionType[],
    relation: DefaultOptionType[]
}

const commonSelect: ICommonSelect = {
    gender: [],
    religion: [],
    bloodGroup: [],
    relation: []
}
const CommonSlice = createSlice({
    name: 'userAuth',
    initialState: commonSelect,
    reducers: {
        updateGender: (state, data: PayloadAction<DefaultOptionType[]>) => {
            state.gender = data.payload;
        },
        updateReligion: (state, data: PayloadAction<DefaultOptionType[]>) => {
            state.religion = data.payload;
        },
        updateBloodGroup: (state, data: PayloadAction<DefaultOptionType[]>) => {
            state.bloodGroup = data.payload;
        },
        updateRelation: (state, data: PayloadAction<DefaultOptionType[]>) => {
            state.relation = data.payload;
        },
    },

});

export default CommonSlice.reducer;

export const {updateBloodGroup, updateGender, updateRelation, updateReligion} = CommonSlice.actions;
