import React, { useState } from 'react';
import { Box, HStack, Icon, Pressable, ScrollView, Text } from 'native-base';
import moment from 'moment/moment';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { ExpensesCategory } from './Expense';
import { IncomeCategory } from './Income';

const { width } = Dimensions.get('window');

const renderScene = SceneMap({
  expenses: ExpensesCategory,
  income: IncomeCategory,
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

const ReportCategoryScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'expenses', title: 'Chi tiêu' },
    { key: 'income', title: 'Thu nhập' },
  ]);

  const [currentDate, setCurrentDate] = useState(moment());

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'year'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'year'));
  };

  return (
    <ScrollView bg="white" contentContainerStyle={{ flexGrow: 1 }}>
      <Box p={2} px={4} w="100%" maxW="100%" mx="auto" bgColor="#F6F9FF">
        <HStack justifyContent="space-between" alignItems="center">
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
      </Box>

      <Box p={2} flex={1}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width }}
        />
      </Box>
    </ScrollView>
  );
};

export default ReportCategoryScreen;
