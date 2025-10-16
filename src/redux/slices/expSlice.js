import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "",
}

export const expSlice = createSlice({
  name: 'exp',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.value += action.payload
    },
    assignExp: (state, action) => {
      state.value = action.payload
    },
    clearExp: (state) => {
      state.value = ""
    },
  },
})

export const { addItem, assignExp, clearExp } = expSlice.actions

export default expSlice.reducer