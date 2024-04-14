import React, { useMemo } from 'react';
import { Box, Center, Column, Row, Text } from 'native-base';

// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { RootState } from '../../lib/redux/store';
import { useSelector } from 'react-redux';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

export const SalesScreen: React.FC<Props> = () => {
  const { listInvoice } = useSelector((state: RootState) => state.invoice);

  const totals = useMemo(() => {
    return listInvoice?.reduce((total, item) => total + item.total, 0);
  }, [listInvoice]);

  const data = {
    labels: ['XSSASC', 'XVVBC', 'XZCZX', 'ASD'],
    datasets: [
      {
        data: [20, 45, 28, 80],
      },
    ],
  };

  return (
    <Center mt={3} mx={2}>
      <Box
        width="100%"
        borderWidth={1}
        backgroundColor="white"
        p={4}
        borderRadius={4}
      >
        <Row>
          <Column>
            <Text>{listInvoice.length} hoá đơn</Text>
            <Text fontSize={24} color="green.700" fontWeight="700">
              {totals} đ
            </Text>
          </Column>
          {/*<Column>*/}
          {/*  <Text>Lợi nhuận</Text>*/}
          {/*  <Text fontSize={24} color="blue">*/}
          {/*    4.37<Text>Tr</Text>*/}
          {/*  </Text>*/}
          {/*</Column>*/}
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
