import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder, IProduct } from "../../types/index";
import api from '../../utils/axios';

interface IOrderToDb {
  totalPrice: number;
  shop: string;
  products: IProduct[];
};

interface IOrderState {
  orderList: IOrder[];
  isLoading: boolean;
  status: string | null;
};

interface IErrorMessage {
  message: string | null
};

const initialstate: IOrderState = {
  orderList: [],
  isLoading: false,
  status: '',
};

export const addNewOrder = createAsyncThunk<IOrder, IOrderToDb, { rejectValue: IErrorMessage }>(
  'cart/order',
  async ({ totalPrice, products, shop }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/order', {
        totalPrice,
        products,
        shop,
      });
      return data
    } catch (error: any) {
      rejectWithValue(error.response.message);
    }
  }
);

export const axiosOrderHistory = createAsyncThunk<IOrder[], undefined, { rejectValue: string }>(
  'cart/axiosOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/orders');
      return data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Создание заказа
      .addCase(addNewOrder.pending, (state) => {
        state.isLoading = true;
        state.status = '';
      })
      .addCase(addNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 'Загрузка успешна';
        state.orderList.push(action.payload);
      })
      .addCase(addNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'Something go wrong(';
      })
      // Получение истории заказов
      .addCase(axiosOrderHistory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(axiosOrderHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload
      })
      .addCase(axiosOrderHistory.rejected, (state) => {
        state.isLoading = true
      })
  }
});

export default orderSlice.reducer;

