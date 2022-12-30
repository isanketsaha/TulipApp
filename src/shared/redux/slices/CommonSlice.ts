import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultOptionType } from "antd/es/select";


interface ICommonSelect {
    genderList: DefaultOptionType[],
    religionList: DefaultOptionType[],
    bloodGroupList: DefaultOptionType[],
    relationList: DefaultOptionType[],
    userRoleList: DefaultOptionType[],
    sessionList: DefaultOptionType[],
    selectedSession: DefaultOptionType | null,
}

const commonSelect: ICommonSelect = {
    genderList: [],
    religionList: [],
    bloodGroupList: [],
    relationList: [],
    userRoleList:[],
    sessionList:[],
    selectedSession: null,
}
const CommonSlice = createSlice({
    name: 'userAuth',
    initialState: commonSelect,
    reducers: {
        updateGenderList: (state, data: PayloadAction<DefaultOptionType[]>) => {
            state.genderList = data.payload;
        },
        updateReligionList: (state, data: PayloadAction<DefaultOptionType[]>) => {
            state.religionList = data.payload;
        },
        updateBloodGroupList: (state, data: PayloadAction<DefaultOptionType[]>) => {
            state.bloodGroupList = data.payload;
        },
        updateRelationList: (state, data: PayloadAction<DefaultOptionType[]>) => {
            state.relationList = data.payload;
        },
        updateUserRoleList: (state, data: PayloadAction<DefaultOptionType[]>) => {
            state.userRoleList = data.payload;
        },
        updateSessionList: (state, data: PayloadAction<DefaultOptionType[]>) => {
            state.sessionList = data.payload;
        },
        updateSelectedSession: (state, data: PayloadAction<DefaultOptionType>) => {
            state.selectedSession = data.payload;
        },
    },

});

export default CommonSlice.reducer;

export const {updateBloodGroupList, updateGenderList, updateRelationList, updateReligionList, updateUserRoleList, updateSelectedSession, updateSessionList} = CommonSlice.actions;
