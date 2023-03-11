import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ArticleState {
  email: string
  name: string
  interests: string[]
}

const initialState: ArticleState = {
  email: '',
  name: '',
  interests: [],
}

export const articlesSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setArticles(state: ArticleState, { payload }: PayloadAction<ArticleState>) {
      state.email = payload.email
      state.name = payload.name
      state.interests = payload.interests
    },
  },
})

export const { setArticles } = articlesSlice.actions
export const articlesReducer = articlesSlice.reducer
