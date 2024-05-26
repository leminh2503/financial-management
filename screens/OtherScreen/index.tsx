import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Box,
  Divider,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo

const OtherScreen = () => {
  return (
    <ScrollView>
      <Box px="4" w="100%" mx="auto" bg="white">
        <Text fontSize="xl" bold textAlign="center">
          Khác
        </Text>
        <Divider my="1" />

        <Pressable
          mt={6}
          py={3}
          px={2}
          borderRadius={8}
          bgColor="#F6F9FF"
          onPress={() => {
            /* Handle press */
          }}
        >
          <HStack space={3} justifyContent="space-between" alignItems="center">
            <HStack space={3} alignItems="center">
              <Icon as={MaterialIcons} name="settings" size="sm" />
              <Text>Cài đặt cơ bản</Text>
            </HStack>
            <Icon as={MaterialIcons} name="chevron-right" size="sm" />
          </HStack>
        </Pressable>

        <VStack
          space={4}
          mt="4"
          bgColor="#F6F9FF"
          borderRadius={8}
          py={3}
          px={2}
        >
          <Pressable
            onPress={() => {
              /* Handle press */
            }}
          >
            <HStack
              space={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack space={3} alignItems="center">
                <Icon as={MaterialCommunityIcons} name="chart-line" size="sm" />
                <Text>Báo cáo năm</Text>
              </HStack>
              <Icon as={MaterialIcons} name="chevron-right" size="sm" />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable
            onPress={() => {
              /* Handle press */
            }}
          >
            <HStack
              space={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack space={3} alignItems="center">
                <Icon as={MaterialCommunityIcons} name="chart-pie" size="sm" />
                <Text>Báo cáo danh mục trong năm</Text>
              </HStack>
              <Icon as={MaterialIcons} name="chevron-right" size="sm" />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable
            onPress={() => {
              /* Handle press */
            }}
          >
            <HStack
              space={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack space={3} alignItems="center">
                <Icon as={MaterialCommunityIcons} name="chart-bar" size="sm" />
                <Text>Báo cáo toàn kỳ</Text>
              </HStack>
              <Icon as={MaterialIcons} name="chevron-right" size="sm" />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable
            onPress={() => {
              /* Handle press */
            }}
          >
            <HStack
              space={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack space={3} alignItems="center">
                <Icon
                  as={MaterialCommunityIcons}
                  name="chart-line-stacked"
                  size="sm"
                />
                <Text>Báo cáo danh mục toàn kỳ</Text>
              </HStack>
              <Icon as={MaterialIcons} name="chevron-right" size="sm" />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable
            onPress={() => {
              /* Handle press */
            }}
          >
            <HStack
              space={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack space={3} alignItems="center">
                <Icon
                  as={MaterialCommunityIcons}
                  name="swap-vertical"
                  size="sm"
                />
                <Text>Báo cáo thay đổi số dư</Text>
              </HStack>

              <Icon as={MaterialIcons} name="chevron-right" size="sm" />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable
            onPress={() => {
              /* Handle press */
            }}
          >
            <HStack
              space={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack space={3} alignItems="center">
                <Icon as={MaterialIcons} name="search" size="sm" />
                <Text>Tìm kiếm giao dịch</Text>
              </HStack>
              <Icon as={MaterialIcons} name="chevron-right" size="sm" />
            </HStack>
          </Pressable>
        </VStack>

        <Pressable
          mt="4"
          bgColor="#F6F9FF"
          borderRadius={8}
          py={3}
          px={2}
          onPress={() => {
            /* Handle press */
          }}
        >
          <HStack space={3} justifyContent="space-between" alignItems="center">
            <HStack space={3} alignItems="center">
              <Icon as={MaterialIcons} name="help-outline" size="sm" />
              <Text>Trợ giúp</Text>
            </HStack>
            <Icon as={MaterialIcons} name="chevron-right" size="sm" />
          </HStack>
        </Pressable>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5', // background color similar to your screenshot
  },
});

export default OtherScreen;
