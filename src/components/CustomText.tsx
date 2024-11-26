import React, { useCallback, useMemo, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
    Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text as RnText,
  useColorScheme,
  Dimensions,
  View,
} from 'react-native';
import { useAppDispatch } from '../redux/storeHooks';
import { useTheme } from '../themes';
import { UpdateTheme } from '../redux/settingSlice';

import Feather from 'react-native-vector-icons/Feather'
import { FontLists } from '../statics/statics';


function CustomText(props: any): React.JSX.Element {

    const {children, style, type, size, color, variant } = props

    const dispatch = useAppDispatch()
    const {colors, activeTheme} = useTheme()
    const styles = useMemo(() => GetStyles(colors), [activeTheme])

    const GetFontFamily = () => {
        if(type === 'bold') return FontLists.HelveticaBold
        if(type === 'light') return FontLists.HelveticaLight
        if(type === 'boldRound') return FontLists.HelveticaBoldRounded

        return FontLists.Helvetica
    }

    let fontSize = size || 14

    let fontFamily = GetFontFamily()

    if(variant == "subHead"){
        fontSize = 16
    }

    if(variant == "head"){
        fontSize = 18
        fontFamily = FontLists.HelveticaBoldRounded
    }

    if(size){
        fontSize = size
    }


    return (
        <RnText 
            {...props}
            style={[{fontFamily:fontFamily, color:color || colors.font, fontSize:fontSize || 16}, style]} 
        >
            {children}
        </RnText>
               
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

export default CustomText;
