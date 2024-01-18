import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "/src/configs/BaseApi";
import { IPageResponse } from "/src/shared/interface/IPageResponse";
import { IAudit } from "/src/shared/interface/IAudit";


export const auditApi = createApi({
  reducerPath: "auditApi",
  baseQuery: baseQueryWithRetry("audit"),
  tagTypes: ["Audit"],
  endpoints: (builder) => ({
    fetchAudit: builder.query<IPageResponse<IAudit>, number>({
      query: (item) => `?page=${item}`,
    }),
    updateResolved: builder.mutation<void, number>({
      query: (item) => `/resolved?id=${item}`,
    }),
  }),
})

export const {useFetchAuditQuery, useUpdateResolvedMutation} = auditApi;