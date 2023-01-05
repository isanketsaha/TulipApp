import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { IBasicDetails } from "../../../../interface/IBasicDetails";
import { IUserDetails } from "../../../../interface/IUserDetails";


export const studentApi = createApi({
    reducerPath: 'studentApi',
    baseQuery: baseQueryWithRetry("student"),
    endpoints: (builder) => ({
        fetchAllStudent: builder.query<IBasicDetails[], void>({
            query: () => "/all"
        }),
        searchStudent: builder.query<IUserDetails, String>({
            query: (id) => `/search/${id}`
        }),
        searchStudentByName: builder.query<IBasicDetails[], string>({
            query: (name) => `/searchByName/${name}`
        }),
    })
});

export const { useFetchAllStudentQuery, useSearchStudentByNameQuery, useSearchStudentQuery } = studentApi;