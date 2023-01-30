import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { IFeesCatalog } from "../../../../interface/IFeesCatalog";
import { IProductCatlog } from "../../../../interface/IProductCatalog";


export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    tagTypes: ['Catalog'],
    baseQuery: baseQueryWithRetry("catalog"),
    endpoints: (builder) => ({
        fetchAllProductCatalog: builder.query<IProductCatlog[], string>({
            query: (id) => `/product/${id}`,
            providesTags: () => [{ type: 'Catalog' }]
        }),


        fetchAllfeesCatalog: builder.query<IFeesCatalog[], string>({
            query: (id) => `/fees/${id}`,
            providesTags: () => [{ type: 'Catalog' }]
            
        }),
    })
});

export const {useFetchAllProductCatalogQuery, useFetchAllfeesCatalogQuery} = catalogApi;