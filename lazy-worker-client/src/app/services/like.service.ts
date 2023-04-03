import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILikeRequest } from '../interfaces/like.interface'
import { apiPath, port } from './constants'


export const likeAPI = createApi({
  reducerPath: 'likeAPI',
  tagTypes: ['Post'],
  baseQuery: fetchBaseQuery({
    baseUrl: apiPath+":"+port.toString()+'/api/like/',
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
