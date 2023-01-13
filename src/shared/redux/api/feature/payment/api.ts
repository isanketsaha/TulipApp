import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { IPay } from "../../../../interface/IPay";
import { IPayDetailsSummary } from "../../../../interface/IPayDetailsSummary";
import { IPayDetailsFilter } from "../../../../interface/IPayDetailsFIlter";



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
        fetchPaymentDetailsById: builder.query<IPayDetailsSummary, IPayDetailsFilter>({
            query: (item) => `/details/${item.paymentType}/${item.paymentId}`
        }),

    })
});

export const {usePaymentMutation, useFetchPaymentDetailsByIdQuery} = paymentApi