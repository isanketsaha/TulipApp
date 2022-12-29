import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { DefaultOptionType } from "antd/es/select";
import { updateBloodGroup, updateGender, updateRelation, updateReligion } from "../../../slices/CommonSlice";



export const commonApi = createApi({
    reducerPath: 'common',
    baseQuery: baseQueryWithRetry("common"),
    endpoints: (builder) => ({
        fetchGenderList: builder.query<DefaultOptionType[], void>({
            query: () => "/genderList",
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateGender(data));
                } catch (error) { }
            },

        }),
        fetchBloodGroupList: builder.query<DefaultOptionType[], void>({
            query: () => "/bloodGroupList",
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateBloodGroup(data));
                } catch (error) { }
            },

        }),
        fetchDependentRelationList: builder.query<DefaultOptionType[], void>({
            query: () => "/relationList",
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateRelation(data));
                } catch (error) { }
            },
        }),
        fetchReligionList: builder.query<DefaultOptionType[], void>({
            query: (id) => '/religionList',
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateReligion(data));
                } catch (error) { }
            },
        })
    }),

});

export const { useFetchBloodGroupListQuery, useFetchDependentRelationListQuery, useFetchGenderListQuery, useFetchReligionListQuery } = commonApi
