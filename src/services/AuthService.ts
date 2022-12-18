import { baseApi } from "../configs/BaseApi";

const AuthService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.query<string, void>({
            query: () => 'login',
        }),
        logout: build.query<void,void>({
            query:()=> 'logout'
        })
    })
})