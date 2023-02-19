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
        fetchAllClassroom: builder.query<IClassList[], number>({
            query: (sessionId) => `all?sessionId=${sessionId ? sessionId:0}`,
            
        }),
        fetchClassroomId: builder.query<number, {std: string, sessionId : number} | undefined>({
            query: (item) => item ? `/id?std=${item.std}&sessionId=${item.sessionId}` : '',
            
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

export const {useFetchAllClassroomQuery, useFetchClassroomDetailsQuery, usePromoteStudentMutation, useFetchClassroomIdQuery} = classroomApi;