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
import IconButton from './IconButton';
import Spacing from './Spacing';
import Badge from './Badge';
import CustomText from './CustomText';


function Header({}): React.JSX.Element {

    const dispatch = useAppDispatch()
    const {colors, activeTheme} = useTheme()
    const styles = useMemo(() => GetStyles(colors), [activeTheme])

    return (
        <View style={[styles.header]} >
            <CustomText>LOGO</CustomText>
            <View style={{flexDirection:'row'}} >
                <IconButton icon="search-outline" />
                <Spacing horizontal={5} />
                <View>
                    <IconButton icon="bag-handle-outline" />
                    <Badge value={5} />
                </View>
                <Spacing horizontal={5} />
                <View>
                    <IconButton icon="notifications-outline" />
                    <Badge value={2} />
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
