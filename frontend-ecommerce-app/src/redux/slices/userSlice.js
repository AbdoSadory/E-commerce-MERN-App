import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
const initialState = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : {
      user: {},
      isLogIn: false,
      isloading: false,
      error: false,
      errorMessage: '',
    }
export const logIn = createAsyncThunk('user/logIn', async (loginData) => {
  const data = await axios
    .post('/api/users/login', loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      toast.success(`Welcome Again ${res.data.name}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          user: res.data,
          isLogIn: true,
          isloading: false,
          error: false,
          errorMessage: '',
        })
      )
      return {
        user: res.data,
        isLogIn: true,
        isloading: false,
        error: false,
        errorMessage: '',
      }
    })
    .catch((e) => {
      toast.error('Failed to login', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      return {
        user: {},
        isLogIn: false,
        isloading: false,
        error: true,
        errorMessage: e.response.data.message,
      }
    })
  return data
})
export const register = createAsyncThunk(
  'user/register',
  async (registerData) => {
    const data = await axios
      .post('/api/users/register', registerData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        toast.success(`Welcome to our website ${res.data.name}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            user: res.data,
            isLogIn: true,
            isloading: false,
            error: false,
            errorMessage: '',
          })
        )
        return {
          user: res.data,
          isLogIn: true,
          isloading: false,
          error: false,
          errorMessage: '',
        }
      })
      .catch((e) => {
        toast.error('Failed to register', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        return {
          user: {},
          isLogIn: false,
          isloading: false,
          error: true,
          errorMessage: e.response.data.message,
        }
      })
    return data
  }
)
export const updateProfile = createAsyncThunk(
  'user/profile',
  async (newProfileData) => {
    if (
      !newProfileData.name &&
      !newProfileData.email &&
      !newProfileData.password
    ) {
      return {
        error: true,
        errorMessage: 'No Data To Update !',
      }
    }
    const data = await axios
      .post('/api/users/profile', newProfileData, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${newProfileData.token}`,
        },
      })
      .then((res) => {
        console.log('done update;')
        toast.success(`Your Profile Has Been Updated ${res.data.name}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            user: res.data,
            isLogIn: true,
            isloading: false,
            error: false,
            errorMessage: '',
          })
        )
        return {
          user: res.data,
          isLogIn: true,
          isloading: false,
          error: false,
          errorMessage: '',
        }
      })
      .catch((e) => {
        console.log('no update;')
        toast.error('Failed to update profile', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        return {
          error: true,
          errorMessage: e.response.data.message,
        }
      })
    return data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout() {
      localStorage.removeItem('userInfo')
      return {
        user: {},
        isLogIn: false,
        isloading: false,
        error: false,
        errorMessage: '',
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, payload) => {
      return { ...state, ...payload.payload }
    })
    builder.addCase(logIn.rejected, (state, payload) => {
      return { ...state, ...payload.payload }
    })

    builder.addCase(register.fulfilled, (state, payload) => {
      return { ...state, ...payload.payload }
    })
    builder.addCase(register.rejected, (state, payload) => {
      return { ...state, ...payload.payload }
    })
    builder.addCase(updateProfile.fulfilled, (state, payload) => {
      return { ...state, ...payload.payload }
    })
    builder.addCase(updateProfile.rejected, (state, payload) => {
      return { ...state, ...payload.payload }
    })
  },
})

export const { logout } = userSlice.actions
