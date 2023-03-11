import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILoginRequest } from '../interfaces/login.interface'
import { IRegisterRequest } from '../interfaces/register.interface'


export const authAPI = createApi({
  reducerPath: 'authAPI',
  tagTypes: ['Post'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/auth/',
  }),
  endpoints: (build) => ({
    login: build.mutation<any, ILoginRequest>({
      query: ({ email, password }) => ({
        url: `login`,
        method: 'POST',
        body: { email, password },
      }),
    }),
    register: build.mutation<any, IRegisterRequest>({
      query: ({ email, password, name }) => ({
        url: `register`,
        method: 'POST',
        body: { email, password, name },
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authAPI
