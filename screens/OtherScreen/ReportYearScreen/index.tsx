import React, { useState } from 'react';
import {
  Box,
  Center,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import moment from 'moment/moment';
import { MaterialIcons } from '@expo/vector-icons';
import { ReportItem } from './ReportItem';

enum ReportScreen {
  INCOME = 'Thu nhập',
  EXPENSES = 'Chi tiêu',
  TOTAL = 'Tổng',
}

const ReportYearScreen = () => {
  const data = [
    { month: 'T1', income: 0 },
    { month: 'T2', income: 0 },
    { month: 'T3', income: 0 },
    { month: 'T4', income: 0 },
    { month: 'T5', income: 0 },
    { month: 'T6', income: 0 },
    { month: 'T7', income: 0 },
    { month: 'T8', income: 0 },
    { month: 'T9', income: 0 },
    { month: 'T10', income: 0 },
    { month: 'T11', income: 0 },
    { month: 'T12', income: 1500000 },
  ];

  const [currentDate, setCurrentDate] = useState(moment());
  const [screen, setScreen] = useState<ReportScreen>(ReportScreen.EXPENSES);

  const handleSetScreen = (value: ReportScreen) => {
    setScreen(value);
  };
  const handlePrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'year'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'year'));
  };

  return (
    <ScrollView bg="white">
      <Box p={2} px={4} w="100%" maxW="100%" mx="auto" bgColor="#F6F9FF">
        <HStack justifyContent="space-between" alignItems="center" mb={4}>
          <Pressable onPress={handlePrevMonth}>
            <Icon as={MaterialIcons} name="chevron-left" size="lg" />
          </Pressable>
          <Text fontSize="2xl" bold>
            {currentDate.format('YYYY')}
          </Text>
          <Pressable onPress={handleNextMonth}>
            <Icon as={MaterialIcons} name="chevron-right" size="lg" />
          </Pressable>
        </HStack>

        <Center mb={4}>
          <HStack alignItems="center">
            <Pressable
              borderRadius={screen === ReportScreen.EXPENSES ? 8 : 0}
              bgColor={screen === ReportScreen.EXPENSES ? '#C0D3FC' : '#F6F9FF'}
              p={2}
              px={4}
              onPress={() => handleSetScreen(ReportScreen.EXPENSES)}
            >
              <Text>Chi Tiêu</Text>
            </Pressable>
            <Pressable
              borderRadius={screen === ReportScreen.INCOME ? 8 : 0}
              bgColor={screen === ReportScreen.INCOME ? '#C0D3FC' : '#F6F9FF'}
              p={2}
              px={4}
              onPress={() => handleSetScreen(ReportScreen.INCOME)}
            >
              <Text>Thu nhập</Text>
            </Pressable>
            <Pressable
              borderRadius={screen === ReportScreen.TOTAL ? 8 : 0}
              bgColor={screen === ReportScreen.TOTAL ? '#C0D3FC' : '#F6F9FF'}
              p={2}
              px={4}
              onPress={() => handleSetScreen(ReportScreen.TOTAL)}
            >
              <Text>Tổng</Text>
            </Pressable>
          </HStack>
        </Center>

        <ReportItem data={data} />
      </Box>
    </ScrollView>
  );
};

export default ReportYearScreen;
