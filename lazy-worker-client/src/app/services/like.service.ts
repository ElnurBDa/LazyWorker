import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILikeRequest } from '../interfaces/like.interface'


export const likeAPI = createApi({
  reducerPath: 'likeAPI',
  tagTypes: ['Post'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/like/',
  }),
  endpoints: (build) => ({
    likeArticle: build.mutation<any, ILikeRequest>({
      query: ({ postId, userId }) => ({
        url: ``,
        method: 'POST',
        body: { postId, userId },
      }),
    }),
  }),
})

export const { useLikeArticleMutation } = likeAPI
