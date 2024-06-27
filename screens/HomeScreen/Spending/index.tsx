import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text } from 'react-native';
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
import { db } from '../../../hooks/useFirestorage';
import { ICategory } from '../../../types';

export const Spending = () => {
  const [date, setDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [category, setCategory] = useState<ICategory[]>([]);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  useEffect(() => {
    db.collection('categorySpending').onSnapshot({
      next: (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          image: doc.data().image,
        }));
        setCategory(data);
      },
    });
  }, [setCategory]);

  return (
    <ScrollView>
      <Center flex={1} px="3">
        <Box w="100%" p="4">
          <VStack justifyContent="space-between" alignItems="flex-end">
            <Text>Số tiền</Text>
            <Input
              borderWidth={0}
              size="2xl"
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
            {category.map((cate, index) => (
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
                  <Image
                    source={{ uri: cate?.image }}
                    style={{ width: 24, height: 24, paddingBottom: 8 }}
                  />
                  <Text>{cate?.title}</Text>
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
            Nhập khoản thu
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
