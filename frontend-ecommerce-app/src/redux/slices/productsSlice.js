import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  products: [],
  isloading: true,
  error: false,
  errorMessage: "",
};
// console.log('hi from Product Slice', initialState)
export const allProducts = createAsyncThunk(
  "products/allProducts",
  async (keyword = "") => {
    const data = await axios
      .get(`/api/products?keyword=${keyword}`)
      .then((res) => {
        toast.success("Products have been fetched", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return {
          products: res.data,
          isloading: false,
          error: false,
          errorMessage: "",
        };
      })
      .catch((e) => {
        toast.error("Failed to fetch products", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(e);
        return {
          products: [],
          isloading: false,
          error: true,
          errorMessage: e.response.data.message,
        };
      });
    return data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allProducts.fulfilled, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    builder.addCase(allProducts.rejected, (state, payload) => {
      return { ...state, ...payload.payload };
    });
  },
});
