import React, { useCallback, useMemo, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
    Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Dimensions,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/storeHooks';
import { useTheme } from '../themes';
import { UpdateTheme } from '../redux/settingSlice';

import Feather from 'react-native-vector-icons/Feather'
import IconButton from './IconButton';
import Spacing from './Spacing';
import Badge from './Badge';
import CustomText from './CustomText';
import { useNavigation } from '@react-navigation/native';


function Header(): React.JSX.Element {

    const dispatch = useAppDispatch()
    const {colors, activeTheme} = useTheme()
    const styles = useMemo(() => GetStyles(colors), [activeTheme])
    const navigation = useNavigation();
    const cartItems = useAppSelector(state => state?.cart?.items)



    return (
        <View style={[styles.header]} >
            <CustomText>Techno Com</CustomText>
            <View style={{flexDirection:'row'}} >

                <IconButton 
                    icon="location-outline" 
                    onPress={() => navigation.navigate('Map')}
                />

                <Spacing horizontal={5} />

                <View>
                    <IconButton icon="bag-handle-outline" onPress={() => navigation.navigate('Cart')} />
                    <Badge value={cartItems?.length} />
                </View>
            </View>
        </View>
    );
}

const GetStyles = (colors:any) => StyleSheet.create({

    header:{
        height:50,
        width:Dimensions.get("window").width,
        alignItems:'center', 
        justifyContent:'space-between',
        flexDirection:'row',
        paddingHorizontal:15,
        backgroundColor:colors.background
    }
    
});

export default Header;
