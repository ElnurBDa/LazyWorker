import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../redux/store'

export const articlesAPI = createApi({
  reducerPath: 'articlesAPI',
  tagTypes: ['Post'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/article/',
    prepareHeaders: (headers, { getState }) => {
      console.log('idk', (getState() as RootState).authReducer)
      const { access_token } = (getState() as RootState).authReducer
      console.log('articlesAPI:: prepareHeaders access_token:', access_token)
      if (access_token) {
        headers.set('authorization', `Bearer ${access_token}`)
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    getAllArticles: build.mutation<any, null>({
      query: () => ({
        url: `all`,
        method: 'GET',
      }),
    }),
    getMyArticles: build.mutation<any, null>({
      query: () => ({
        url: `my`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetAllArticlesMutation, useGetMyArticlesMutation } = articlesAPI
