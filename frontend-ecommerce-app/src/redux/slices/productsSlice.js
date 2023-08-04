import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  products: [],
  topProducts: {
    products: [],
    isloading: true,
    error: false,
    errorMessage: "",
  },
  isloading: true,
  error: false,
  errorMessage: "",
};
export const topProducts = createAsyncThunk(
  "products/topProducts",
  async () => {
    const data = await axios
      .get(`/api/products/top-products`)
      .then((res) => {
        toast.success("Top-Products have been fetched", {
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
          topProducts: {
            products: res.data.products,
            isloading: false,
            error: false,
            errorMessage: "",
          },
        };
      })
      .catch((e) => {
        toast.error("Failed to fetch top-products", {
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
          topProducts: {
            products: [],
            isloading: false,
            error: true,
            errorMessage: e.response.data.message,
          },
        };
      });
    return data;
  }
);
export const allProducts = createAsyncThunk(
  "products/allProducts",
  async (queries) => {
    const data = await axios
      .get(`/api/products?page=${queries.page}&keyword=${queries.keyword}`)
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
    builder.addCase(topProducts.fulfilled, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    builder.addCase(topProducts.rejected, (state, payload) => {
      return { ...state, ...payload.payload };
    });
  },
});
