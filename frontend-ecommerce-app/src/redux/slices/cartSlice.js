import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: localStorage.getItem('items')
    ? JSON.parse(localStorage.getItem('items'))
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},
  paymentMethod: localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : 'PayPal',
  isloading: false,
  error: false,
  errorMessage: '',
}
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, payload) {
      const item = payload.payload
      let isExist = state.items.find(
        (element) => element.product._id === item.product._id
      )
      if (!isExist) {
        let newState = {
          items: [...state.items, item],
        }
        localStorage.setItem('items', JSON.stringify(newState.items))
        return { ...state, ...newState }
      } else {
        state.items = state.items.map((element) => {
          if (element.product._id === item.product._id) {
            element.qty = item.qty
          }
          return element
        })
        localStorage.setItem('items', JSON.stringify(state.items))
        return state
      }
    },
    removeItem(state, payload) {
      let newitems = state.items.filter(
        (item) => item.product._id !== payload.payload
      )
      localStorage.setItem('items', JSON.stringify(newitems))
      return { ...state, items: newitems }
    },
    addShippingAddress(state, payload) {
      localStorage.setItem('shippingAddress', JSON.stringify(payload.payload))
      return { ...state, shippingAddress: payload.payload }
    },
    addPaymentMethod(state, payload) {
      localStorage.setItem('paymentMethod', JSON.stringify(payload.payload))
      return { ...state, paymentMethod: payload.payload }
    },
    clearCart(state, payload) {
      localStorage.removeItem('items')
      return {
        ...state,
        items: [],
        isloading: false,
        error: false,
        errorMessage: '',
      }
    },
  },
})

export const {
  addItem,
  removeItem,
  addShippingAddress,
  addPaymentMethod,
  clearCart,
} = cartSlice.actions
