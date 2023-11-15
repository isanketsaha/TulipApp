import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";
import { IFeesCatalog } from "../../../../interface/IFeesCatalog";
import { IProductCatlog } from "../../../../interface/IProductCatalog";
import { ITransportCatalog } from "/src/shared/interface/ITransportCatalog"

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  tagTypes: ["FeesCatalog", "TransportCatalog", "ProductCatalog", "InventoryReport"],
  baseQuery: baseQueryWithRetry("catalog"),
  endpoints: (builder) => ({
    fetchAllProductCatalog: builder.query<IProductCatlog[], number>({
      query: (id) => `/product/${id}`,
      providesTags: () => [{ type: "ProductCatalog" }],
    }),

    fetchAllfeesCatalog: builder.query<IFeesCatalog[], { classId: number; studentId: number }>({
      query: (id) => `/fees/${id.classId}?studentId=${id.studentId}`,
      providesTags: () => [{ type: "FeesCatalog" }],
    }),
    fetchAllTransportCatalog: builder.query<ITransportCatalog[], number | undefined>({
      query: (id) => `/transport?sessionId=${id}`,
      providesTags: () => [{ type: "TransportCatalog" }],
    }),

    updateProductVisibility: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `/productVisibility?productId=${id}`,
          method: "POST",
        }
      },
      invalidatesTags: ["InventoryReport", "ProductCatalog"],
    }),
    updateStock: builder.mutation<
      void,
      { product: { itemName: string; price: number }; purchasedQty: number; stockId: number }
    >({
      query: (item) => {
        return {
          url: `/updateStock`,
          method: "POST",
          body: item,
        }
      },
      invalidatesTags: ["InventoryReport", "ProductCatalog"],
    }),
  }),
})

export const {
  useFetchAllProductCatalogQuery,
  useFetchAllfeesCatalogQuery,
  useUpdateProductVisibilityMutation,
  useUpdateStockMutation,
  useFetchAllTransportCatalogQuery,
  useLazyFetchAllTransportCatalogQuery,
} = catalogApi