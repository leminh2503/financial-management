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
  },
});

export const { reset } = invoiceSlice.actions;
export default invoiceSlice.reducer;
