import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductModel } from '../../axios/model';

const initialState = {
  cart: [] as ProductModel[],
  name: '',
  phone: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: () => initialState,
    addToCart(state, action: PayloadAction<ProductModel>) {
      if (state.cart.find((item) => item.id === action.payload.id)) {
        state.cart = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        state.cart = [...state.cart, action.payload];
      }
      console.log('addToCart-----', state.cart);
    },
    changeCountProduct(
      state,
      action: PayloadAction<{ id: number; count: number }>
    ) {
      state.cart = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, count: action.payload.count }
          : item
      );
      console.log('changeCountProduct-----', state.cart);
    },
    setCart(state, action: PayloadAction<ProductModel[]>) {
      state.cart = action.payload;
      console.log('setCart-----', state.cart);
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    setClient(state, action: PayloadAction<{ name: string; phone: string }>) {
      state.name = action.payload.name;
      state.phone = action.payload.phone;
    },
  },
});

export const {
  reset,
  addToCart,
  changeCountProduct,
  removeProduct,
  setClient,
  setCart,
} = productSlice.actions;
export default productSlice.reducer;
