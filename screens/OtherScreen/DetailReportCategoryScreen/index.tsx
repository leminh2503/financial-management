import React from 'react';
import {
  Box,
  Center,
  Divider,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base';

const DetailReportCategoryScreen = () => {
  return (
    <ScrollView bg="white">
      <Box mt={8} w="100%" maxW="100%" mx="auto">
        <Center>
          <VStack w="100%">
            <HStack justifyContent="space-between" bg="#F6F9FF" p={2}>
              <Text bold>Thu nhập</Text>
              <Text bold>10,000,000đ</Text>
            </HStack>
            <Divider />
            <HStack justifyContent="space-between" bg="#F6F9FF" p={2}>
              <Text bold>Chi tiêu</Text>
              <Text bold>1,500,000đ</Text>
            </HStack>
            <Divider />
            <HStack justifyContent="space-between" bg="#F6F9FF" p={2}>
              <Text bold>Tổng</Text>
              <Text bold>8,500,000đ</Text>
            </HStack>
          </VStack>
          <VStack mt={4} w="100%">
            <HStack justifyContent="space-between" bg="#F6F9FF" p={2}>
              <Text bold>Số dư ban đầu</Text>
              <Text bold>0đ</Text>
            </HStack>
            <Divider />
            <HStack justifyContent="space-between" bg="#F6F9FF" p={2}>
              <Text bold>Tổng</Text>
              <Text bold>8,500,000đ</Text>
            </HStack>
          </VStack>
        </Center>
      </Box>
    </ScrollView>
  );
};

export default DetailReportCategoryScreen;
