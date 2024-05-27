import React from 'react';
import { Box, Divider, HStack, Text, VStack } from 'native-base';
import { BarChart } from 'react-native-gifted-charts';

export const ReportItem = ({ data }: any) => {
  const barData = [
    { value: 250, label: 'M' },
    { value: 500, label: 'T', frontColor: '#177AD5' },
    { value: 745, label: 'W', frontColor: '#177AD5' },
    { value: 320, label: 'T' },
    { value: 600, label: 'F', frontColor: '#177AD5' },
    { value: 256, label: 'S' },
    { value: 300, label: 'S' },
    { value: 300, label: 'S' },
    { value: 300, label: 'S' },
    { value: 300, label: 'S' },
    { value: 300, label: 'S' },
    { value: 300, label: 'S' },
  ];

  return (
    <Box>
      <BarChart
        barWidth={22}
        noOfSections={3}
        barBorderRadius={4}
        frontColor="lightgray"
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
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
