import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithRetry } from "../../../../../configs/BaseApi";


export const onboardingApi = createApi({
    reducerPath: 'onboarding',
    tagTypes: ['Student','Employee', 'AdmissionReport', 'StaffReport'],
    baseQuery: baseQueryWithRetry("onboarding"),
    endpoints: (builder) => ({
        onboardUser: builder.mutation<any, number>({
            query: (onboardingVm: any) => {
                return {
                  url: "",
                  method: "POST",
                  body: onboardingVm,
                }
            },
            invalidatesTags:['Student','Employee', 'AdmissionReport', 'StaffReport'],
        }),
    })
});

export const {useOnboardUserMutation} = onboardingApi