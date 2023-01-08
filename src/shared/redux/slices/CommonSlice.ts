import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultOptionType } from "antd/es/select";
import { ISelectDefault } from "../../interface/ISelectDefault";


interface ICommonSelect {
    genderList: DefaultOptionType[],
    religionList: DefaultOptionType[],
    bloodGroupList: DefaultOptionType[],
    relationList: DefaultOptionType[],
    userRoleList: DefaultOptionType[],
    sessionList: DefaultOptionType[],
    selectedSession: ISelectDefault,
    classList: DefaultOptionType[],
    paymentOptions: DefaultOptionType[],
}

const commonSelect: ICommonSelect = {
    genderList: [],
    religionList: [],
    bloodGroupList: [],
    relationList: [],
    userRoleList: [],
    sessionList: [],
    paymentOptions:[],
    selectedSession: {} as ISelectDefault,
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
        updateSelectedSession: (state, data: PayloadAction<ISelectDefault>) => {
            state.selectedSession = data.payload;
        },
        updateClassList: (state, data: PayloadAction<DefaultOptionType[]>) => {
            state.classList = data.payload;
        },
        updatePaymentOptions: (state, data: PayloadAction<DefaultOptionType[]>) => {
            state.paymentOptions = data.payload;
        }
    },

});

export default CommonSlice.reducer;

export const { updateBloodGroupList, updateGenderList, updateRelationList, updateReligionList,
    updateUserRoleList, updateSelectedSession, updateSessionList, updateClassList, updatePaymentOptions } = CommonSlice.actions;
