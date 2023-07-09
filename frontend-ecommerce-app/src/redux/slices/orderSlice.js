import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { clearCart } from "./cartSlice";
import { addOrders } from "./userSlice";
const initialState = {
  order: {
    orderItems: [],
    shippingAddress: {},
    paymentMethod: "",
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
  isloading: false,
  success: false,
  error: false,
  errorMessage: "",
  orderPay: {
    order: {},
    success: false,
    isloading: false,
    error: false,
  },
  userOrders: [],
};

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderDetailsObject, { dispatch }) => {
    const data = axios
      .post("/api/orders", orderDetailsObject, {
        headers: {
          Authorization: `Bearer ${orderDetailsObject.token}`,
        },
      })
      .then((res) => {
        toast.success(`Order has been Sent `, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch(clearCart());
        const result = {
          order: res.data.order,
          isloading: false,
          success: true,
          error: false,
          errorMessage: "",
        };
        return result;
      })
      .catch((e) => {
        toast.error("Failed to Order", {
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
          order: {},
          isloading: false,
          success: false,
          error: true,
          errorMessage: e.message,
        };
      });

    return data;
  }
);
export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (OrderDetails) => {
    const data = await axios
      .get(`/api/orders/${OrderDetails.orderId}`, {
        headers: {
          Authorization: `Bearer ${OrderDetails.token}`,
        },
      })
      .then((res) => {
        toast.success(`Order has been Fetched `, {
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
          order: res.data,
          isloading: false,
          success: true,
          error: false,
          errorMessage: "",
        };

        return result;
      })
      .catch((e) => {
        toast.error("Couldn't find the order", {
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
          order: {},
          isloading: false,
          success: false,
          error: true,
          errorMessage: e.response.data.message,
        };
      });
    return data;
  }
);
export const updateOrderToPaid = createAsyncThunk(
  "order/updateOrderToPaid",
  async (OrderDetails) => {
    const data = await axios
      .put(`/api/orders/${OrderDetails.orderId}/pay`, OrderDetails, {
        headers: {
          authorization: `Bearer ${OrderDetails.token}`,
        },
      })
      .then((res) => {
        toast.success(`Order has been updated to be paid `, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const { _id, paidAt, isPaid, isDelivered, deliveredAt } = res.data;
        const result = {
          errorMessage: "",
          orderPay: {
            order: { _id, paidAt, isPaid, isDelivered, deliveredAt },
            isloading: false,
            error: false,
            success: true,
          },
        };
        return result;
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
        console.log(e);
        return {
          errorMessage: e.response.data.message,
          orderPay: {
            order: {},
            isloading: false,
            error: true,
            success: false,
          },
        };
      });
    return data;
  }
);
export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (token) => {
    const data = await axios
      .get("/api/orders/myOrders", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return { userOrders: res.data, success: true };
      })
      .catch((e) => {
        return {
          error: true,
          errorMessage: e.response.data.message,
        };
      });
    return data;
  }
);
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(placeOrder.fulfilled, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    builder.addCase(placeOrder.rejected, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    builder.addCase(getOrder.fulfilled, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    builder.addCase(getOrder.rejected, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    builder.addCase(updateOrderToPaid.fulfilled, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    builder.addCase(updateOrderToPaid.rejected, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    builder.addCase(getUserOrders.fulfilled, (state, payload) => {
      return { ...state, ...payload.payload };
    });
    builder.addCase(getUserOrders.rejected, (state, payload) => {
      return { ...state, ...payload.payload };
    });
  },
});

// export const {} = orderSlice.actions
