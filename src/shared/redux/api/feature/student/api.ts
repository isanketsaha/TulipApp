import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { IBasicDetails } from "../../../../interface/IBasicDetails";
import { IUserDetails } from "../../../../interface/IUserDetails";
import { IPageResponse } from "/src/shared/interface/IPageResponse";
import { Dayjs } from "dayjs"

export const studentApi = createApi({
  reducerPath: "studentApi",
  tagTypes: ["Student", "Classroom", "TransportReport"],
  baseQuery: baseQueryWithRetry("student"),
  endpoints: (builder) => ({
    fetchAllStudent: builder.query<IPageResponse<IBasicDetails>, number>({
      query: (page) => `/all?page=${page}`,
      providesTags: ["Student"],
    }),
    searchStudent: builder.query<IUserDetails, String | undefined>({
      query: (id) => `/search/${id}`,
      providesTags: ["Student"],
    }),
    searchStudentByName: builder.query<IBasicDetails[], string>({
      query: (name) => `/searchByName/${name}`,
    }),
    addTransport: builder.mutation<number, { studentId: number; locationId: number; startDate: Dayjs }>({
      query: (body) => {
        return {
          url: "/transport/add",
          method: "POST",
          body,
        }
      },
      invalidatesTags: ["TransportReport"],
    }),
    discontinueTransport: builder.query<void, { studentId: number; locationId: number }>({
      query: (payload) => `/transport/discontinue?id=${payload.studentId}&locationId=${payload.locationId}`,
      providesTags: (result) => ["TransportReport"],
    }),
    basicSearchById: builder.query<IBasicDetails, string>({
      query: (id) => `/basicSearch?id=${id}`,
      providesTags: (result) => (result ? [{ type: "Student", id: result.id }] : ["Student"]),
    }),
    basicSearchByIdAndClass: builder.query<IBasicDetails, { id: string | undefined; classId: string | undefined }>({
      query: (id) => `/basicSearch?id=${id.id}&classId=${id.classId}`,
      providesTags: (result) => (result ? [{ type: "Student", id: result.id }] : ["Student"]),
    }),
    deactivateStudent: builder.mutation<void, string>({
      query: (id) => `/deactivate?studentId=${id}`,
      invalidatesTags: ["Classroom", "Student"],
    }),
    editStudentDetails: builder.mutation<number, any>({
      query: (editUserVm: any) => {
        return {
          url: "/editStudentDetails",
          method: "POST",
          body: editUserVm,
        }
      },
      invalidatesTags: (result) => (result ? [{ type: "Student", id: result }] : ["Student"]),
    }),
  }),
})

export const {
  useFetchAllStudentQuery,
  useSearchStudentByNameQuery,
  useSearchStudentQuery,
  useAddTransportMutation,
  useBasicSearchByIdQuery,
  useBasicSearchByIdAndClassQuery,
  useDeactivateStudentMutation,
  useEditStudentDetailsMutation,
  useLazyDiscontinueTransportQuery,
} = studentApi