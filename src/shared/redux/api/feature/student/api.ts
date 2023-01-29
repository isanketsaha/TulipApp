import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { IBasicDetails } from "../../../../interface/IBasicDetails";
import { IUserDetails } from "../../../../interface/IUserDetails";
import { IPageResponse } from "/src/shared/interface/IPageResponse";
import { IPageRequest } from "/src/shared/interface/IPageRequest";


export const studentApi = createApi({
    reducerPath: 'studentApi',
    baseQuery: baseQueryWithRetry("student"),
    endpoints: (builder) => ({
        fetchAllStudent: builder.query<IPageResponse<IBasicDetails>, number>({
            query: (page) => `/all?page=${page}`
        }),
        searchStudent: builder.query<IUserDetails, String>({
            query: (id) => `/search/${id}`
        }),
        searchStudentByName: builder.query<IBasicDetails[], string>({
            query: (name) => `/searchByName/${name}`
        }),
        basicSearchById: builder.query<IBasicDetails, string>({
            query: (id) => `/basicSearch/${id}`
        })
    })
});

export const { useFetchAllStudentQuery, useSearchStudentByNameQuery, useSearchStudentQuery , useBasicSearchByIdQuery} = studentApi;