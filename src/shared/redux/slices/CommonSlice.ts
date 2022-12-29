import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultOptionType } from "antd/es/select";


interface ICommonSelect {
    gender: DefaultOptionType[],
    religion: DefaultOptionType[],
    bloodGroup: DefaultOptionType[],
    relation: DefaultOptionType[],
    userRole: DefaultOptionType[]
}

const commonSelect: ICommonSelect = {
    gender: [],
    religion: [],
    bloodGroup: [],
    relation: [],
    userRole:[]
}
const CommonSlice = createSlice({
    name: 'userAuth',
    initialState: commonSelect,
    reducers: {
        updateGenderList: (state, data: PayloadAction<DefaultOptionType[]>) => {
            state.gender = data.payload;
        },
        updateReligionList: (state, data: PayloadAction<DefaultOptionType[]>) => {
            state.religion = data.payload;
        },
        updateBloodGroupList: (state, data: PayloadAction<DefaultOptionType[]>) => {
            state.bloodGroup = data.payload;
        },
        updateRelationList: (state, data: PayloadAction<DefaultOptionType[]>) => {
            state.relation = data.payload;
        },
        updateUserRoleList: (state, data: PayloadAction<DefaultOptionType[]>) => {
            state.userRole = data.payload;
        },
    },

});

export default CommonSlice.reducer;

export const {updateBloodGroupList, updateGenderList, updateRelationList, updateReligionList, updateUserRoleList} = CommonSlice.actions;
