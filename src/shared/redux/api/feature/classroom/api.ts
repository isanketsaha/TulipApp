import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { IClassDetails } from "../../../../interface/IClassDetails";
import { IBasicDetails } from "../../../../interface/IBasicDetails";


export const classroomApi = createApi({
    reducerPath: 'classroomApi',
    baseQuery: baseQueryWithRetry("classroom"),
    endpoints: (builder) => ({
        fetchAllClassroom: builder.query<IClassDetails[], void>({
            query: () => "/all"
        }),
        fetchStudentList: builder.query<IBasicDetails[], number>({
            query: (id) => `/studentList/${id}`
        }),
    })
});

export const {useFetchAllClassroomQuery, useFetchStudentListQuery} = classroomApi;