import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface AuthState {
  userId: number
  name: string
  email: string
  access_token: string
  interests: string[]
}

const initialState: AuthState = {
  userId: -1,
  name: '',
  email: '',
  access_token: '',
  interests: [],
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthenticatedUser: (state: AuthState, { payload }: PayloadAction<AuthState>) => {
      console.log('authSlice:: setAuthenticatedUser: ', payload)
      state.userId = payload.userId
      state.name = payload.name
      state.email = payload.email
      state.interests = payload.interests
      state.access_token = payload.access_token
    },
    resetState: (state: AuthState) => {
      state.userId = -1
      state.access_token = ''
      state.name = ''
      state.email = ''
      state.interests = []
      localStorage.setItem('user', '')
    },
  },
})

export const { setAuthenticatedUser, resetState } = authSlice.actions
export const authReducer = authSlice.reducer
export const selectAuthenticatedUser = (state: RootState) => state.authReducer
