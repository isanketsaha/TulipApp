import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "/src/configs/BaseApi";
import { message } from "antd";

export const exportApi = createApi({
    reducerPath: 'reportApi',
    baseQuery: baseQueryWithRetry("export"),
    tagTypes: ['Payment', 'AdmissionReport', 'StaffReport', 'InventoryReport'],
    endpoints: (builder) => ({
        exportStock: builder.mutation<any, void>({
            query: () => {
                return ({
                    url: '/stock',
                    method: 'POST',
                    responseHandler: async (response) => response.status == 200 ? window.location.assign(window.URL.createObjectURL(await response.blob())) : message.error("Error Occurred , Status " + response.status),
                    cache: "no-cache",
                });
            },
        }),
        exportStudent: builder.mutation<any, number>({
            query: (id) => {
                return ({
                    url: '/classStudents?classroomId=' + id,
                    method: 'POST',
                    responseHandler: async (response) => response.status == 200 ? window.location.assign(window.URL.createObjectURL(await response.blob())) : message.error("Error Occurred , Status " + response.status),
                    cache: "no-cache",
                });
            },
        }),
    })
})

export const { useExportStockMutation, useExportStudentMutation } = exportApi;