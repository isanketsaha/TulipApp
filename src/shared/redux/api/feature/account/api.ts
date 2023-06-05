import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "/src/configs/BaseApi";
import { IPageRequest } from "/src/shared/interface/IPageRequest";
import { ITransactionReportFilter } from "/src/shared/interface/ITransactionReportFilter";
import { ITransactionReportSummary } from "/src/shared/interface/ITransactionReportSummary";

export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: baseQueryWithRetry("account"),
    tagTypes:['Account','Transaction'],
    endpoints: (builder) => ({
        fetchTransactionReport: builder.query<ITransactionReportSummary, ITransactionReportFilter>({
            query: (item) => `/finance?from=${item.fromDate}&to=${item.toDate}&groupByType=${item.groupByType}`,
            providesTags: ['Account', 'Transaction']
        })
    })
});

export const {useFetchTransactionReportQuery} = accountApi;