import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { app_url } from "../config/helper";

let baseUrl = app_url;

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}`,
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `/auth/login`,
                method: "POST",
                body: data,
            }),
        }),
        otpSend: builder.mutation({
            query: (data) => ({
                url: `/user/otp-login`,
                method: "POST",
                body: data,
            }),
        }),
        otpLogin: builder.mutation({
            query: (data) => ({
                url: `/user/check-otp`,
                method: "POST",
                body: data,
            }),
        }),
        forgotPasswordMail: builder.mutation({
            query: (data) => ({
                url: `/user/forgetPassword/mail`,
                method: "POST",
                body: data,
            }),
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: `/user/password/update`,
                method: "PUT",
                body: data,
            }),
        }),
        registerUser: builder.mutation({
            query: (data) => ({
                url: `/user/register`,
                method: "POST",
                body: data,
            }),
        }),
        checkUuid: builder.mutation({
            query: (query) => ({
                url: `/user/check-link?uuid=${query.uuid}`,
                method: "GET",
            }),
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: `/user/reset/password`,
                method: "POST",
                body: data,
            }),
        })
    }),
});

// Export hooks for usage in functional components
export const {
    useLoginMutation,
    useOtpSendMutation,
    useOtpLoginMutation,
    useForgotPasswordMailMutation,
    useChangePasswordMutation,
    useRegisterUserMutation,
    useCheckUuidMutation,
    useResetPasswordMutation
} = authApi;
