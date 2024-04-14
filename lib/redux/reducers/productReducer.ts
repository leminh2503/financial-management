import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductModel } from '../../axios/model';

interface IProductReducer {
  cart: ProductModel[];
  listProduct: ProductModel[];
  name: string;
  phone: string;
  test: any[];
}

const initialState: IProductReducer = {
  cart: [],
  listProduct: [],
  name: '',
  phone: '',
  test: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: () => initialState,
    resetCart(state) {
      state.cart = [];
    },
    addToCart(state, action: PayloadAction<ProductModel>) {
      if (
        state.cart.find((item) => item.productId === action.payload.productId)
      ) {
        state.cart = state.cart.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, count: item?.count + 1 }
            : item
        );
      } else {
        state.cart = [...state.cart, action.payload];
      }
      console.log('addToCart-----', state.cart);
    },
    changeCountProduct(
      state,
      action: PayloadAction<{ productId: number; count: number }>
    ) {
      state.cart = state.cart.map((item) =>
        item.productId === action.payload.productId
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
    setListProduct(state, action: PayloadAction<ProductModel[]>) {
      state.listProduct = action.payload;
    },
    addToListProduct(state, action: PayloadAction<any>) {
      state.listProduct = [...state.listProduct, action.payload];
    },
    editProduct(state, action: PayloadAction<ProductModel>) {
      state.listProduct = state.listProduct.map((item) =>
        item.productId === action.payload.productId
          ? {
              ...item,
              ...action.payload,
            }
          : item
      );
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.listProduct = state.listProduct.filter(
        (item) => item.productId !== action.payload
      );
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
  setListProduct,
  addToListProduct,
  resetCart,
  editProduct,
  deleteProduct,
} = productSlice.actions;
export default productSlice.reducer;
