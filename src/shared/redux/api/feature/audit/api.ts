import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "/src/configs/BaseApi";
import { IBasicDetails } from "/src/shared/interface/IBasicDetails";
import { IClassDetails } from "/src/shared/interface/IClassDetails";
import { IPageResponse } from "/src/shared/interface/IPageResponse";
import { IAudit } from "/src/shared/interface/IAudit";
import { IPageRequest } from "/src/shared/interface/IPageRequest";


export const auditApi = createApi({
    reducerPath: 'auditApi',
    baseQuery: baseQueryWithRetry("audit"),
    endpoints: (builder) => ({
        fetchAudit: builder.query<IPageResponse<IAudit>, number>({
            query: (item) => `?page=${item}`
        })
    })
});

export const {useFetchAuditQuery} = auditApi;