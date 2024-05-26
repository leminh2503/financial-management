import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Box,
  Divider,
  HStack,
  Icon,
  IconButton,
  NativeBaseProvider,
  Text,
  VStack,
} from 'native-base';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Th.1',
    'Th.2',
    'Th.3',
    'Th.4',
    'Th.5',
    'Th.6',
    'Th.7',
    'Th.8',
    'Th.9',
    'Th.10',
    'Th.11',
    'Th.12',
  ],
  dayNames: [
    'Chủ Nhật',
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy',
  ],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay',
};
LocaleConfig.defaultLocale = 'vi';

const transactions = [
  {
    date: '21/12/2023',
    category: 'Ăn uống',
    amount: '1,000,000đ',
    type: 'expense',
  },
  {
    date: '21/12/2023',
    category: 'Tiền lương',
    amount: '10,000,000đ',
    type: 'income',
  },
  {
    date: '21/12/2023',
    category: 'Ăn uống',
    amount: '500,000đ',
    type: 'expense',
  },
];

export const CalendarScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <NativeBaseProvider>
      <ScrollView
        contentContainerStyle={{ padding: 16, backgroundColor: '#F6F9FF' }}
      >
        <HStack justifyContent="space-between" alignItems="center" mb={4}>
          <Text flex={1} fontSize="2xl" bold>
            Lịch
          </Text>
          <IconButton
            icon={<Icon as={MaterialIcons} name="search" />}
            borderRadius="full"
          />
        </HStack>
        <Calendar
          current={date.toISOString().split('T')[0]}
          onDayPress={(day) => setDate(new Date(day.dateString))}
          markedDates={{
            [date.toISOString().split('T')[0]]: { selected: true },
          }}
          theme={{
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            arrowColor: 'orange',
            calendarBackground: '#F6F9FF',
          }}
        />
        <Divider my={4} />
        <HStack justifyContent="space-between">
          <VStack alignItems="center">
            <Text>Thu nhập</Text>
            <Text color="blue.500" fontSize="md" bold>
              10,000,000đ
            </Text>
          </VStack>
          <VStack alignItems="center">
            <Text>Chi tiêu</Text>
            <Text color="red.500" fontSize="md" bold>
              1,200,000đ
            </Text>
          </VStack>
          <VStack alignItems="center">
            <Text>Tổng</Text>
            <Text color="blue.500" fontSize="md" bold>
              +8,800,000đ
            </Text>
          </VStack>
        </HStack>
        <Divider my={4} />
        {transactions.map((transaction, index) => (
          <Box key={index} mb={4}>
            <HStack
              mb={2}
              backgroundColor="#DBE6FD"
              justifyContent="space-between"
            >
              <Text fontWeight="bold">{transaction.date}</Text>
              <Text fontWeight="bold">8,800,000đ</Text>
            </HStack>
            <HStack justifyContent="space-between" alignItems="center">
              <HStack alignItems="center">
                <Icon
                  as={FontAwesome5}
                  name={
                    transaction.category === 'Ăn uống' ? 'utensils' : 'wallet'
                  }
                  size="sm"
                  color={
                    transaction.category === 'Ăn uống'
                      ? 'orange.500'
                      : 'green.500'
                  }
                  mr={2}
                />
                <Text fontWeight="bold">{transaction.category}</Text>
              </HStack>
              <Text
                fontWeight="bold"
                color={transaction.type === 'expense' ? 'red.500' : 'blue.500'}
              >
                {transaction.amount}
              </Text>
            </HStack>
          </Box>
        ))}
      </ScrollView>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </NativeBaseProvider>
  );
};
