import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/axios';
import axios from 'axios';
import { IUser } from '../../types';

interface IAuthUser {
  // email: string | null;
  // name: string | null;
  // id: string | null;
  user: IUser;
  accessToken: string | null;
  isLoading: boolean;
  status: string | null;
  isAuth: boolean;
};

interface AuthResponse {
  accessToken: string | null;
  refreshToken: string | null;
  user: IUser;
};

interface IErrorMessage {
  message: string | null
};

const initialState: IAuthUser = {
  // email: null,
  // name: null,
  // id: null,
  user: {
    email: '',
    name: '',
    id: '',
  },
  accessToken: null,
  isLoading: false,
  status: null,
  isAuth: false,
};

export const registerUser = createAsyncThunk<IAuthUser, { email: string, password: string, name: string }, { rejectValue: IErrorMessage }>(
  'auth/register',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/register', {
        email,
        password,
        name,
      });
      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken)
      }
      return data
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
);

export const loginUser = createAsyncThunk<IAuthUser, { email: string, password: string }, { rejectValue: IErrorMessage }>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/login', {
        email,
        password,
      });
      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken)
      }
      console.log(data)
      return data
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const checkUserAuth = createAsyncThunk<{ rejectValue: IErrorMessage }>(
  'auth/check',
  async () => {
    try {
      const { data } = await axios.get<AuthResponse>('/refresh');
      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken)
      };
      return data
    } catch (error: any) {
      return error.response.data.message
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      const response = await api.post<void>('/logout')
      localStorage.removeItem('token');
      console.log(response)
      return response
    } catch (error: any) {
      return error.response.data.message
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
        state.user.name = '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user.email = action.payload.user.email;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
        state.isAuth = true;
        state.status = action.payload.status;
        state.user.name = action.payload.user.name;
        // state.id = action.payload.id;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.status = action.payload;
        state.user.name = '';
      })
      // Логин
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.email = action.payload.user.email;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
        state.isAuth = true;
        state.status = action.payload.status;
        state.user.name = action.payload.user.name;
        // state.user.id = action.payload.user.id;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.user.name = '';
        state.status = action.payload;
      })
      // Проверка
      // .addCase(checkUserAuth.pending, (state) => {
      //   state.isLoading = true;
      //   state.status = null;
      // })
      // .addCase(checkUserAuth.fulfilled, (state, action: PayloadAction<any>) => {
      //   state.email = action.payload.user.email;
      //   state.accessToken = action.payload.accessToken;
      //   state.isLoading = false;
      //   state.status = action.payload.status
      //   state.name = action.payload.user.name;
      // })
      // .addCase(checkUserAuth.rejected, (state, action: PayloadAction<any>) => {
      //   state.isLoading = false;
      //   state.name = null;
      //   state.status = action.payload;
      // })
      // Логаут
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user.email = '';
        state.accessToken = null;
        state.isLoading = false;
        state.status = null;
        state.user.name = '';
        state.isAuth = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.user.name = '';
        state.status = null;
      })
  }
})

export default authSlice.reducer;