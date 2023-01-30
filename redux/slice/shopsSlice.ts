import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from '../../utils/axios';
import { IShop } from '../../types/index';

interface ShopsState {
  shops: IShop[];
  currentShop: string;
  isLoading: boolean;
  error: string | null;
};

export const axiosShops = createAsyncThunk<IShop[], undefined, { rejectValue: string }>(
  'shop/axiosShops',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/shops')
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

const initialShopState: ShopsState = {
  shops: [],
  currentShop: '',
  isLoading: false,
  error: '',
};

const shopsSlice = createSlice({
  name: 'shop',
  initialState: initialShopState,
  reducers: {
    selectedShop(state, action: PayloadAction<string>) {
      state.currentShop = action.payload
    },
  },
  extraReducers: (builder) => {  
    builder
      .addCase(axiosShops.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(axiosShops.fulfilled, (state, action) => {
        state.shops = action.payload;
        state.isLoading = false;
      })
      .addCase(axiosShops.rejected, (state) => {
        state.error = 'Error'
        state.isLoading = false
      })
    
  }
});

export default shopsSlice.reducer;
export const { selectedShop } = shopsSlice.actions;
