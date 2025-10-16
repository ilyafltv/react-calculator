import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@redux/slices/expSlice'

export const store = configureStore({
  reducer: {
    exp: counterReducer
  },
})