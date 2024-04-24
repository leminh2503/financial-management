import { Box, FlatList, useToast } from 'native-base';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/redux/store';
import { ItemInvoice } from './ItemInvoice';
import { ApiService } from '../../lib/axios';
import { setListInvoice } from '../../lib/redux/reducers/invoiceReducer';
import { RefreshControl } from 'react-native';

export const ListInvoiceScreen = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { listInvoice } = useSelector((state: RootState) => state.invoice);
  const [refreshing, setRefreshing] = React.useState(false);
  const getInvoice = async () => {
    setRefreshing(true);
    ApiService.getOrder()
      .then((res) => {
        setRefreshing(false);
        dispatch(setListInvoice(res.data.data.reverse()));
      })
      .catch(() => {
        setRefreshing(false);
      });
  };

  const deleteInvoice = async (id: number) => {
    setRefreshing(true);
    ApiService.deleteOrder(id)
      .then((res) => {
        setRefreshing(false);
        toast.show({ title: 'Xoá hoá đơn thành công', placement: 'top' });
        getInvoice();
      })
      .catch(() => {
        setRefreshing(false);
        toast.show({ title: 'Xoá hoá đơn không thành công', placement: 'top' });
      });
  };

  useEffect(() => {
    getInvoice();
  }, []);

  return (
    <Box>
      <FlatList
        ListFooterComponent={<Box p={4} height={100} />}
        data={listInvoice}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getInvoice} />
        }
        keyExtractor={(item) => item?.orderId?.toString()}
        renderItem={({ item, index }) => {
          return <ItemInvoice item={item} deleteItem={deleteInvoice} />;
        }}
      />
    </Box>
  );
};
