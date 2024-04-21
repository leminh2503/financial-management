import React, { useMemo } from 'react';
import { Box, Center, Column, Row, Text } from 'native-base';

// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { RootState } from '../../lib/redux/store';
import { useSelector } from 'react-redux';
import { ProductModel } from '../../lib/axios';
import moment from 'moment';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

export const SalesScreen: React.FC<Props> = () => {
  const { listInvoice } = useSelector((state: RootState) => state.invoice);
  const today = moment().format('DD/MM/YYYY');
  const yesterday = moment().subtract(1, 'day').format('DD/MM/YYYY');
  const twoAgo = moment().subtract(2, 'day').format('DD/MM/YYYY');
  const threeAgo = moment().subtract(3, 'day').format('DD/MM/YYYY');

  const totalItem = (list: ProductModel[]) => {
    return list.reduce((t, i) => {
      return t + i.productPrice * i.quantityInOrder;
    }, 0);
  };

  const totals = useMemo(() => {
    return listInvoice?.reduce((t, item) => t + totalItem(item.products), 0);
  }, [listInvoice]);

  const capitalItem = (list: ProductModel[]) => {
    return list.reduce((t, i) => {
      return t + i.productCost * i.quantityInOrder;
    }, 0);
  };

  const capital = useMemo(() => {
    return listInvoice?.reduce(
      (t, item) => t - capitalItem(item.products),
      totals
    );
  }, [listInvoice]);

  const removeDuplicate = (arr: any) => {
    return arr.filter((item: any, index: any) => {
      return arr.indexOf(item) === index;
    });
  };

  function aggregateQuantities(data: any[]) {
    const aggregatedData: any = {};

    data.forEach((item) => {
      const { productSKU, quantityInOrder } = item;
      if (aggregatedData[productSKU]) {
        aggregatedData[productSKU] += quantityInOrder;
      } else {
        aggregatedData[productSKU] = quantityInOrder;
      }
    });

    return Object.keys(aggregatedData).map((productSKU) => ({
      productSKU,
      quantityInOrder: aggregatedData[productSKU],
    }));
  }

  function aggregateQuantities1(data: any) {
    const aggregatedData: any = {};

    data.forEach((item) => {
      const { productSKU, quantityInOrder } = item;
      if (aggregatedData[productSKU]) {
        aggregatedData[productSKU] += quantityInOrder;
      } else {
        aggregatedData[productSKU] = quantityInOrder;
      }
    });

    // Convert aggregated data to array of objects
    return Object.keys(aggregatedData).map((productSKU) => ({
      productSKU,
      quantityInOrder: aggregatedData[productSKU],
    }));
  }

  const getData = () => {
    return listInvoice.flatMap((item) => {
      return aggregateQuantities(item.products);
    }, 1);
  };

  const dataObj = useMemo(() => {
    return aggregateQuantities1(getData());
  }, [listInvoice]);

  const getLabel1 = (item: any) => {
    return item.map((i: any) => {
      return i.productSKU;
    });
  };

  const getQuantity = (item: any) => {
    return item.map((i: any) => {
      return i.quantityInOrder;
    });
  };

  const todayTotal = useMemo(() => {
    const list = listInvoice.filter((item) => {
      return moment(item.createdDate).format('DD/MM/YYYY').includes(today);
    });

    return list.reduce((t, item) => {
      return t + totalItem(item.products);
    }, 0);
  }, [listInvoice, today]);

  const yesterdayTotal = useMemo(() => {
    const list = listInvoice.filter((item) =>
      moment(item.createdDate).format('DD/MM/YYYY').includes(yesterday)
    );
    return list.reduce((t, item) => {
      return t + totalItem(item.products);
    }, 0);
  }, [listInvoice, yesterday]);

  const twoAgoTotal = useMemo(() => {
    const list = listInvoice.filter((item) =>
      moment(item.createdDate).format('DD/MM/YYYY').includes(twoAgo)
    );
    return list.reduce((t, item) => {
      return t + totalItem(item.products);
    }, 0);
  }, [listInvoice, twoAgo]);

  const threeAgoTotal = useMemo(() => {
    const list = listInvoice.filter((item) =>
      item.createdDate.includes(threeAgo)
    );
    return list.reduce((t, item) => {
      return t + totalItem(item.products);
    }, 0);
  }, [listInvoice, threeAgo]);

  const data = useMemo(() => {
    return {
      labels: [twoAgo, yesterday, today],
      datasets: [
        {
          data: [twoAgoTotal, yesterdayTotal, todayTotal],
        },
      ],
    };
  }, [
    threeAgo,
    twoAgo,
    yesterday,
    today,
    todayTotal,
    twoAgoTotal,
    yesterdayTotal,
    threeAgoTotal,
  ]);

  return (
    <Center mt={3} mx={2}>
      <Box
        width="100%"
        borderWidth={1}
        backgroundColor="white"
        p={4}
        borderRadius={4}
      >
        <Row justifyContent="space-between">
          <Column>
            <Text>{listInvoice.length} hoá đơn</Text>
            <Text fontSize={24} color="green.700" fontWeight="700">
              {totals} đ
            </Text>
          </Column>
          <Column>
            <Text>Lợi nhuận</Text>
            <Text fontSize={24} color="green.700" fontWeight="700">
              {capital} đ
            </Text>
          </Column>
        </Row>
      </Box>
      <Box w="100%" mt={3}>
        <Text fontSize={20} fontWeight="800">
          Doanh thu
        </Text>
        <BarChart
          data={data}
          yAxisLabel=""
          verticalLabelRotation={20}
          width={Dimensions.get('window').width} // from react-native
          height={300}
          showValuesOnTopOfBars
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: 'transparent',
            backgroundGradientFrom: '#eeeeee',
            backgroundGradientTo: '#f1f1f1',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `#000000`,
            labelColor: (opacity = 1) => `#000000`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              // r: '6',
              strokeWidth: '2',
              stroke: '#ff9700',
            },
          }}
          style={{
            marginVertical: 10,
            borderRadius: 16,
          }}
        />

        {/*<Row mt={3} justifyContent="space-between" p={4}>*/}
        {/*  <Text fontWeight="bold" fontSize={14}>*/}
        {/*    Tổng doanh số*/}
        {/*  </Text>*/}
        {/*  <Text fontWeight="bold" fontSize={20}>*/}
        {/*    1000 đ*/}
        {/*  </Text>*/}
        {/*</Row>*/}
      </Box>
    </Center>
  );
};
