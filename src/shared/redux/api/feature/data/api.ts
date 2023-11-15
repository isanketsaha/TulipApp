import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { baseQueryWithRetry } from "/src/configs/BaseApi"

export const dataeApi = createApi({
  reducerPath: "dataload",
  tagTypes: ["AdmissionReport", "Session", "Student"],
  baseQuery: baseQueryWithRetry("dataload"),
  endpoints: (builder) => ({
    addSession: builder.mutation<void, any>({
      query: (body: any) => {
        return {
          url: "newSession",
          method: "POST",
          body,
        }
      },
      invalidatesTags: ["Session"],
    }),
  }),
})
export const { useAddSessionMutation } = dataeApi
