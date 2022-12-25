import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { LoginDTO } from "../../../../interface/login";
import { UserAuth } from "../../../../interface/UserAuth";
import { login } from "../../../slices/UserAuthSlice";




export const loginApi = createApi({
    reducerPath: 'loginApi',
    baseQuery: baseQueryWithRetry,
    endpoints: (builder) => ({
        loginUser: builder.mutation<UserAuth, Partial<LoginDTO>>({
            query: (code: LoginDTO) => {
                return ({
                    url: 'authenticate',
                    credentials: 'include',
                    method: 'POST',
                    body: code 
                });
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                  const { data } = await queryFulfilled;
                  dispatch(login(data));
                  sessionStorage.setItem("tulipAuth", JSON.stringify(data));
                } catch (error) {}
              },
        }),

    }),
});

export const { useLoginUserMutation } = loginApi;