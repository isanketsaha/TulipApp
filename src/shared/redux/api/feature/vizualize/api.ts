import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "/src/configs/BaseApi";


export const visualizeApi = createApi({
    reducerPath: 'visualize',
    tagTypes:['AdmissionReport', 'Payment','Student'],
    baseQuery : baseQueryWithRetry("visualize"),
    endpoints: (builder) => ({
        admissionByMonth: builder.query<Record<string, number>, void>({
            query: () => `/admission`,
            providesTags: ['AdmissionReport'],
        }),
        expenseReport : builder.query<Record<string, Record<string, number>>, void>({
            query: () => `/expense`,
            providesTags: ['Payment'],
        }),
        mrr : builder.query<number, void>({
            query: () => `/mrr`,
            providesTags: ['Student'],
        }),
        yrr : builder.query<number, void>({
            query: () => `/yrr`,
            providesTags: ['Student'],
        })
    })

});
export const {useAdmissionByMonthQuery, useExpenseReportQuery, useMrrQuery , useYrrQuery} = visualizeApi
