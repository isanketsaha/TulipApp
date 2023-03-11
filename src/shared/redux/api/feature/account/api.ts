import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "/src/configs/BaseApi";
import { IPageRequest } from "/src/shared/interface/IPageRequest";
import { ITransactionReportFilter } from "/src/shared/interface/ITransactionReportFilter";
import { ITransactionReportSummary } from "/src/shared/interface/ITransactionReportSummary";

export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: baseQueryWithRetry("account"),
    tagTypes:['Account'],
    endpoints: (builder) => ({
        fetchTransactionReport: builder.query<ITransactionReportSummary, IPageRequest<ITransactionReportFilter>>({
            query: (item) => `/finance?from=${item.data.fromDate}&to=${item.data.toDate}&page=${item.page}`,
            providesTags: ['Account']
        })
    })
});

export const {useFetchTransactionReportQuery} = accountApi;