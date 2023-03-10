import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { IBasicDetails } from "../../../../interface/IBasicDetails";
import { IUserDetails } from "../../../../interface/IUserDetails";

export const employeeApi = createApi({
    reducerPath: 'employee',
    baseQuery: baseQueryWithRetry("employee"),
    tagTypes: ['Employee'],
    endpoints: (builder) => ({
        fetchAllEmployee: builder.query<IBasicDetails[], void>({
            query: () => "/all",
            providesTags: () => [{ type: 'Employee' }]

        }),
        fetchAllActiveEmployee: builder.query<IBasicDetails[], void>({
            query: () => "/all/active",
            providesTags: () => [{ type: 'Employee' }]
        }),
        searchEmployeeById: builder.query<IUserDetails, string>({
            query: (id) => `/search/${id}`,
            providesTags: (result, error, arg) => [{ type: 'Employee', id: result?.id }]
        }),
        seachEmployeeByName: builder.query<IBasicDetails[], string>({
            query: (name) => `/searchByName/${name}`
        }),
        editEmployee: builder.mutation<void, void>({
            query: () => "/edit"
        }),
    }),

});

export const { useFetchAllEmployeeQuery, useFetchAllActiveEmployeeQuery,
    useEditEmployeeMutation, useSeachEmployeeByNameQuery, useSearchEmployeeByIdQuery } = employeeApi