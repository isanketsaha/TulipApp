import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { baseQueryWithRetry } from "/src/configs/BaseApi"

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQueryWithRetry("profile"),
  endpoints: (builder) => ({
    checkUserIdExist: builder.mutation<boolean, string>({
      query: (userId) => {
        return {
          url: `/checkUserId?userId=${userId}`,
          method: "POST",
        }
      },
    }),
    resetPassword: builder.mutation<void, { password: string; userId: string }>({
      query: (credential) => {
        return {
          url: "/resetCredential",
          method: "POST",
          body: credential,
        }
      },
    }),
  }),
})

export const { useCheckUserIdExistMutation, useResetPasswordMutation } = profileApi
