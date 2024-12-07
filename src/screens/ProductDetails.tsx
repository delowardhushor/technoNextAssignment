import React, { useEffect, useMemo, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  Image,
  View,
  ImageBackground,
  FlatList,
} from 'react-native';
import { useAppDispatch } from '../redux/storeHooks';
import { globalStyles, useTheme } from '../themes';
import { UpdateTheme } from '../redux/settingSlice';
import CustomImage from '../components/CustomImage';
import IconButton from '../components/IconButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomText from '../components/CustomText';
import Hr from '../components/Hr';
import Spacing from '../components/Spacing';
import ReviewStars from '../components/ReviewStars';
import Chip from '../components/Chip';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Button from '../components/Button';
import ProductCarousel from '../components/ProductCarousel';
import Product from '../components/Product';
import { AddProductToHistory } from '../uti/uti';
import { addToHistory } from '../redux/historySlice';


function ProductDetails({navigation, route} : {navigation:any, route: any}): React.JSX.Element {

    const dispatch = useAppDispatch()
    const {colors, activeTheme} = useTheme()   
    const {width} = useWindowDimensions() 

    const {productData} = route?.params

    const insets = useSafeAreaInsets()
    const styles = useMemo(() => GetStyles(colors), [activeTheme])

    const [selectedSize, SetselectedSize] = useState("")
    const [selectedColor, SetselectedColor] = useState("")

    const [scrollPosition, SetscrollPosition] = useState(0)

    const OnScroll = (event:any) => {

        SetscrollPosition(event.nativeEvent.contentOffset.y)

    }


    useEffect(() => {

        dispatch(addToHistory(productData));

      }, []);

    return (
        <View style={{flex:1, backgroundColor:colors.background}} >
            <ScrollView
                onScroll={OnScroll}
                overScrollMode="never"
            >

                <CustomImage 
                    source={{uri:productData?.image}}
                    style={{
                        height:width*.8,
                        width:width,
                    }}
                    resizeMode="contain"
                />


                <View style={styles.detailsSection} >

                    <View style={globalStyles.rowCenterBetween} >
                        <CustomText 
                            style={{flex:1}} 
                            type={"boldRound"} 
                            variant="head" 
                            size={20} 
                            numberOfLines={2} 
                        >
                            {productData?.title}
                        </CustomText>
                        <IconButton 
                            icon="share-social-outline"
                            style={globalStyles.shadow}
                        />
                    </View>

                    <Spacing vertical={10} />

                    <View style={globalStyles.rowCenter}>
                        <View style={styles.sold} >
                            <CustomText size={12} type='bold' >
                                8269 sold
                            </CustomText>
                        </View>
                        <Spacing horizontal={20} />
                        <View style={globalStyles.rowCenter}>
                            <ReviewStars value={4} />
                            <Spacing horizontal={5} />
                            <CustomText size={12} type='bold' >
                                4.8 (2,263 reviews)
                            </CustomText>
                        </View>
                            
                    </View>

                    <Spacing vertical={20} />

                    <Hr />

                    <Spacing vertical={20} />


                    <CustomText size={18} type="bold" >
                        Descriptions
                    </CustomText>

                    <Spacing vertical={10} />

                    <CustomText type='light' >
                        {productData?.description}
                    </CustomText>

                    <Spacing vertical={20} />

                    <Hr />


                    
                    
                </View>

                <Spacing vertical={5} />


                

                {/* <Image 
                    source={require("./../assets/images/light-layer.png")}
                /> */}

                <View style={{height:100}} />

            </ScrollView>

            
            <View
                style={{
                    position:'absolute',
                    bottom:insets.bottom+50,
                    left:0,
                    right:0,
                }}
                pointerEvents="none"
            >
                <Image 
                    source={require("./../assets/images/light-layer.png")}
                    style={{
                        // height:width/3.1,
                        height:60,
                        width:width,
                    }}
                    resizeMode='stretch'

                />
                <View style={{paddingBottom:insets.top, backgroundColor:colors.background}} >
                    <View style={{height:40/4}} />
                </View>

            </View>

            <View
                style={{
                    
                    position:'absolute',
                    bottom:0,
                    left:0,
                    right:0,
                }}
            >
               
                    
            
                <View style={{backgroundColor:colors.background,paddingHorizontal:15, flexDirection:'row', alignItems:'center', justifyContent:'space-between', height:40}} >
                    <View>
                        <CustomText type='bold' >
                            Price
                        </CustomText>
                        <View style={globalStyles.rowCenterEnd} >
                            <CustomText size={14} style={{textDecorationLine:'line-through'}} color={colors.lightFont} >$18</CustomText>

                            <Spacing horizontal={5} />

                            <CustomText size={18} type="bold" color={colors.base} >$20</CustomText>
                        </View>
                    </View>
                    <Spacing horizontal={50} />
                    <View style={globalStyles.rowCenter} >
                    {true ?
                        <View style={[styles.cartBtn, globalStyles.shadow]} >
                            <IconButton 
                                icon='remove' 
                                style={styles.cartIcon} 
                                color={colors.white}
                                // size={30}
                            />
                            <Spacing horizontal={10} />
                            <CustomText color={colors.white} type="bold" >2</CustomText>
                            <Spacing horizontal={10} />
                            <IconButton 
                                icon='add' 
                                style={styles.cartIcon} 
                                color={colors.white}
                                // size={30}
                            />
                        </View>
                    :
                        <Button 
                            label="Add Cart"
                            active
                            leftIcon="bag-handle"
                            style={[globalStyles.shadow, {width:120}]}
                        />
                    }
                    <Spacing horizontal={10} />

                    <IconButton 
                        icon="heart-outline"
                        style={globalStyles.shadow}
                    />
                    </View>
                    
                </View>
                <View style={{height:insets.bottom+10, backgroundColor:colors.background}} />
            </View>

            <View style={{position:'absolute', top:0, right:0, left:0, backgroundColor:`rgba(255, 255, 255, ${scrollPosition * 2 / width })`, paddingTop:insets.top}} >

                <View style={[{height:50, alignItems:'center', flexDirection:'row'}, globalStyles.globalPadding]} >

                    <IconButton 
                        icon='arrow-back'
                        // style={{position:'absolute', top:insets.top+5, left:15}}
                        onPress={navigation.goBack}
                    />

                    <Spacing horizontal={15} />

                    <View style={{flex:1}} >
                        <CustomText numberOfLines={1} style={{color:colors.font, opacity:scrollPosition * 2 / width}} type="bold" size={16} >{productData?.title}</CustomText>

                    </View>


                </View>

            </View>

            

        </View>
    );
}

const GetStyles = (colors: any) => StyleSheet.create({
    
    detailsSection:{
        padding:15
    },

    sold:{
        backgroundColor:colors.border,
        borderRadius:8,
        paddingHorizontal:10,
        height:25,
        alignItems:"center",
        justifyContent:'center'
    },

    cartBtn:{
        flexDirection:'row',
        height:40,
        borderRadius:20,
        alignItems: 'center',
        justifyContent:'space-between',
        width:120,
        paddingHorizontal:5,
        backgroundColor:colors.base,
    },

    cartIcon:{
        height:30,
        width:30,
        backgroundColor:colors.base,
        borderWidth:1,
        borderColor:colors.white
    },

    shop:{
        padding:10,
        borderRadius:10,
        backgroundColor:colors.background,
        flexDirection:'row'
    }
    
});

export default ProductDetails;
