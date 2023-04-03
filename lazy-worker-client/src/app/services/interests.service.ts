import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../redux/store'
import { apiPath, port } from './constants'

export const interestsAPI = createApi({
  reducerPath: 'interestsAPI',
  tagTypes: ['Post'],
  baseQuery: fetchBaseQuery({
    baseUrl: apiPath+":"+port.toString()+'/api/users/',
    prepareHeaders: (headers, { getState }) => {
      console.log('idk', (getState() as RootState).authReducer)
      const { access_token } = (getState() as RootState).authReducer
      console.log('interestsAPI:: prepareHeaders access_token:', access_token)
      if (access_token) {
        headers.set('authorization', `Bearer ${access_token}`)
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    addInterest: build.mutation<any, any>({
      query: ({interest,email}) => ({
        url: `addinterest`,
        method: 'POST',
        body : {interest, email}
      }),
    }),
    getInterests: build.mutation<any, any>({
      query: (email) => ({
        url: `getInterests`,
        method: 'POST',
        body : {email}
      }),
    }),
    removeInterest: build.mutation<any, any>({
      query: ({interest, email}) => ({
        url: `removeInterest`,
        method: 'POST',
        body : {interest, email}
      }),
    }),
  }),
})

export const { useAddInterestMutation, useRemoveInterestMutation, useGetInterestsMutation } = interestsAPI
