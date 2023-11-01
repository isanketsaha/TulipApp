import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { IBasicDetails } from "../../../../interface/IBasicDetails";
import { IUserDetails } from "../../../../interface/IUserDetails";
import { message } from "antd"

export const employeeApi = createApi({
  reducerPath: "employee",
  baseQuery: baseQueryWithRetry("employee"),
  tagTypes: ["Employee"],
  endpoints: (builder) => ({
    fetchAllEmployee: builder.query<IBasicDetails[], void>({
      query: () => "/all",
      providesTags: () => [{ type: "Employee" }],
    }),
    fetchAllActiveEmployee: builder.query<IBasicDetails[], string | void>({
      query: (role) => `/all/active${role ? "?role=" + role : ""}`,
      providesTags: () => [{ type: "Employee" }],
    }),
    searchEmployeeById: builder.query<IUserDetails, string>({
      query: (id) => `/search/${id}`,
      providesTags: (result, error, arg) => [{ type: "Employee", id: result?.id }],
    }),
    seachEmployeeByName: builder.query<IBasicDetails[], string>({
      query: (name) => `/searchByName/${name}`,
    }),
    editEmployee: builder.mutation<void, void>({
      query: () => "/edit",
    }),
    forgotPassword: builder.query<void, number>({
      query: (id) => `/forgotPassword?id=${id}`,
    }),
    terminateEmployee: builder.query<void, number>({
      query: (id) => `/terminate?id=${id}`,
    }),
    generateJoiningLetter: builder.query<void, number>({
      query: (id) => {
        return {
          url: `/joiningLetter?empId=${id}`,
          method: "GET",
          responseHandler: async (response) =>
            response.status == 200
              ? window.open(window.URL.createObjectURL(await response.blob()), "_blank")
              : message.error("Error Occurred , Status " + response.status),
          cache: "no-cache",
        }
      },
    }),
  }),
})

export const {
  useFetchAllEmployeeQuery,
  useFetchAllActiveEmployeeQuery,
  useLazyFetchAllActiveEmployeeQuery,
  useEditEmployeeMutation,
  useSeachEmployeeByNameQuery,
  useSearchEmployeeByIdQuery,
  useLazyForgotPasswordQuery,
  useLazyTerminateEmployeeQuery,
  useLazyGenerateJoiningLetterQuery,
} = employeeApi