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
  reducerPath: "reportApi",
  baseQuery: baseQueryWithRetry("report"),
  tagTypes: ["Payment", "AdmissionReport", "StaffReport", "InventoryReport", "TransportReport", "Payment"],
  endpoints: (builder) => ({
    fetchTransactionHistory: builder.query<IPayDetailsSummary[], string>({
      query: (item) => `/transaction/${item}`,
      providesTags: ["Payment"],
    }),
    fetchStudentReport: builder.query<IAdmissionReport, void>({
      query: () => "/admission",
      providesTags: ["AdmissionReport"],
    }),
    fetchStaffReport: builder.query<IStaffReport, void>({
      query: () => "/staff",
      providesTags: ["StaffReport"],
    }),
    fetchInventoryReport: builder.query<IStockReport[], void>({
      query: () => "/inventory",
      providesTags: ["InventoryReport"],
    }),
    fetchTransportReport: builder.query<Record<string, number>, void>({
      query: () => "/transport",
      providesTags: ["TransportReport"],
    }),
    fetchSalesReport: builder.query<Record<string, Record<string, number>>, string>({
      query: (date) => "/sales?date=" + date,
      providesTags: ["Payment"],
    }),
  }),
})

export const {
  useFetchTransactionHistoryQuery,
  useFetchStudentReportQuery,
  useFetchStaffReportQuery,
  useFetchInventoryReportQuery,
  useFetchTransportReportQuery,
  useFetchSalesReportQuery,
} = reportApi