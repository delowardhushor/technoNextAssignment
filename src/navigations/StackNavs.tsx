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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import { useTheme } from '../themes';
import Categories from '../screens/Categories';
import BottomTabNavs from './BottomTabNavs';
import ProductDetails from '../screens/ProductDetails';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';


const Stack = createNativeStackNavigator();

function StackNavs(): React.JSX.Element {

  const {colors, activeTheme} = useTheme()

  // const insets = useSafeAreaInsets()


  return (
    <View 
      style={{
        flex:1, 
        // paddingTop:insets.top, 
        // paddingBottom:insets.bottom, 
        // backgroundColor:colors.background
      }} 
    >
      <StatusBar
        barStyle={activeTheme == "Light" ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background}
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown:false,
          }}
          initialRouteName='BottomTabNavs'
        >
          <Stack.Group>
            <Stack.Screen name="BottomTabNavs" component={BottomTabNavs} />
            {/* <Stack.Screen name="Home" component={Home} /> */}
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="Categories" component={Categories} />
          </Stack.Group>
          {/* <Stack.Group screenOptions={{ presentation: 'modal' }} >
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
          </Stack.Group> */}
        </Stack.Navigator>
        
      </NavigationContainer>
    </View>

  );
  
}

const styles = StyleSheet.create({
    
});

export default StackNavs;
