import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
const initialState = {
  product: {},
  isloading: true,
  error: false,
  errorMessage: '',
}
export const getProductDetails = createAsyncThunk(
  'product/getProduct',
  async (id) => {
    const data = await axios
      .get(`/api/products/${id}`)
      .then((res) => {
        return {
          product: res.data,
          isloading: false,
          error: false,
          errorMessage: '',
        }
      })
      .catch((e) => {
        toast.error(e.response.data.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        console.log(e)
        return {
          product: {},
          isloading: false,
          error: true,
          errorMessage: e.message,
        }
      })
    return data
  }
)

export const productDetailsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductDetails.fulfilled, (state, payload) => {
      state.initialState = { ...state.initialState, ...payload.payload }
    })
    builder.addCase(getProductDetails.rejected, (state, payload) => {
      state.initialState = { ...state.initialState, ...payload.payload }
    })
  },
})
// export const { fetchingProducts } = productDetailsSlice.actions
