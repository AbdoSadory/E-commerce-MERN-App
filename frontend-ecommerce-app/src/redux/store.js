import { configureStore } from '@reduxjs/toolkit'
import { productsSlice } from './slices/productsSlice'
import { productDetailsSlice } from './slices/productDetailsSlice'
import { cartSlice } from './slices/cartSlice'

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    productDetails: productDetailsSlice.reducer,
    cart: cartSlice.reducer,
  },
  devTools: true,
})
export default store
