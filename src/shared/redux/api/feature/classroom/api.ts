import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { IClassDetails } from "../../../../interface/IClassDetails";
import { IClassList } from "/src/shared/interface/IClassList";
import { IPromote } from "/src/shared/interface/IPromote";
import { IFeesCatalog } from "/src/shared/interface/IFeesCatalog"
import { FeesRuleType } from "/src/shared/utils/FeesRuleType"

export const classroomApi = createApi({
  reducerPath: "classroomApi",
  tagTypes: ["Classroom", "Student"],
  baseQuery: baseQueryWithRetry("classroom"),
  endpoints: (builder) => ({
    fetchAllClassroom: builder.query<IClassList[], number>({
      query: (sessionId) => `all?sessionId=${sessionId}`,
      providesTags: ["Classroom"],
    }),
    fetchClassroomId: builder.query<number, { std: string; sessionId: number } | undefined>({
      query: (item) => (item ? `/id?std=${item.std}&sessionId=${item.sessionId}` : ""),
    }),
    fetchClassroomDetails: builder.query<IClassDetails, number | undefined>({
      query: (id) => `/details/${id}`,
      providesTags: (data) => [{ type: "Classroom", id: data?.id }],
    }),
    promoteStudent: builder.mutation<number, IPromote>({
      query: (payload) => {
        return {
          url: "/student-promote",
          method: "POST",
          body: payload,
        }
      },
      invalidatesTags: ["Classroom", "Student"],
    }),
    feesByRule: builder.mutation<Record<string, IFeesCatalog[]>, { std: number[] }>({
      query: (payload) => {
        return {
          url: "/feesByRule",
          method: "POST",
          body: payload,
        }
      },
      invalidatesTags: ["Classroom"],
    }),
  }),
})

export const {
  useFetchAllClassroomQuery,
  useLazyFetchAllClassroomQuery,
  useFetchClassroomDetailsQuery,
  usePromoteStudentMutation,
  useFetchClassroomIdQuery,
  useFeesByRuleMutation,
} = classroomApi