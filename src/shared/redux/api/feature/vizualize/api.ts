import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "/src/configs/BaseApi";


export const visualizeApi = createApi({
    reducerPath: 'visualize',
    tagTypes:['AdmissionReport', 'Payment'],
    baseQuery : baseQueryWithRetry("visualize"),
    endpoints: (builder) => ({
        admissionByMonth: builder.query<Record<string, number>, void>({
            query: () => `/admission`,
            providesTags: ['AdmissionReport'],
        }),
        expenseReport : builder.query<Record<string, Record<string, number>>, void>({
            query: () => `/expense`,
            providesTags: ['Payment'],
        })
    })

});
export const {useAdmissionByMonthQuery, useExpenseReportQuery} = visualizeApi
