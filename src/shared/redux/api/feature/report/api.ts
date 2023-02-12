import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "/src/configs/BaseApi";
import { IPay } from "/src/shared/interface/IPay";
import { IPayDetailsSummary } from "/src/shared/interface/IPayDetailsSummary";
import { IPageResponse } from "/src/shared/interface/IPageResponse";
import { IAdmissionReport } from "/src/shared/interface/IAdmissionReport";
import { IStaffReport } from "/src/shared/interface/IStaffReport";
import { IStockReport } from "/src/shared/interface/IStockReport";
import { Dayjs } from "dayjs";
import { IPageRequest } from "/src/shared/interface/IPageRequest";


export const reportApi = createApi({
    reducerPath: 'reportApi',
    baseQuery: baseQueryWithRetry("report"),
    tagTypes: ['Payment'],
    endpoints: (builder) => ({
        fetchTransactionHistory: builder.query<IPageResponse<IPayDetailsSummary>, IPageRequest<string>>({
            query: (item) => `/transaction/${item.data}?page=${item.page}`,
            providesTags: ['Payment']
        }),
        fetchStudentReport: builder.query<IAdmissionReport, void>({
            query: () => '/admission'
        }),
        fetchStaffReport: builder.query<IStaffReport, void>({
            query: () => '/staff'
        }),
        fetchInventoryReport: builder.query<IStockReport[], void>({
            query: () => '/inventory'
        })
    })
})

export const {  useFetchTransactionHistoryQuery, useFetchStudentReportQuery, useFetchStaffReportQuery, useFetchInventoryReportQuery } = reportApi;