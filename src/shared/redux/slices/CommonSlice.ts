import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultOptionType } from "antd/es/select";


interface ICommonSelect {
    genderList: DefaultOptionType[],
    religionList: DefaultOptionType[],
    bloodGroupList: DefaultOptionType[],
    relationList: DefaultOptionType[],
    userRoleList: DefaultOptionType[],
    sessionList: DefaultOptionType[],
    selectedSession: number | null,
    classList: DefaultOptionType[]
}

const commonSelect: ICommonSelect = {
    genderList: [],
    religionList: [],
    bloodGroupList: [],
    relationList: [],
    userRoleList:[],
    sessionList:[],
    selectedSession: null,
    classList: []
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
        updateSelectedSession: (state, data: PayloadAction<number>) => {
            state.selectedSession = data.payload;
        },
        updateClassList: (state, data: PayloadAction<DefaultOptionType[]>) => {
            state.classList = data.payload;
        },
    },

});

export default CommonSlice.reducer;

export const {updateBloodGroupList, updateGenderList, updateRelationList, updateReligionList, updateUserRoleList, updateSelectedSession, updateSessionList, updateClassList} = CommonSlice.actions;
