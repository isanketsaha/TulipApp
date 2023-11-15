


import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "/src/configs/BaseApi";
import { IPageRequest } from "/src/shared/interface/IPageRequest";
import { IPay } from "/src/shared/interface/IPay";
import { IPayDetailsSummary } from "/src/shared/interface/IPayDetailsSummary";
import { IPageResponse } from "/src/shared/interface/IPageResponse";
import { IPayGraph } from "/src/shared/interface/IPayGraph";
import { IPayGraphFilter } from "/src/shared/interface/IFeesGraphFilter";
import { IExpenseItem } from "/src/shared/interface/IExpenseItems";



export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: baseQueryWithRetry("payment"),
    tagTypes: ['Payment'],
    endpoints: (builder) => ({
        payment: builder.mutation<number, IPay>({
            invalidatesTags: (result) => result ? [{ type: 'Payment', id: result }] : ['Payment'],
            query: (pay) => {
                return {
                  url: "",
                  method: "POST",
                  body: pay,
                }
            },

        }),
        fetchPaymentDetailsById: builder.query<IPayDetailsSummary, string>({
            query: (payId) => `/details/${payId}`,
            providesTags: (result, error, id) => [{ type: 'Payment', id }]
        }),
        fetchPaymentHistory: builder.query<IPageResponse<IPayDetailsSummary>, IPageRequest<number>>({
            query: (pay) => `/history/${pay.data}?page=${pay.page}`,
            providesTags: () => ['Payment']

        }),
        fetchFeesGraph: builder.query<IPayGraph, IPayGraphFilter>({
            query: (item) => `/feesgraph/${item.studentId}/${item.classId}`,
            providesTags: ['Payment'],
            transformResponse: (response: IPayGraph) => {
                const months = response?.paidMonths.map(month => month.split("/")[0]);
                return {
                    ...response,
                    paidMonths: months,
                }
            }
        }),
        addExpense: builder.mutation<number, IExpenseItem[]>({
            invalidatesTags: (result) => result ? [{ type: 'Payment', id: result }] : ['Payment'],
            query: (expense) => {
                return ({
                    url: '/expense',
                    method: 'POST',
                    body: expense
                });
            },
        }),
        editPayment: builder.mutation<number, { paymentId: number, itemId: number, payTypeEnum: string }>({
            query: (editVm) => {
                return ({
                    url: '/edit',
                    method: 'POST',
                    body: editVm
                });
            },
            invalidatesTags: (result) => result ? [{ type: 'Payment', id: result }] : ['Payment']
        }),
        deletePayment: builder.mutation<number, number>({
            query: (id) => {
                return ({
                    url: `/delete?transactionId=${id}`,
                    method: 'POST'
                });
            },
            invalidatesTags: (result) => result ? [{ type: 'Payment', id: result }] : ['Payment']
        }),
        allDues: builder.query<IPayDetailsSummary[], void>({
            query: () => `/dues/all`,
            providesTags: () => ['Payment']
        }),
        duesPayment: builder.mutation<number, any>({
            query: (duePay) => {
                return ({
                    url: '/duePayment',
                    method: 'POST',
                    body: duePay
                });
            },
            invalidatesTags: (result) => result ? [{ type: 'Payment', id: result }] : ['Payment']
        })
    })
});

export const { usePaymentMutation, useFetchPaymentDetailsByIdQuery, useFetchPaymentHistoryQuery,
    useFetchFeesGraphQuery, useAddExpenseMutation, useEditPaymentMutation, useDeletePaymentMutation,
    useAllDuesQuery, useDuesPaymentMutation } = paymentApi

