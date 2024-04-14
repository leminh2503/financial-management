import { createSlice } from '@reduxjs/toolkit';
import { InvoiceModel } from '../../axios/model';

const initialState = {
  listInvoice: [] as InvoiceModel[],
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    reset: () => initialState,
    setListInvoice(state, action) {
      state.listInvoice = action.payload;
    },
    addInvoice(state, action) {
      state.listInvoice = [action.payload, ...state.listInvoice];
      console.log('addInvoice-----', state.listInvoice);
    },
  },
});

export const { reset, addInvoice, setListInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
