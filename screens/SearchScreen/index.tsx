import { Icon, Input, ScrollView } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export const SearchScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
      <Input
        placeholder="Search"
        variant="filled"
        width="100%"
        borderRadius="10"
        py="1"
        px="2"
        InputLeftElement={
          <Icon
            ml="2"
            size="4"
            color="gray.400"
            as={<Ionicons name="search" />}
          />
        }
      />
    </ScrollView>
  );
};
