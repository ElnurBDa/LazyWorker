import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  email: string
  name: string
  interests: string[]
}

const initialState: UserState = {
  email: '',
  interests: [],
  name: '',
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser(state: UserState, { payload }: PayloadAction<UserState>) {
      state.email = payload.email
      state.name = payload.name
      state.interests = payload.interests
    },
  },
})

export const { setUser } = userSlice.actions
export const userReducer = userSlice.reducer
