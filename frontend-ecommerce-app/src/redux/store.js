import { configureStore } from '@reduxjs/toolkit'
import { productsSlice } from './slices/productsSlice'
import { productDetailsSlice } from './slices/productDetailsSlice'
import { cartSlice } from './slices/cartSlice'
import { userSlice } from './slices/userSlice'
import { orderSlice } from './slices/orderSlice'
import { adminSlice } from './slices/adminSlice'

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    productDetails: productDetailsSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    order: orderSlice.reducer,
    admin: adminSlice.reducer,
  },
  devTools: true,
})
export default store
