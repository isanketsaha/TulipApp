import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { IClassDetails } from "../../../../interface/IClassDetails";
import { IBasicDetails } from "../../../../interface/IBasicDetails";
import { IClassList } from "/src/shared/interface/IClassList";
import { IPromote } from "/src/shared/interface/IPromote";


export const classroomApi = createApi({
    reducerPath: 'classroomApi',
    tagTypes: ['Classroom', 'Student'],
    baseQuery: baseQueryWithRetry("classroom"),
    endpoints: (builder) => ({
        fetchAllClassroom: builder.query<IClassList[], void>({
            query: () => "/all",
            
        }),
        fetchClassroomDetails: builder.query<IClassDetails, number>({
            query: (id) => `/details/${id}`,
            providesTags: () => [{ type: 'Student' }]
        }),
        promoteStudent: builder.mutation<number, IPromote>({
            query: (payload) => {
                return ({
                    url: '/student-promote',
                    method: 'POST',
                    body: payload
                });
            },
            invalidatesTags: ['Classroom','Student']
        }),
    })
});

export const {useFetchAllClassroomQuery, useFetchClassroomDetailsQuery, usePromoteStudentMutation} = classroomApi;