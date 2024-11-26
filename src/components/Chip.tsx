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
import Ionicons from 'react-native-vector-icons/Ionicons'
import IconButton from './IconButton';
import Spacing from './Spacing';
import Badge from './Badge';
import CustomText from './CustomText';


function Chip({
    label, 
    background, 
    active, 
    onPress, 
    style, 
    color, 
    leftIcon, 
    rightIcon
}): React.JSX.Element {

    const dispatch = useAppDispatch()
    const {colors, activeTheme} = useTheme()
    const styles = useMemo(() => GetStyles(colors), [activeTheme])

    const bgColor = background ? background : active ? colors.base : colors.background

    const fontColor = color ? color : active ? colors.white :  colors.font

    return (
        <Pressable 
            style={[styles.chip, {backgroundColor:bgColor}, style]} 
            onPress={onPress}
        >
            {leftIcon ?
                <>
                    <Ionicons name={leftIcon} size={12} color={fontColor} />
                    <Spacing horizontal={5} />
                </>
            : null }
            <CustomText size={12} color={fontColor} >{label}</CustomText>
            {rightIcon ?
                <>
                    <Spacing horizontal={5} />
                    <Ionicons name={rightIcon} size={12} color={fontColor} />
                </>
            : null }
        </Pressable>
    );
}

const GetStyles = (colors:any) => StyleSheet.create({

    chip:{
        height:25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        backgroundColor: colors.gray,
        borderRadius: 30,
        paddingHorizontal: 10,
        marginRight: 1,
        marginBottom: 1,
        
    }
    
});

export default Chip;
