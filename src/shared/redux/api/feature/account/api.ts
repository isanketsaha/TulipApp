import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "/src/configs/BaseApi";
import { IPageResponse } from "/src/shared/interface/IPageResponse";
import { ITransactionReport } from "/src/shared/interface/ITransactionReport";
import { IPageRequest } from "/src/shared/interface/IPageRequest";
import { ITransactionReportFilter } from "/src/shared/interface/ITransactionReportFilter";

export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: baseQueryWithRetry("account"),
    tagTypes:['Account'],
    endpoints: (builder) => ({
        fetchTransactionReport: builder.query<ITransactionReport[], IPageRequest<ITransactionReportFilter>>({
            query: (item) => `/finance?from=${item.data.fromDate}&to=${item.data.toDate}&page=${item.page}`,
            providesTags: ['Account']
        })
    })
});

export const {useFetchTransactionReportQuery} = accountApi;