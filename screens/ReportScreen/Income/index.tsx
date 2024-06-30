import React, { useMemo } from 'react';
import { Image, View } from 'react-native';
import { Box, Divider, HStack, Text } from 'native-base';
import { ITransaction } from '../../../types';

export const IncomeRoute = ({
  data,
  showTotal,
}: {
  data: ITransaction[];
  showTotal?: boolean;
}) => {
  const totals = useMemo(() => {
    return data.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);
  }, [data]);
  return (
    <View style={{ flex: 1, padding: 16 }}>
      {showTotal && (
        <Box my={4}>
          <HStack justifyContent="space-between" alignItems="center">
            <HStack alignItems="center">
              <Text fontWeight="bold">Tổng</Text>
            </HStack>
            <Text fontWeight="bold">{totals}đ</Text>
          </HStack>
        </Box>
      )}
      {data.map((item, index) => (
        <Box key={index}>
          <HStack justifyContent="space-between" alignItems="center">
            <HStack alignItems="center">
              <Image
                source={{ uri: item?.category?.image }}
                style={{ width: 24, height: 24, paddingBottom: 8 }}
              />
              <Text mx={2} fontWeight="bold">
                {item?.category?.title}
              </Text>
            </HStack>
            <Text
              fontWeight="bold"
              color={item?.isRevenue ? 'red.500' : 'blue.500'}
            >
              {item?.amount}đ
            </Text>
          </HStack>
          <Divider my={2} />
        </Box>
      ))}
    </View>
  );
};
