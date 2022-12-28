import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { IFinancialYear } from "../../../../interface/IFinancialYear";


export const finacialYearApi = createApi({
    reducerPath: 'financialYear',
    baseQuery: baseQueryWithRetry("financialYear"),
    endpoints: (builder) => ({
        fetchCurrentFinancialYear : builder.query<IFinancialYear,void>({
            query: () => "/current"

        }),
        fetchAllFinacialYear: builder.query<IFinancialYear[],void>({
            query: () => "/all"
        }),
    }),

});


export const { useFetchCurrentFinancialYearQuery, useFetchAllFinacialYearQuery } = finacialYearApi