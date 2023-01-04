import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { IBasicDetails } from "../../../../interface/IBasicDetails";


export const studentApi = createApi({
    reducerPath: 'studentApi',
    baseQuery: baseQueryWithRetry("student"),
    endpoints: (builder) => ({
        fetchAllStudent: builder.query<IBasicDetails[], void>({
            query: () => "/all"
        }),
        searchStudent: builder.query<IBasicDetails[], number>({
            query: (id) => `/search/${id}`
        }),
        searchStudentByName: builder.query<IBasicDetails[], string>({
            query: (name) => `/search/${name}`
        }),
    })
});

export const { useFetchAllStudentQuery, useSearchStudentByNameQuery, useSearchStudentQuery } = studentApi;