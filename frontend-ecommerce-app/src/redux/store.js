import { configureStore } from '@reduxjs/toolkit'
import { productsSlice } from './slices/productsSlice'
import { productDetailsSlice } from './slices/productDetailsSlice'

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    productDetails: productDetailsSlice.reducer,
  },
  devTools: true,
})
export default store
