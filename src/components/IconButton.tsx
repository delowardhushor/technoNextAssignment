import React, { useCallback, useMemo, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
    Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Dimensions,
  View,
} from 'react-native';
import { useAppDispatch } from '../redux/storeHooks';
import { useTheme } from '../themes';
import { UpdateTheme } from '../redux/settingSlice';

import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

function IconButton({icon, onPress, size, style, color, buttonSize }): React.JSX.Element {

    const dispatch = useAppDispatch()
    const {colors, activeTheme} = useTheme()
    const styles = useMemo(() => GetStyles(colors), [activeTheme])

    let fontSize = size || 20

    let buttonStype = styles.button

    if(buttonSize == 'sm'){
        fontSize = 14
        buttonStype = {...buttonStype, ...styles.buttonSm}
    }

    if(buttonSize == 'lg'){
        fontSize = 24
        buttonStype = {...buttonStype, ...styles.buttonLg}
    }

    return (
        <Pressable style={[buttonStype, style, ]} onPress={onPress} >
            <Ionicons name={icon} color={color || colors.font} size={fontSize} />
        </Pressable>
    );
}

const GetStyles = (colors:any) => StyleSheet.create({

    button:{
        height:40,
        width:40,
        alignItems:'center', 
        justifyContent:'center',
        borderRadius:20,
        backgroundColor:colors.background,
    },

    buttonSm:{
        height:25,
        width:25,
    },

    buttonLg:{
        height:50,
        width:50,
    }
    
    
});

export default IconButton;
