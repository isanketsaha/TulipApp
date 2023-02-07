import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { IBasicDetails } from "../../../../interface/IBasicDetails";
import { IUserDetails } from "../../../../interface/IUserDetails";
import { IPageResponse } from "/src/shared/interface/IPageResponse";
import { IPageRequest } from "/src/shared/interface/IPageRequest";


export const studentApi = createApi({
    reducerPath: 'studentApi',
    tagTypes: ['Student'],
    baseQuery: baseQueryWithRetry("student"),
    endpoints: (builder) => ({
        fetchAllStudent: builder.query<IPageResponse<IBasicDetails>, number>({
            query: (page) => `/all?page=${page}`,
            providesTags: () => [{ type: 'Student' }]
        }),
        searchStudent: builder.query<IUserDetails, String>({
            query: (id) => `/search/${id}`,
            providesTags: () => [{ type: 'Student' }]
        }),
        searchStudentByName: builder.query<IBasicDetails[], string>({
            query: (name) => `/searchByName/${name}`
        }),
        basicSearchById: builder.query<IBasicDetails, string>({
            query: (id) => `/basicSearch?id=${id}`
        }),
        basicSearchByIdAndClass: builder.query<IBasicDetails, {id: string | undefined, classId: string | undefined}>({
            query: (id) => `/basicSearch?id=${id.id}&classId=${id.classId}`
        })
    })
});

export const { useFetchAllStudentQuery, useSearchStudentByNameQuery, useSearchStudentQuery , useBasicSearchByIdQuery, useBasicSearchByIdAndClassQuery} = studentApi;