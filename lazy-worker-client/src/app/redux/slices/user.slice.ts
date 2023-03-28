import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  userId: number
  email: string
  name: string
  interests: string[]
}

const initialState: UserState = {
  userId: -1,
  email: '',
  interests: [],
  name: '',
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser(state: UserState, { payload }: PayloadAction<UserState>) {
      state.userId = payload.userId
      state.email = payload.email
      state.name = payload.name
      state.interests = payload.interests
    },
  },
})

export const { setUser } = userSlice.actions
export const userReducer = userSlice.reducer
