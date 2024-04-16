import { Box, FlatList } from 'native-base';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/redux/store';
import { ItemInvoice } from './ItemInvoice';
import { ApiService } from '../../lib/axios';
import { setListInvoice } from '../../lib/redux/reducers/invoiceReducer';

export const ListInvoiceScreen = () => {
  const dispatch = useDispatch();
  const { listInvoice } = useSelector((state: RootState) => state.invoice);

  const getInvoice = async () => {
    ApiService.getOrder().then((res) => {
      dispatch(setListInvoice(res.data.data));
    });
  };

  useEffect(() => {
    getInvoice();
  }, []);

  return (
    <Box>
      <FlatList
        ListFooterComponent={<Box p={4} />}
        data={listInvoice}
        renderItem={({ item, index }) => {
          return <ItemInvoice item={item} />;
        }}
      />
    </Box>
  );
};
