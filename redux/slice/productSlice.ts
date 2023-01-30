import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types/index";
import axios from '../../utils/axios';

interface IProductSlice {
  products: IProduct[];
  isLoading: boolean;
  error: string | null;
}

export const axiosProducts = createAsyncThunk<IProduct[], undefined, { rejectValue: string }>(
  'products/axiosProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/products')
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

const initialProductState: IProductSlice = {
  products: [],
  isLoading: false,
  error: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState: initialProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(axiosProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(axiosProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(axiosProducts.rejected, (state, action) => {
        state.error = 'Error'
        state.isLoading = false
      })
  }
});

export default productSlice.reducer;
export const {  } = productSlice.actions;