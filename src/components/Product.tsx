import React, { useCallback, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
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
    useWindowDimensions,
} from 'react-native';
import { useAppDispatch } from '../redux/storeHooks';
import { globalStyles, useTheme } from '../themes';
import { UpdateTheme } from '../redux/settingSlice';

import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomText from './CustomText';
import Spacing from './Spacing';
import IconButton from './IconButton';
import Chip from './Chip';
import { useNavigation } from '@react-navigation/native';
import CustomImage from './CustomImage';


function Product({ productWidth, productData }): React.JSX.Element {

    const dispatch = useAppDispatch()
    const {width} = useWindowDimensions()
    const { colors, activeTheme } = useTheme()
    const styles = useMemo(() => GetStyles(colors), [activeTheme])
    const navigation = useNavigation()

    const calculatedWidth = productWidth || ((width - 45)/2)

    console.log("calculatedWidth", calculatedWidth, width)

    return (
        <Pressable 
            style={[globalStyles.shadow, styles.product, {width:calculatedWidth}]} 
            onPress={() => navigation.navigate("ProductDetails")}
        >
            <View>
                <CustomImage
                    style={[styles.image, {width:calculatedWidth, height:calculatedWidth} ]}
                    source={{uri:productData?.image}}
                    resizeMode="contain"
                />
                <View style={[styles.shadow, { position: "absolute", bottom: 10, right: 10, backgroundColor: colors.background, borderRadius: 20 }]} >
                    <IconButton
                        icon="heart-outline"
                        buttonSize="sm"
                        // size={20}
                        // style={{
                        //     height:35,
                        //     width:35
                        // }}
                    />
                </View>
                <Chip 
                    label="New" 
                    style={[globalStyles.shadow, { position: "absolute", top: 10, right: 10, backgroundColor: colors.background, borderRadius: 20 }]}
                />
                <Chip 
                    label="-10%" 
                    background={colors.base} 
                    color={colors.white} 
                    style={[globalStyles.shadow, { position: "absolute", top: 10, left: 10, borderRadius: 20 }]} 
                />
            </View>
            <View style={{padding:10}} >
                <CustomText size={14} type="bold" numberOfLines={1} >Dress asdf asd asd asd sadsa asd</CustomText>
                <Spacing vertical={8} />
                <View style={{ flexDirection: 'row', alignItems:'center',}} >
                    {[1,1,1,1,1].map((ele, index) => 
                        <Ionicons
                            name="star"
                            size={12}
                            color={index < 3 ? colors.base : colors.border}
                            style={{marginRight:2}}
                        />
                    )}
                    <Spacing horizontal={5} />

                    <CustomText size={10} color={colors.lightFont} >
                        4.8 (12K Reviews)
                    </CustomText>
                </View>
                <Spacing vertical={10} />
                <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap' }} >
                    <View style={{ flex:1 }} >
                        <CustomText size={10} style={{textDecorationLine:'line-through'}} color={colors.lightFont} >$150</CustomText>
                        <Spacing horizontal={5} />
                        <CustomText size={16} type="bold" color={colors.font} >$120</CustomText>
                    </View>
                    <Chip
                        label="Add Cart"
                        leftIcon='bag-outline'
                        active
                        style={{
                            borderColor:colors.base,
                            borderWidth:1,
                            marginRight:0
                        }}
                        // color={colors.base}
                    />
                    {/* <IconButton
                        icon="bag"
                        size={14}
                        style={[styles.shadow, {
                            height:25,
                            width:25,
                        }]}
                    /> */}
                </View>
            </View>
            

        </Pressable>
    );
}

const GetStyles = (colors: any) => StyleSheet.create({

    image: {
        height: 180,
        // width:null,
        flex: 1,
        backgroundColor: colors.border,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
    },

    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },

    product: { 
        // flex: 1, 
        marginRight: 15,
        marginBottom: 15, 
        // overflow: 'hidden', 
        borderRadius: 10,
        backgroundColor: colors.background, 
    }

});

export default Product;
