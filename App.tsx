/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import StackNavs from './src/navigations/StackNavs';
import { useTheme } from './src/themes';
import { Provider } from 'react-redux'
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';



function App(): React.JSX.Element {

  // return (
  //   <SafeAreaProvider>
  //     <Provider store={store} >
  //       <StackNavs />
  //     </Provider>
  //   </SafeAreaProvider>
  // )

  return (
    <SafeAreaProvider>
      
      <Provider store={store} >
        <PersistGate loading={null} persistor={persistor} >
          <StackNavs />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
