import React, { useEffect, useMemo, useState } from 'react';
import { Box, Divider, HStack, Text, VStack } from 'native-base';
import { BarChart } from 'react-native-gifted-charts';

export const ReportItem = ({
  data,
}: {
  data: { id: string; amount: number }[];
}) => {
  const [barData, setBarData] = useState([
    { value: 250, label: 'M' },
    { value: 500, label: 'T' },
    { value: 745, label: 'W' },
    { value: 320, label: 'T' },
    { value: 600, label: 'F' },
    { value: 256, label: 'S' },
    { value: 300, label: 'S' },
    { value: 300, label: 'S' },
    { value: 300, label: 'S' },
    { value: 300, label: 'S' },
    { value: 300, label: 'S' },
    { value: 300, label: 'S' },
  ]);

  const totals = useMemo(() => {
    return data.reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);
  }, [data]);

  useEffect(() => {
    const newBarData = data.map((item) => {
      return {
        value: item.amount,
        label: item.id,
        frontColor: item.amount > 0 ? '#5386F7' : null,
      };
    });
    setBarData(newBarData);
  }, [data]);

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
            {totals}đ
          </Text>
        </HStack>
        <Divider />
        <HStack justifyContent="space-between">
          <Text>Trung bình</Text>
          <Text color="#5386F7" bold>
            {Math.round(totals / 12)}đ
          </Text>
        </HStack>
        <Divider />
      </VStack>

      {data.map((item, index) => (
        <VStack key={index}>
          <HStack justifyContent="space-between" key={index}>
            <Text>Tháng {index + 1}</Text>
            <Text bold>{item.amount}đ</Text>
          </HStack>
          <Divider my={2} />
        </VStack>
      ))}
    </Box>
  );
};
