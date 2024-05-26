import React from 'react';
import { Box, Divider, HStack, Text, VStack } from 'native-base';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export const ReportItem = ({ data }: any) => {
  const dataBar = {
    labels: [
      'T1',
      'T2',
      'T3',
      'T4',
      'T5',
      'T6',
      'T7',
      'T8',
      'T9',
      'T10',
      'T11',
      'T12',
    ],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <Box>
      <BarChart
        data={dataBar}
        yAxisLabel=""
        width={Dimensions.get('window').width - 32} // from react-native
        height={200}
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
          borderRadius: 16,
        }}
      />
      <VStack space={2} mb={4} mt={4} bgColor="#F6F9FF">
        <HStack justifyContent="space-between">
          <Text>Tổng</Text>
          <Text color="#5386F7" bold>
            1,500,000đ
          </Text>
        </HStack>
        <Divider />
        <HStack justifyContent="space-between">
          <Text>Trung bình</Text>
          <Text color="#5386F7" bold>
            125,000đ
          </Text>
        </HStack>
        <Divider />
      </VStack>

      {data.map((item, index) => (
        <VStack key={index}>
          <HStack justifyContent="space-between" key={index}>
            <Text>Tháng {index + 1}</Text>
            <Text bold>{item.income}đ</Text>
          </HStack>
          <Divider my={2} />
        </VStack>
      ))}
    </Box>
  );
};
