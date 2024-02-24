import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { baseQueryWithRetry } from "/src/configs/BaseApi"
import { UploadFile, message } from "antd"

export const dataeApi = createApi({
  reducerPath: "dataload",
  tagTypes: ["AdmissionReport", "SessionList", "Student", "Upload"],
  baseQuery: baseQueryWithRetry("dataload"),
  endpoints: (builder) => ({
    addSession: builder.mutation<void, any>({
      query: (body) => {
        return {
          url: "addSession",
          method: "POST",
          body,
        }
      },
      invalidatesTags: ["SessionList"],
    }),
    add: builder.mutation<{ type: string; file: UploadFile[] }, any>({
      query: (body) => {
        return {
          url: "add",
          method: "POST",
          body,
        }
      },
      invalidatesTags: ["Upload"],
    }),
    fetchAll: builder.query<UploadFile[], string | void>({
      query: (type) => `/all${type ? "?type=" + type : ""}`,
      providesTags: () => [{ type: "Upload" }],
    }),
    fetchUrl: builder.query<string, string>({
      query: (uuid) => {
        return {
          url: `/url?uuid=${uuid}`,
          method: "GET",
          responseHandler: async (response) =>
            response.status == 200
              ? response.text().then((val) => window.open(val, "_blank"))
              : message.error("Error Occurred , Status " + response.status),
          cache: "no-cache",
        }
      },
    }),
  }),
})
export const { useAddSessionMutation, useAddMutation, useFetchAllQuery, useLazyFetchUrlQuery } = dataeApi
