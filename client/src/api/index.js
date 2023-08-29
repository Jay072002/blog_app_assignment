import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { app_url } from "../config/helper";


let baseUrl = app_url;

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/api`,
        prepareHeaders: (headers, { getState }) => {
            let token = sessionStorage.getItem("user_token");
            headers.set("authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUserDetails: builder.mutation({
            query: () => ({
                url: `/user`,
                method: "GET",
            }),
        }),
    }),
});

// Export hooks for usage in functional components
export const {

} = api;
