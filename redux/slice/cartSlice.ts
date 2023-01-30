import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../types/index";
import api from '../../utils/axios';

interface ICart {
  isLoading: boolean;
  productsInCart: IProduct[];
}

interface IOrder {
  totalPrice: number;
  shop: string;
  products: IProduct[];
};

interface IErrorMessage {
  message: string | null
};

// export const addNewOrder = createAsyncThunk<IOrder, { totalPrice: number, products: Array<IProduct>, shop: string }, { rejectValue: IErrorMessage }>(
//   'cart/order',
//   async ({ totalPrice, products, shop }, { rejectWithValue }) => {
//     try {
//       const { data } = await api.post('/order', {
//         totalPrice,
//         products,
//         shop,
//       });

//       return data
//     } catch (error: any) {
//       rejectWithValue(error.response.message);
//     }
//   }
// );

const initialCartState: ICart = {
  isLoading: false,
  productsInCart: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    clearCart(state) {
      state.productsInCart = []
    },
    addProduct(state, action: PayloadAction<IProduct>) {
      state.productsInCart.push(action.payload);
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      state.productsInCart = state.productsInCart.map(product => {
        if (product._id === action.payload) {
          return { ...product, quantity: product.quantity + 1 };
        } else {
          return product
        }
      })
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      state.productsInCart = state.productsInCart.map(product => {
          if (product._id === action.payload) {
            return { ...product, quantity: product.quantity - 1 };
          } else {
            return product
          }
        })
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.productsInCart = state.productsInCart.filter(product => product._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(addNewOrder.pending, (state) => {
      //   state.isLoading = true
      // });
  }
});

export default cartSlice.reducer
export const { addProduct, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;