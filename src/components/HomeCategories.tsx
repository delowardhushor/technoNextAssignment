


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
  Image,
  FlatList,
} from 'react-native';
import { useAppDispatch } from '../redux/storeHooks';
import { useTheme } from '../themes';
import { UpdateTheme } from '../redux/settingSlice';

import Feather from 'react-native-vector-icons/Feather'
import CustomText from './CustomText';
import { categoriesData } from '../statics/fakeData';
import Spacing from './Spacing';


function HomeCategories(): React.JSX.Element {

    const dispatch = useAppDispatch()
    const {colors, activeTheme} = useTheme()
    const styles = useMemo(() => GetStyles(colors), [activeTheme])

    return (
        
        <View style={{marginVertical:20}} >

            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:10}} >
                <CustomText variant="head" >Categories</CustomText>
                <Pressable>
                    <CustomText type="light" >View All</CustomText>
                </Pressable>
            </View>

            <Spacing vertical={5} />

            <FlatList 
                data={categoriesData}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) =>
                    <View style={{width:60, marginRight:20, alignItems:'center'}} >
                        <Image 
                            style={{
                                height:60,
                                width:60,
                                borderRadius:50,
                                borderWidth:2,
                                borderColor:colors.base
                            }}
                            source={item?.image}
                        />
                        <Spacing vertical={5} />
                        <CustomText numberOfLines={1} type="bold" size={10} >{item?.name}</CustomText>
                    </View>
                }
            />

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

export default HomeCategories;
