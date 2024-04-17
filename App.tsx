// core
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// components & theme
import { NativeBaseProvider, Spinner } from 'native-base';
import { theme } from './theme';
import { useColorScheme } from 'react-native';

// redux & persister
import { Provider as ReduxProvider } from 'react-redux';
import { persistor, store } from './lib/redux/store';
import { PersistGate } from 'redux-persist/es/integration/react';

import { Root } from './Root';
import { StatusBar } from 'expo-status-bar';
import { fbApp } from './hooks/useFirestorage';

export default function App() {
  const mode = useColorScheme();
  // Changing initialColorMode to 'dark' or 'light' or system(mode)
  fbApp;
  theme.config.initialColorMode = mode;
  return (
    <NativeBaseProvider theme={theme}>
      <ReduxProvider store={store}>
        <PersistGate loading={<Spinner size="lg" />} persistor={persistor}>
          <SafeAreaProvider
            style={{
              flex: 1,
            }}
          >
            <StatusBar />
            <Root theme={theme} />
          </SafeAreaProvider>
        </PersistGate>
      </ReduxProvider>
    </NativeBaseProvider>
  );
}
