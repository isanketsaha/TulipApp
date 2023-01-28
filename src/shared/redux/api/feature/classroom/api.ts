import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { IClassDetails } from "../../../../interface/IClassDetails";
import { IBasicDetails } from "../../../../interface/IBasicDetails";
import { IClassList } from "/src/shared/interface/IClassList";


export const classroomApi = createApi({
    reducerPath: 'classroomApi',
    baseQuery: baseQueryWithRetry("classroom"),
    endpoints: (builder) => ({
        fetchAllClassroom: builder.query<IClassList[], void>({
            query: () => "/all"
        }),
        fetchClassroomDetails: builder.query<IClassDetails, number>({
            query: (id) => `/details/${id}`
        }),
    })
});

export const {useFetchAllClassroomQuery, useFetchClassroomDetailsQuery} = classroomApi;