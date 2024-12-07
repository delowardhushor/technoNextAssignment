import React, { useMemo } from 'react';
import {
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/storeHooks';
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
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

function Cart({ navigation, route }): React.JSX.Element {

    const dispatch = useAppDispatch()
    const { colors, activeTheme } = useTheme()

    const styles = useMemo(() => GetStyles(colors), [activeTheme])

    const cartItems = useAppSelector(state => state?.cart?.items)

    const cartTotal =  useMemo(() => {
        return cartItems.reduce((acc, curr) => acc + (curr?.quantity * curr?.price), 0)
    }, [cartItems])

    return (
        <SafeAreaWrapper>

            <Header />

            <ScrollView style={styles.innerSection} >

                <FlatList 
                    data={cartItems}
                    ListEmptyComponent={
                        <View style={[{marginTop:20, alignItems:'center', justifyContent:'center'}]} >
                            <CustomText style={{textAlign:'center'}} type='bold' size={16} >Cart empty</CustomText>
                        </View>
                    }
                    renderItem={({item}) => 
                        <View style={[styles.cart, globalStyles.shadow]} >

                            <CustomImage 
                                style={{
                                    height:100,
                                    width:100,
                                    borderRadius:15,
                                    overflow: 'hidden'
                                }}
                                source={{uri:item?.image}}
                                resizeMode="contain"
                            />

                            <Spacing horizontal={10} />

                            <View style={styles.cartRight} >

                                <View style={globalStyles.rowCenterBetween} >
                                    <CustomText style={{flex:1}} numberOfLines={1} size={16} type="bold" >
                                        {item?.title}
                                    </CustomText>
                                    <Spacing horizontal={5} />
                                    <IconButton 
                                        icon="close-outline"
                                        onPress={() => dispatch(removeFromCart( item?.id))}
                                    />
                                </View>
                                {/* <Spacing vertical={10} /> */}

                                
                                <Spacing vertical={10} />
                                <View style={globalStyles.rowCenterBetween} >
                                    <View style={globalStyles.rowCenterEnd} >

                                        <CustomText size={18} type="bold" color={colors.base} >${item?.price}</CustomText>
                                    </View>

                                    <View style={styles.incDecBtn} >
                                        <Pressable 
                                            style={styles.incBtn} 
                                            onPress={() => dispatch(updateQuantity({ id: item?.id, quantity: item?.quantity > 2 ? item?.quantity - 1 : 1}))}
                                        >
                                            <Ionicons 
                                                name="remove"
                                                size={14}
                                                color={colors.font}
                                                
                                            />
                                        </Pressable>
                                        <Spacing horizontal={5} />
                                        <CustomText size={14} type='bold' >
                                            {item?.quantity}
                                        </CustomText>
                                        <Spacing horizontal={5} />
                                        <Pressable
                                            style={styles.incBtn} 
                                            onPress={() => dispatch(updateQuantity({ id: item?.id, quantity: item?.quantity + 1}))}

                                        >
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
                    }
                    keyExtractor={item => item?.id}
                />

               
                 
            </ScrollView>

            <View style={{ flexDirection:'row', justifyContent:"space-between", padding:15, borderTopRightRadius:20, borderTopLeftRadius:20, borderWidth:1, borderBottomWidth:0, borderColor:colors.border}} >
                <View>
                    <CustomText type="bold" size={12} >Subtotal</CustomText>
                    {/* <Spacing vertical={5} /> */}
                    <CustomText type="bold" size={18} color={colors.base} >${(cartTotal).toFixed(2)}</CustomText>
                </View>
                <Button 
                    label="Proceed to Checkout"
                    active
                    rightIcon="arrow-forward-outline"
                    onPress={() => navigation.navigate("Checkout")}
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
    }

});

export default Cart;
