


import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "/src/configs/BaseApi";
import { IPageRequest } from "/src/shared/interface/IPageRequest";
import { IPay } from "/src/shared/interface/IPay";
import { IPayDetailsSummary } from "/src/shared/interface/IPayDetailsSummary";
import { IPageResponse } from "/src/shared/interface/IPageResponse";



export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: baseQueryWithRetry("payment"),
    endpoints: (builder) => ({
        payment: builder.mutation<number, IPay>({
            query: (pay) => {
                return ({
                    url: '/',
                    method: 'POST',
                    body: pay 
                });
            },
        }),
        fetchPaymentDetailsById: builder.query<IPayDetailsSummary, string>({
            query: (payId) => `/details/${payId}`
        }),
        fetchPaymentHistory: builder.query<IPageResponse<IPayDetailsSummary>, IPageRequest<number>>({
            query: (pay) => `/history/${pay.data}?page=${pay.page}`
        })

    })
});

export const {usePaymentMutation, useFetchPaymentDetailsByIdQuery, useFetchPaymentHistoryQuery} = paymentApi

