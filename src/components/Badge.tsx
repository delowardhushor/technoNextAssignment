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
import { useAppDispatch } from '../redux/storeHooks';
import { useTheme } from '../themes';
import { UpdateTheme } from '../redux/settingSlice';

import Feather from 'react-native-vector-icons/Feather'
import CustomText from './CustomText';


function Badge({value}): React.JSX.Element {

    const dispatch = useAppDispatch()
    const {colors, activeTheme} = useTheme()
    const styles = useMemo(() => GetStyles(colors), [activeTheme])

    return (
        <View style={{backgroundColor:colors.base, height:20, width:20, borderRadius:15, position:'absolute', top:0, right:0, alignItems:'center', justifyContent:'center'}} >
            <CustomText size={10} type="bold" color={colors.white} >{value}</CustomText>
        </View>
               
    );
}

const GetStyles = (colors:any) => StyleSheet.create({

    button:{
        height:40,
        width:40,
        alignItems:'center', 
        justifyContent:'center',
    }
    
});

export default Badge;
