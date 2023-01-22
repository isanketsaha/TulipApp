import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "/src/configs/BaseApi";
import { IPay } from "/src/shared/interface/IPay";
import { IPayDetailsSummary } from "/src/shared/interface/IPayDetailsSummary";
import { IPageResponse } from "/src/shared/interface/IPageResponse";
import { IAdmissionReport } from "/src/shared/interface/IAdmissionReport";
import { IStaffReport } from "/src/shared/interface/IStaffReport";


export const reportApi = createApi({
    reducerPath: 'reportApi',
    baseQuery: baseQueryWithRetry("report"),
    endpoints: (builder) => ({
        fetchTransactionHistory: builder.query<IPageResponse<IPayDetailsSummary>, void>({
            query: () => '/transaction'
        }),
        fetchStudentReport: builder.query<IAdmissionReport, void>({
            query: () => '/admission'
        }),
        fetchStaffReport: builder.query<IStaffReport, void>({
            query: () => '/staff'
        })
    })
})

export const {  useFetchTransactionHistoryQuery, useFetchStudentReportQuery, useFetchStaffReportQuery } = reportApi;