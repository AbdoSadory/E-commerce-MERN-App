import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: localStorage.getItem('items')
    ? JSON.parse(localStorage.getItem('items'))
    : [],
}
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, payload) {
      const item = payload.payload
      console.log(item)
      let isExist = state.items.find(
        (element) => element._id === item.product._id
      )
      console.log(Boolean(isExist))
      if (!isExist) {
        let newState = {
          items: [...state.items, item],
        }
        localStorage.setItem('items', JSON.stringify(newState.items))
        return newState
      }
    },
    removeItem(state, payload) {},
  },
})

export const { addItem, removeItem } = cartSlice.actions
