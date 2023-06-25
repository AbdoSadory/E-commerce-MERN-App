import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
const initialState = {
  product: {},
  isloading: true,
  error: false,
  errorMessage: '',
}
let lastProduct

export const getProductDetails = createAsyncThunk(
  'product/getProduct',
  async (id) => {
    if (lastProduct && lastProduct.product._id === id) {
      return lastProduct
    }
    const data = await axios
      .get(`/api/products/${id}`)
      .then((res) => {
        const result = {
          product: res.data,
          isloading: false,
          error: false,
          errorMessage: '',
        }
        lastProduct = result
        toast.success('Product has been fetched', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        return result
      })
      .catch((e) => {
        toast.error('Failed to fetch product details', {
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
          errorMessage: e.response.data.message,
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
      return { ...state, ...payload.payload }
    })
    builder.addCase(getProductDetails.rejected, (state, payload) => {
      return { ...state, ...payload.payload }
    })
  },
})
