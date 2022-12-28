import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { IBasicDetails } from "../../../../interface/IBasicDetails";

export const employeeApi = createApi({
    reducerPath: 'employee',
    baseQuery: baseQueryWithRetry("employee"),
    endpoints: (builder) => ({
        fetchAllEmployee: builder.query<IBasicDetails[], void>({
            query: () => "/all"

        }),
        fetchAllActiveEmployee: builder.query<IBasicDetails[], void>({
            query: () => "/all/active"

        }),
        addEmployee: builder.mutation<void, void>({
            query: () => "/add"
        }),
        searchEmployeeById: builder.query<void, Number>({
            query: (id) => `/searchById/${id}`
        }),
        seachEmployeeByName: builder.query<IBasicDetails[], string>({
            query: (name) => `/searchByName/${name}`
        }),
        editEmployee: builder.mutation<void, void>({
            query: () => "/edit"
        }),
    }),

});

export const { useFetchAllEmployeeQuery, useFetchAllActiveEmployeeQuery, useAddEmployeeMutation,
    useEditEmployeeMutation, useSeachEmployeeByNameQuery, useLazySeachEmployeeByNameQuery } = employeeApi