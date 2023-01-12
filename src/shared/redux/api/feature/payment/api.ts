import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { IPay } from "../../../../interface/IPay";



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
    })
});

export const {usePaymentMutation} = paymentApi