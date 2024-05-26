import React from 'react';
import { ScrollView, Text } from 'react-native';
import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Icon,
  IconButton,
  Input,
  VStack,
} from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const categories = [
  { icon: 'restaurant', label: 'Ăn uống', color: 'orange.500' },
  { icon: 'hand-wash', label: 'Hàng ngày', color: 'green.500' },
  { icon: 'tshirt-crew', label: 'Quần áo', color: 'blue.500' },
  { icon: 'lipstick', label: 'Mỹ phẩm', color: 'pink.500' },
  { icon: 'account-group', label: 'Giao lưu', color: 'yellow.500' },
  { icon: 'medical-bag', label: 'Y tế', color: 'teal.500' },
  { icon: 'book-open', label: 'Giáo dục', color: 'red.500' },
  { icon: 'water', label: 'Tiền điện nước', color: 'blue.500' },
  { icon: 'car', label: 'Đi lại', color: 'brown.500' },
  { icon: 'phone', label: 'Liên lạc', color: 'orange.500' },
  { icon: 'home', label: 'Tiền nhà', color: 'yellow.500' },
];

export const Revenue = () => {
  const [date, setDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <ScrollView>
      <Center flex={1} px="3">
        <Box w="100%" p="4">
          <VStack justifyContent="space-between" alignItems="flex-end">
            <Text>Số tiền</Text>
            <Input
              borderWidth={0}
              size="2xl"
              value="0 đ"
              variant="unstyled"
              borderColor={'transparent'}
              flex={1}
              textAlign="right"
              py="1"
              px="2"
            />
          </VStack>
          <Divider my="2" />
          <HStack alignItems="center">
            <IconButton
              icon={<Icon as={MaterialIcons} name="calendar-today" />}
              borderRadius="full"
              onPress={() => setShowDatePicker(true)}
            />
            <Text ml="2">{date.toLocaleDateString()}</Text>
          </HStack>
          <Divider my="2" />
          <Input
            placeholder="Ghi chú"
            variant="underlined"
            placeholderTextColor="gray.400"
            py={4}
            px={2}
            InputLeftElement={
              <Icon
                as={MaterialCommunityIcons}
                name="note-outline"
                size="sm"
                ml={2}
              />
            }
            mb={4}
          />
          <Text my="4" fontWeight="bold">
            Danh mục
          </Text>
          <HStack justifyContent="flex-start" flexWrap="wrap">
            {categories.map((category, index) => (
              <Button
                width="30%"
                key={index}
                variant="outline"
                borderRadius="10"
                py="4"
                px="4"
                my="1"
                mx="1"
              >
                <VStack alignItems="center">
                  <Icon
                    as={MaterialCommunityIcons}
                    name={category.icon}
                    size="lg"
                    color={category.color}
                  />
                  <Text>{category.label}</Text>
                </VStack>
              </Button>
            ))}
          </HStack>
          <Button
            mt="6"
            borderRadius="full"
            bg="blue.400"
            py="3"
            _text={{ color: 'white' }}
          >
            Nhập khoản chi
          </Button>
        </Box>
      </Center>
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
    </ScrollView>
  );
};
