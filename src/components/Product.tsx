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
import { useAppDispatch, useAppSelector } from '../redux/storeHooks';
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
import _ from 'lodash'
import { addToCart } from '../redux/cartSlice';
import { CheckInCart } from '../uti/uti';
import { useSelector } from 'react-redux';


function Product({ productWidth, productData }): React.JSX.Element {

    const dispatch = useAppDispatch()
    const {width} = useWindowDimensions()
    const { colors, activeTheme } = useTheme()
    const styles = useMemo(() => GetStyles(colors), [activeTheme])
    const navigation = useNavigation()

    const calculatedWidth = productWidth || ((width - 45)/2)

    console.log("calculatedWidth", calculatedWidth, width)

    const InCart = useAppSelector(state => CheckInCart(state, productData?.id))

    const HandleCart = () => {
        dispatch(
            addToCart({
              id: productData.id,
              title: productData.title,
              image: productData.image,
              price: productData.price,
              quantity: 1,
            })
        )
    }

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
                
            </View>
            <View style={{padding:10}} >
                <CustomText size={14} type="bold" numberOfLines={1} >
                    {productData?.title}
                </CustomText>
                <Spacing vertical={8} />
                <View style={{ flexDirection: 'row', alignItems:'center',}} >
                    {_.times(5).map((ele, index) => 
                        <Ionicons
                            name="star"
                            size={12}
                            color={index < productData?.rating?.rate ? colors.base : colors.border}
                            style={{marginRight:2}}
                        />
                    )}
                    <Spacing horizontal={5} />

                    <CustomText size={10} color={colors.lightFont} >
                        {productData?.rating?.rate} ({productData?.rating?.count} Reviews)
                    </CustomText>
                </View>
                <Spacing vertical={10} />
                <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap' }} >
                    <View style={{ flex:1 }} >
                        <CustomText size={16} type="bold" color={colors.font} >${productData?.price}</CustomText>
                    </View>
                    <Chip
                        label={InCart ? "Added" : "Add Cart"}
                        leftIcon={InCart ? 'checkmark-circle' : 'bag-outline'}
                        active
                        style={{
                            borderColor:colors.base,
                            borderWidth:1,
                            marginRight:0
                        }}
                        onPress={HandleCart}
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
