import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  admin: {},
  isloading: false,
  error: false,
  errorMessage: "",
};

export const getUsers = createAsyncThunk(
  "admin/getUsers",
  async (adminDetails) => {
    const data = await axios
      .get("/api/users", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${adminDetails.token}`,
        },
      })
      .then((res) => {
        toast.success(`Users have been fetched`, {
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
          admin: { users: res.data },
          isloading: false,
          error: false,
          errorMessage: "",
        };
      })
      .catch((e) => {
        toast.error("Failed to fetch users", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return {
          isloading: false,
          error: true,
          errorMessage: e.response.data,
        };
      });
    return data;
  }
);
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (details) => {
    const data = await axios
      .delete(`/api/users/${details.userID}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${details.token}`,
        },
      })
      .then((res) => {
        toast.success(`User has been deleted`, {
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
          isloading: false,
          error: false,
          errorMessage: "",
        };
      })
      .catch((e) => {
        toast.error("Failed to delete the user", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return {
          isloading: false,
          error: true,
          errorMessage: e.response.data,
        };
      });
    return data;
  }
);
export const getUser = createAsyncThunk("admin/getUser", async (details) => {
  const data = await axios
    .get(`/api/users/${details.userID}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${details.token}`,
      },
    })
    .then((res) => {
      toast.success(`User has been fetched`, {
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
        admin: { user: res.data },
        isloading: false,
        error: false,
        errorMessage: "",
      };
    })
    .catch((e) => {
      toast.error("Failed to fetch the user", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return {
        isloading: false,
        error: true,
        errorMessage: e.response.data,
      };
    });
  return data;
});
export const updateUserProfile = createAsyncThunk(
  "admin/updateUserProfile",
  async (newProfileData) => {
    if (
      !newProfileData.name &&
      !newProfileData.email &&
      !newProfileData.password &&
      newProfileData.isAdmin === null
    ) {
      console.log(newProfileData);
      return {
        error: true,
        errorMessage: "No Data To Update !",
      };
    }
    const data = await axios
      .post(`/api/users/${newProfileData.id}`, newProfileData, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${newProfileData.token}`,
        },
      })
      .then((res) => {
        toast.success(`User Profile Has Been Updated`, {
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
          admin: { user: res.data },
          isloading: false,
          error: false,
          errorMessage: "",
        };
      })
      .catch((e) => {
        toast.error("Failed to update user profile", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return {
          error: true,
          errorMessage: e.response.data.message,
        };
      });
    return data;
  }
);

export const addProduct = createAsyncThunk(
  "order/addProduct",
  async (productDetailsObject) => {
    const data = axios
      .post("/api/products", productDetailsObject.product, {
        headers: {
          Authorization: `Bearer ${productDetailsObject.token}`,
        },
      })
      .then((res) => {
        toast.success(`product has been Sent `, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        const result = {
          product: res.data,
          isloading: false,
          error: false,
          errorMessage: "",
        };
        return result;
      })
      .catch((e) => {
        toast.error("Failed to add product", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(e.message);
        return {
          isloading: false,
          error: true,
          errorMessage: e.message,
        };
      });

    return data;
  }
);
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (details) => {
    const data = await axios
      .delete(`/api/products/${details.userID}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${details.token}`,
        },
      })
      .then((res) => {
        toast.success(`Product has been deleted`, {
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
          isloading: false,
          error: false,
          errorMessage: "",
        };
      })
      .catch((e) => {
        toast.error("Failed to delete the Product", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return {
          isloading: false,
          error: true,
          errorMessage: e.response.data,
        };
      });
    return data;
  }
);
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async (productDetails) => {
    const data = await axios
      .put(
        `/api/products/${productDetails.product.id}`,
        productDetails.product,
        {
          headers: {
            authorization: `Bearer ${productDetails.token}`,
          },
        }
      )
      .then((res) => {
        toast.success(`Product has been updated `, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const result = {
          product: res.data,
          isloading: false,
          error: false,
          errorMessage: "",
        };
        return result;
      })
      .catch((e) => {
        toast.error("Couldn't update the product", {
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
          isloading: false,
          error: true,
          errorMessage: e.response.data.message,
        };
      });
    return data;
  }
);

export const getOrders = createAsyncThunk(
  "admin/getOrders",
  async (adminDetails) => {
    const data = await axios
      .get("/api/orders/admin/orders", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${adminDetails.token}`,
        },
      })
      .then((res) => {
        toast.success(`Orders have been fetched`, {
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
          admin: { orders: res.data },
          isloading: false,
          error: false,
          errorMessage: "",
        };
      })
      .catch((e) => {
        toast.error("Failed to fetch orders", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return {
          isloading: false,
          error: true,
          errorMessage: e.response.data,
        };
      });
    return data;
  }
);
export const updateOrderToDelivered = createAsyncThunk(
  "order/updateOrderToDelivered",
  async (OrderDetails) => {
    const data = await axios
      .patch(
        `/api/orders/admin/order/${OrderDetails.orderId}/delivery`,
        OrderDetails,
        {
          headers: {
            authorization: `Bearer ${OrderDetails.token}`,
          },
        }
      )
      .then((res) => {
        toast.success(`Order has been updated to be delivered `, {
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
          admin: { orders: res.data },
          isloading: false,
          error: false,
          errorMessage: "",
        };
      })
      .catch((e) => {
        toast.error("Couldn't update the order", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return {
          isloading: false,
          error: true,
          success: false,
        };
      });
    return data;
  }
);
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    builder.addCase(getUsers.rejected, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    // =======
    builder.addCase(deleteUser.fulfilled, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    builder.addCase(deleteUser.rejected, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    // =======
    builder.addCase(getUser.fulfilled, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    builder.addCase(getUser.rejected, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    // =======
    builder.addCase(updateUserProfile.fulfilled, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    builder.addCase(updateUserProfile.rejected, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    // =======
    builder.addCase(deleteProduct.fulfilled, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    builder.addCase(deleteProduct.rejected, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    // =======
    builder.addCase(addProduct.fulfilled, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    builder.addCase(addProduct.rejected, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    // =======
    builder.addCase(updateProduct.fulfilled, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    builder.addCase(updateProduct.rejected, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    // =======
    builder.addCase(getOrders.fulfilled, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    builder.addCase(getOrders.rejected, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    // =======
    builder.addCase(updateOrderToDelivered.fulfilled, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    builder.addCase(updateOrderToDelivered.rejected, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    // =======
  },
});
