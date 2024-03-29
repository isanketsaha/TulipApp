import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { DefaultOptionType } from "antd/es/select";
import { updateBloodGroupList, updateClassList, updateExpenseCategoryOptions, updateGenderList, updatePaymentOptions, updateRelationList, updateReligionList, updateSelectedSession, updateSessionList, updateUserRoleList } from "../../../slices/CommonSlice";
import { ISelectDefault } from "../../../../interface/ISelectDefault";
import { ISession } from "/src/shared/interface/ISession"

export const commonApi = createApi({
  reducerPath: "common",
  baseQuery: baseQueryWithRetry("common"),
  tagTypes: ["SessionList"],
  endpoints: (builder) => ({
    fetchGenderList: builder.query<DefaultOptionType[], void>({
      query: () => "/genderList",
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(updateGenderList(data))
        } catch (error) {}
      },
    }),
    fetchBloodGroupList: builder.query<DefaultOptionType[], void>({
      query: () => "/bloodGroupList",
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(updateBloodGroupList(data))
        } catch (error) {}
      },
    }),
    fetchDependentRelationList: builder.query<DefaultOptionType[], void>({
      query: () => "/relationList",
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(updateRelationList(data))
        } catch (error) {}
      },
    }),
    fetchReligionList: builder.query<DefaultOptionType[], void>({
      query: (id) => "/religionList",
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(updateReligionList(data))
        } catch (error) {}
      },
    }),
    fetchUserRoleList: builder.query<DefaultOptionType[], void>({
      query: (id) => "/userRoleList",
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(updateUserRoleList(data))
        } catch (error) {}
      },
    }),
    fetchCurrentFinancialYear: builder.query<ISelectDefault, void>({
      query: () => "/currentFinancialYear",
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(updateSelectedSession(data))
        } catch (error) {}
      },
    }),
    fetchCurrentSession: builder.query<ISession, void>({
      query: () => "/currentSession",
    }),
    fetchAllFinacialYear: builder.query<DefaultOptionType[], void>({
      query: () => "/financialYearList",
      providesTags: () => [{ type: "SessionList" }],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(updateSessionList(data))
        } catch (error) {}
      },
    }),
    fetchAllClass: builder.query<DefaultOptionType[], void>({
      query: () => "/classList",
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(updateClassList(data))
        } catch (error) {}
      },
    }),
    fetchAvailablePaymentOptions: builder.query<DefaultOptionType[], void>({
      query: () => "/availablePaymentOptions",
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(updatePaymentOptions(data))
        } catch (error) {}
      },
    }),
    fetchUploadOptions: builder.query<DefaultOptionType[], void>({
      query: () => "/uploadOptions",
    }),
    fetchExpenseCategoryOptions: builder.query<DefaultOptionType[], void>({
      query: () => "/expenseCategory",
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(updateExpenseCategoryOptions(data))
        } catch (error) {}
      },
    }),
  }),
})

export const {
  useFetchBloodGroupListQuery,
  useFetchDependentRelationListQuery,
  useFetchGenderListQuery,
  useFetchReligionListQuery,
  useFetchUserRoleListQuery,
  useFetchAllFinacialYearQuery,
  useFetchCurrentFinancialYearQuery,
  useFetchAllClassQuery,
  useFetchAvailablePaymentOptionsQuery,
  useFetchExpenseCategoryOptionsQuery,
  useFetchCurrentSessionQuery,
  useFetchUploadOptionsQuery,
} = commonApi


