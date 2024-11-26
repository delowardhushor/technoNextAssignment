import React, { useMemo } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { useAppDispatch } from '../redux/storeHooks';
import { globalStyles, useTheme } from '../themes';

import CustomImage from '../components/CustomImage';
import CustomText from '../components/CustomText';
import Header from '../components/Header';
import IconButton from '../components/IconButton';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Spacing from '../components/Spacing';
import Ionicons from "react-native-vector-icons/Ionicons"
import Chip from '../components/Chip';
import Button from '../components/Button';
import CircleIcons from '../components/CircleIcons';

function Checkout({ navigation, route }): React.JSX.Element {

    const dispatch = useAppDispatch()
    const { colors, activeTheme } = useTheme()

    const styles = useMemo(() => GetStyles(colors), [activeTheme])

    return (
        <SafeAreaWrapper>

            <Header />

            <ScrollView style={styles.innerSection} >

                <CustomText variant="head" >Shipping Address</CustomText>

                <Spacing vertical={10} />

                <View style={[globalStyles.shadow, styles.address]} >
                    <CircleIcons name="location-outline" />
                    <Spacing horizontal={10} />
                    <View style={{flex:1}} >
                        <CustomText type='bold' size={16} >Home</CustomText>
                        <CustomText type='light' size={12} >Dhaka, 1207</CustomText>
                    </View>
                    <IconButton 
                        icon="pencil-outline"
                    />
                </View>

                <Spacing vertical={20} />

                {[1,1,1,1,1,1].map(ele => 

                    <View style={[styles.cart, globalStyles.shadow]} >

                        <CustomImage 
                            style={{
                                height:100,
                                width:100,
                                borderRadius:15,
                                overflow: 'hidden'
                            }}
                            source={{uri:"https://cdn.thewirecutter.com/wp-content/media/2024/05/running-shoes-2048px-9718.jpg"}}
                        />

                        <Spacing horizontal={10} />

                        <View style={styles.cartRight} >

                            <View style={globalStyles.rowCenterBetween} >
                                <CustomText style={{flex:1}} numberOfLines={1} size={16} type="bold" >
                                    Nice Shoes dsfg sdf dsfsd fsdfssdf sdfsfsdf
                                </CustomText>
                                <Spacing horizontal={5} />
                                <IconButton 
                                    icon="close-outline"
                                />
                            </View>
                            {/* <Spacing vertical={10} /> */}

                            <View style={globalStyles.rowCenter} >
                                <CustomText>Color: <CustomText type="bold" >RED</CustomText></CustomText>
                                <Spacing horizontal={5} />
                                <CustomText type="bold" >|</CustomText>
                                <Spacing horizontal={5} />
                                <CustomText>Size: <CustomText type="bold" >M</CustomText></CustomText>
                            </View>
                            <Spacing vertical={10} />
                            <View style={globalStyles.rowCenterBetween} >
                                <View style={globalStyles.rowCenterEnd} >
                                    <CustomText size={14} style={{textDecorationLine:'line-through'}} color={colors.lightFont} >$18</CustomText>

                                    <Spacing horizontal={5} />

                                    <CustomText size={18} type="bold" color={colors.base} >$20</CustomText>
                                </View>

                                <View style={styles.incDecBtn} >
                                    <Pressable style={styles.incBtn} >
                                        <Ionicons 
                                            name="remove"
                                            size={14}
                                            color={colors.font}
                                        />
                                    </Pressable>
                                    <Spacing horizontal={5} />
                                    <CustomText size={14} type='bold' >
                                        1
                                    </CustomText>
                                    <Spacing horizontal={5} />
                                    <Pressable style={styles.incBtn} >
                                        <Ionicons 
                                            name="add"
                                            size={14}
                                            color={colors.font}
                                        />
                                    </Pressable>
                                </View>
                            </View>

                        </View>
                        
                    </View>

                )}
                 
            </ScrollView>

            <View style={{ flexDirection:'row', justifyContent:"space-between", padding:15, borderTopRightRadius:20, borderTopLeftRadius:20, borderWidth:1, borderBottomWidth:0, borderColor:colors.border}} >
                <View>
                    <CustomText type="bold" size={12} >Subtotal</CustomText>
                    {/* <Spacing vertical={5} /> */}
                    <CustomText type="bold" size={18} color={colors.base} >$19.23</CustomText>
                </View>
                <Button 
                    label="Proceed to Payment"
                    active
                    rightIcon="arrow-forward-outline"
                />
            </View>

        </SafeAreaWrapper>
    );
}

const GetStyles = (colors: any) => StyleSheet.create({

    innerSection: {
        paddingHorizontal: 15,
    },

    cart:{
        backgroundColor:colors.background,
        padding:10,
        borderRadius:20,
        marginVertical:5,
        flexDirection: "row",
        alignItems:'center'
    },

    cartRight:{
        flex:1
    },

    incDecBtn:{
        // height:30,
        borderRadius:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        minWidth:100,
        paddingHorizontal:5,
        backgroundColor: colors.backgroundSecondary,
    },

    incBtn:{
        height:30,
        width:30,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
    },

    address:{
        backgroundColor:colors.background,
        padding:10,
        borderRadius:20,
        flexDirection: "row",
        alignItems:'center',
    }

});

export default Checkout;
