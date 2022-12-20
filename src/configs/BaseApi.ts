import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query'
import { RootState } from '../store'


// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8081/api/',
    prepareHeaders: (headers, { getState }) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        // const token = (getState() as RootState);
        // if (token) {
        //     headers.set('authentication', `Bearer ${token}`)
        // }
        return headers
    },
})

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 })


