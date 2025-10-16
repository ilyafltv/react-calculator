import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "",
  history: [],
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
    addToHistory: (state, action) => {
      state.history.push(action.payload);
    },
    editHistory: (state, action) => {
      state.history = action.payload
    }
  },
})

export const { addItem, assignExp, clearExp, addToHistory, editHistory } = expSlice.actions

export default expSlice.reducer