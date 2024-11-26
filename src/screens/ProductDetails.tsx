import React, { useMemo, useState } from 'react';
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


function ProductDetails({navigation}): React.JSX.Element {

    const dispatch = useAppDispatch()
    const {colors, activeTheme} = useTheme()   
    const {width} = useWindowDimensions() 

    const insets = useSafeAreaInsets()
    const styles = useMemo(() => GetStyles(colors), [activeTheme])

    const [selectedSize, SetselectedSize] = useState("")
    const [selectedColor, SetselectedColor] = useState("")

    const [scrollPosition, SetscrollPosition] = useState(0)

    const OnScroll = (event:any) => {

        SetscrollPosition(event.nativeEvent.contentOffset.y)

    }

    return (
        <View style={{flex:1, backgroundColor:colors.background}} >
            <ScrollView
                onScroll={OnScroll}
                overScrollMode="never"
            >

                {/* <CustomImage 
                    source={{uri:"https://cdn.thewirecutter.com/wp-content/media/2024/05/running-shoes-2048px-9718.jpg"}}
                    style={{
                        height:width*.8,
                        width:width,
                    }}
                /> */}

                <ProductCarousel />

                <View style={styles.detailsSection} >

                    <View style={globalStyles.rowCenterBetween} >
                        <CustomText 
                            style={{flex:1}} 
                            type={"boldRound"} 
                            variant="head" 
                            size={20} 
                            numberOfLines={2} 
                        >
                            Sport Shoes zsd asdasdasdasd asdas das dasd asd adsa
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

                    <View style={{flexDirection:'row'}} >
                        <View style={{flex:1}} >
                            <CustomText size={18} type="bold" >
                                Colors
                            </CustomText>
        
                            <Spacing vertical={10} />

                            <View style={{flexDirection:'row', flexWrap:'wrap', flex:1}} >
                                {['red', 'black', 'blue', 'white'].map(ele => 
                                    <Pressable 
                                        style={{
                                            height:30, 
                                            width:30, 
                                            marginRight:10, 
                                            marginBottom:10, 
                                            backgroundColor:ele, 
                                            borderRadius:20,
                                            borderWidth:1,
                                            borderColor:colors.border,
                                            overflow: 'hidden'
                                        }} 
                                        onPress={() => SetselectedColor(ele)}
                                    >
                                        {selectedColor == ele ? 
                                            <View
                                                style={{
                                                    height:30, 
                                                    width:30, 
                                                    alignItems: 'center',
                                                    justifyContent:'center',
                                                    backgroundColor:'rgba(255,255,255,0.5)'
                                                }}
                                            >
                                                <Ionicons size={18} name="checkmark-sharp" color={colors.black} />
                                            </View>
                                        : null }
                                    </Pressable>
                                )}
                            </View>
                        </View>
                        <View style={{flex:1}} >

                            <CustomText size={18} type="bold" >
                                Size
                            </CustomText>

                            <Spacing vertical={10} />

                            <View style={{flexDirection:'row', flexWrap:'wrap', flex:1}} >
                                {['S', 'M', 'L', 'XL'].map(ele => 
                                    <Chip 
                                        label={ele}
                                        onPress={() => SetselectedSize(ele)}
                                        active={ele === selectedSize}
                                        style={{
                                            borderWidth:1,
                                            borderColor:colors.base,
                                            marginRight:10,
                                            marginBottom:10
                                        }}
                                    />
                                )}
                            </View>
                        </View>

                    </View>

                    <Spacing vertical={20} />

                    <Hr />

                    <Spacing vertical={20} />

                    <View style={globalStyles.rowCenterBetween} >
                        <CustomText size={18} type="bold" >
                            Reviews & Ratings
                        </CustomText>
                        <Pressable>
                            <CustomText size={18} color={colors.lightFont} >
                                View All
                            </CustomText>
                        </Pressable>
                    </View>

                    <Spacing vertical={15} />

                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}} >
                        <View style={{alignItems:'center', justifyContent:'center', width:150}} >
                            <CustomText size={60} type='boldRound' >4.8</CustomText>
                            {/* <Spacing vertical={10} /> */}
                            <ReviewStars value={3.6} />
                            <Spacing vertical={10} />
                            <CustomText  type='light' >2.5K Reviews</CustomText>

                        </View>

                        <View style={{ flex:1}} >

                            {[1200,1400,1000,500,300].map((ele , index) => 

                                <View style={{flexDirection:'row', alignItems:'center', height:25}} >
                                    <Ionicons 
                                        name='star'
                                        color={colors.base}
                                    />
                                    <Spacing horizontal={5} />
                                    <CustomText>{(index - 5)*-1}</CustomText>
                                    <Spacing horizontal={10} />

                                    <View style={{flex:1, backgroundColor:colors.border, height:10, flexDirection:'row', borderRadius:10, overflow:'hidden'}} >
                                        <View style={{backgroundColor:colors.base, flex:index/10, borderRadius:20}} />
                                    </View>
                                    <Spacing horizontal={10} />
                                    <View style={{width:30}} >
                                        <CustomText size={10} type='bold' >1.5K</CustomText>
                                    </View>
                                </View>

                            )}
                                                    
                        </View>
                    </View>

                    <Spacing vertical={20} />

                    <Hr />

                    <Spacing vertical={20} />

                    <CustomText size={18} type="bold" >
                        Saler Informations
                    </CustomText>

                    <Spacing vertical={10} />


                    <View style={[styles.shop, globalStyles.shadow]} >

                        <CustomImage 
                            source={{uri:"https://cdn.thewirecutter.com/wp-content/media/2024/05/running-shoes-2048px-9718.jpg"}}
                            style={{
                                height:110,
                                width:110,
                                borderRadius:10,
                                overflow: 'hidden'
                            }}
                        />
                        <Spacing horizontal={10} />

                        

                        <View style={{flex:1}} >

                            <CustomText size={16} type="bold" >
                                Urban Fashions
                            </CustomText>
                           

                            <Spacing vertical={5} />

                            <View style={globalStyles.rowCenter}>
                                <ReviewStars value={4} />
                                <Spacing horizontal={5} />
                                <CustomText size={12} type='bold' >
                                    4.8 (2.4K Reviews)
                                </CustomText>
                            </View>

                            <Spacing vertical={10} />

                            {/* <ReviewStars value={4} /> */}

                            <View style={{flexDirection:'row'}} >
                                <View style={[styles.sold, {flex:1}]} >
                                    <CustomText size={12} type='bold' >
                                        23 Products
                                    </CustomText>
                                </View>
                                <Spacing horizontal={5} />
                                <View style={[styles.sold, {flex:1}]} >
                                    <CustomText size={12} type='bold' >
                                        8.2K item sold
                                    </CustomText>
                                </View>
                            </View>

                            <Spacing vertical={10} />

                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', flexWrap:'wrap'}} >

                                <IconButton 
                                    icon="chatbubble-outline"
                                    style={[globalStyles.shadow, {height:25, width:25}]}
                                    size={14}
                                />

                                <Spacing horizontal={10} />
                                
                                <Chip 
                                    leftIcon="eye"
                                    label="Visit Shop"
                                    active
                                />

                            </View>


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
                        This sport shoes is made from premium leather and features a waterproof sole for a comfortable and dry fit. It is equipped with a 1.5 inch thick heel for added support and a 2.5 inch heel for a more comfortable fit.
                        {"\n"}
                        This sport shoes is made from premium leather and features a waterproof sole for a comfortable and dry fit. It is equipped with a 1.5 inch thick heel for added support and a 2.5 inch heel for a more comfortable fit.
                    </CustomText>

                    <Spacing vertical={20} />

                    <Hr />


                    
                    
                </View>

                <Spacing vertical={5} />


                <View>
                    <View style={globalStyles.globalPadding} >
                        <CustomText size={18} type="bold" >
                            Recommened For you
                        </CustomText>
                    </View>

                    <Spacing vertical={10} />
                    
                    <FlatList 
                        style={globalStyles.globalPadding}
                        data={[1,1,1,1]}
                        numColumns={2}
                        renderItem={({item}) => 
                            <Product />   
                        }
                    />
                </View>

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
                {/* <Spacing vertical={10} /> */}
                {/* <View
                    pointerEvents="none"
                >
                    <Image 
                        source={require("./../assets/images/light-layer.png")}
                        style={{
                            // height:width/3.1,
                            height:30,
                            width:width,
                            marginBottom:-2
                        }}
                        resizeMode='stretch'

                    />
                </View> */}
                    
            
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

                    <CustomText style={{color:colors.font, opacity:scrollPosition * 2 / width}} type="bold" size={16} >Nice Shoes</CustomText>

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
