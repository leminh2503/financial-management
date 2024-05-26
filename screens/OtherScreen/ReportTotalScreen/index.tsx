import React from 'react';
import { Box, ScrollView, Text } from 'native-base';
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

const ReportTotalScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'expenses', title: 'Chi tiêu' },
    { key: 'income', title: 'Thu nhập' },
  ]);

  return (
    <ScrollView bg="white" contentContainerStyle={{ flexGrow: 1 }}>
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

export default ReportTotalScreen;
