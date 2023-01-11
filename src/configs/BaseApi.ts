import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query'
import { RootState } from '../store'



// Create our baseQuery instance
const baseQuery = (baseUrl: string) => fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}/${baseUrl}`,
    prepareHeaders: (headers, { getState }) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const auth = (getState() as RootState);
        if (auth.userAuth.user != null) {
            headers.set('authorization', `Bearer ${auth.userAuth.user.idToken}`);
            headers.set("session_year", auth.commonData.selectedSession.value);
        }
        return headers
    },
})

export const baseQueryWithRetry = (baseUrl: string) => retry(baseQuery(baseUrl), { maxRetries: 1 })


