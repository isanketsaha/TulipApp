import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../configs/BaseApi";
import { LoginDTO } from "../../../interface/login";
import { UserAuth } from "../../../interface/UserAuth";


export const loginApi = createApi({
    reducerPath: 'loginApi',
    baseQuery: baseQueryWithRetry,
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (code: LoginDTO) => {
                return ({
                    url: 'authenticate',
                    credentials: 'include',
                    method: 'POST',
                    body: code 
                });
            }
        }),
    }),
});

export const { useLoginUserMutation } = loginApi;