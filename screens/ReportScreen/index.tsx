import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  Box,
  Center,
  Divider,
  HStack,
  Icon,
  NativeBaseProvider,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import moment from 'moment';
import { ExpensesRoute } from './Expense';
import { IncomeRoute } from './Income';

const { width } = Dimensions.get('window');

const renderScene = SceneMap({
  expenses: ExpensesRoute,
  income: IncomeRoute,
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#007bff' }}
    style={{ backgroundColor: 'white' }}
    renderLabel={({ route, focused, color }) => (
      <Text style={{ color: focused ? '#007bff' : '#222', margin: 8 }}>
        {route.title}
      </Text>
    )}
  />
);

export const ReportScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'expenses', title: 'Chi tiêu' },
    { key: 'income', title: 'Thu nhập' },
  ]);

  const [currentDate, setCurrentDate] = useState(moment());

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };

  return (
    <NativeBaseProvider>
      <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
        <Box backgroundColor="#F6F9FF">
          <HStack justifyContent="space-between" alignItems="center" mb={4}>
            <Pressable onPress={handlePrevMonth}>
              <Icon as={MaterialIcons} name="arrow-back" size="lg" />
            </Pressable>
            <Text fontSize="2xl" bold>
              {currentDate.format('MM/YYYY')}
            </Text>
            <Pressable onPress={handleNextMonth}>
              <Icon as={MaterialIcons} name="arrow-forward" size="lg" />
            </Pressable>
          </HStack>
          <Divider my={4} />
          <VStack space={2}>
            <HStack justifyContent="space-between">
              <Text>Chi:</Text>
              <Text fontSize="xl" color="red.500" bold>
                1,500,000đ
              </Text>
            </HStack>
            <Divider my={4} />
            <HStack justifyContent="space-between">
              <Text>Thu:</Text>
              <Text fontSize="xl" color="blue.500" bold>
                10,000,000đ
              </Text>
            </HStack>

            <Divider my={4} />
            <HStack justifyContent="space-between">
              <Text>Thu chi:</Text>
              <Text fontSize="xl" color="blue.500" bold>
                +8,500,000đ
              </Text>
            </HStack>
          </VStack>
        </Box>
        <Divider my={4} />
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width }}
        />
      </ScrollView>
      <Box style={styles.tabBar}>
        <Center flex={1}>
          <Icon as={MaterialIcons} name="edit" size="lg" />
          <Text>Nhập vào</Text>
        </Center>
        <Center flex={1}>
          <Icon as={MaterialIcons} name="calendar-today" size="lg" />
          <Text>Lịch</Text>
        </Center>
        <Center flex={1}>
          <Icon as={MaterialIcons} name="pie-chart" size="lg" />
          <Text>Báo cáo</Text>
        </Center>
        <Center flex={1}>
          <Icon as={MaterialIcons} name="more-horiz" size="lg" />
          <Text>Khác</Text>
        </Center>
      </Box>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#eaeaea',
    paddingVertical: 8,
  },
});
