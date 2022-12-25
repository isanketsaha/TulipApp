import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";


export const finacialYearApi = createApi({
    reducerPath: 'financialYear',
    baseQuery: baseQueryWithRetry,
    endpoints: (builder) => ({
        fetchCurrentFinancialYear : builder.query<void,void>({
            query: () => "financialYear/current"

        }),
        fetchAllFinacialYear: builder.query<void,void>({
            query: () => "financialYear/all"
        }),
    }),

});


export const { useFetchCurrentFinancialYearQuery, useFetchAllFinacialYearQuery } = finacialYearApi