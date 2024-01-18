import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultOptionType } from "antd/es/select";
import { ISelectDefault } from "../../interface/ISelectDefault";
import dayjs, { Dayjs } from "dayjs";


interface ICommonSelect {
  genderList: DefaultOptionType[]
  religionList: DefaultOptionType[]
  bloodGroupList: DefaultOptionType[]
  relationList: DefaultOptionType[]
  userRoleList: DefaultOptionType[]
  sessionList: DefaultOptionType[]
  selectedSession: ISelectDefault
  classList: DefaultOptionType[]
  paymentOptions: DefaultOptionType[]
  expenseCategoryOptions: DefaultOptionType[]
  holidayList: { date: string; occasion: string; description: string }[]
}

const commonSelect: ICommonSelect = {
  genderList: [],
  religionList: [],
  bloodGroupList: [],
  relationList: [],
  userRoleList: [],
  sessionList: [],
  paymentOptions: [],
  selectedSession: {} as ISelectDefault,
  classList: [],
  expenseCategoryOptions: [],
  holidayList: [],
}

const CommonSlice = createSlice({
  name: "userAuth",
  initialState: commonSelect,
  reducers: {
    updateGenderList: (state, data: PayloadAction<DefaultOptionType[]>) => {
      state.genderList = data.payload
    },
    updateReligionList: (state, data: PayloadAction<DefaultOptionType[]>) => {
      state.religionList = data.payload
    },
    updateBloodGroupList: (state, data: PayloadAction<DefaultOptionType[]>) => {
      state.bloodGroupList = data.payload
    },
    updateRelationList: (state, data: PayloadAction<DefaultOptionType[]>) => {
      state.relationList = data.payload
    },
    updateUserRoleList: (state, data: PayloadAction<DefaultOptionType[]>) => {
      state.userRoleList = data.payload
    },
    updateSessionList: (state, data: PayloadAction<DefaultOptionType[]>) => {
      state.sessionList = data.payload
    },
    updateSelectedSession: (state, data: PayloadAction<ISelectDefault>) => {
      state.selectedSession = data.payload
    },
    updateClassList: (state, data: PayloadAction<DefaultOptionType[]>) => {
      state.classList = data.payload
    },
    updatePaymentOptions: (state, data: PayloadAction<DefaultOptionType[]>) => {
      state.paymentOptions = data.payload
    },
    updateExpenseCategoryOptions: (state, data: PayloadAction<DefaultOptionType[]>) => {
      state.expenseCategoryOptions = data.payload
    },
    updateHolidayList: (state, data: PayloadAction<{ date: string; occasion: string; description: string }[]>) => {
      state.holidayList = data.payload
    },
  },
})

export default CommonSlice.reducer

export const {
  updateBloodGroupList,
  updateGenderList,
  updateRelationList,
  updateReligionList,
  updateUserRoleList,
  updateSelectedSession,
  updateSessionList,
  updateClassList,
  updatePaymentOptions,
  updateExpenseCategoryOptions,
  updateHolidayList,
} = CommonSlice.actions
