import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { IBasicDetails } from "../../../../interface/IBasicDetails";
import { IClassDetails } from "../../../../interface/IClassDetails";
import { IFeesCatalog } from "../../../../interface/IFeesCatalog";
import { ICatalogFilter } from "../../../../interface/ICatalogFilter";
import { updateFeesCatalog } from "../../../slices/CatalogSlice";


export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery: baseQueryWithRetry("catalog"),
    endpoints: (builder) => ({
        fetchAllfeesCatalog: builder.mutation<IFeesCatalog[], ICatalogFilter>({
            query: (filter) => {
                return ({
                    url: '/fees',
                    credentials: 'include',
                    method: 'POST',
                    body: filter
                })},
                async onQueryStarted(args, { dispatch, queryFulfilled }) {
                    try {
                      const { data } = await queryFulfilled;
                      dispatch(updateFeesCatalog(data));
                    } catch (error) {}
                  }
            
        })
    })
});

export const {useFetchAllfeesCatalogMutation} = catalogApi;