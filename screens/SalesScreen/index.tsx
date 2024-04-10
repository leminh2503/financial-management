import React, { useState } from 'react';
import { Box, Center, Row, Text } from 'native-base';

// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductModel } from '../../lib/axios';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

export const SalesScreen: React.FC<Props> = () => {
  const [lists, setLists] = useState<ProductModel[]>();

  const onPressListItem = async (item: ProductModel) => {
    // TODO: do something
    // props.navigation.navigate('Detail', {
    //   screen: 'Profile',
    //   params: item,
    // });
    console.log(item);
  };

  const data = {
    labels: ['XSSASC', 'XVVBC', 'XZCZX', 'ASD'],
    datasets: [
      {
        data: [20, 45, 28, 80],
      },
    ],
  };

  return (
    <Center width="100%">
      <Box w="100%">
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

        <Row mt={3} justifyContent="space-between" p={4}>
          <Text fontWeight="bold" fontSize={14}>
            Tổng doanh số
          </Text>
          <Text fontWeight="bold" fontSize={20}>
            1000 đ
          </Text>
        </Row>
      </Box>
    </Center>
  );
};
