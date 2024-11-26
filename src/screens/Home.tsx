import React, { useCallback, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    FlatList,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
} from 'react-native';
import { useAppDispatch } from '../redux/storeHooks';
import { globalStyles, useTheme } from '../themes';
import { UpdateTheme } from '../redux/settingSlice';

import Header from '../components/Header';
import HomeCarousel from '../components/HomeCarousel';
import HomeCategories from '../components/HomeCategories';
import Product from '../components/Product';
import CustomText from '../components/CustomText';
import Chip from '../components/Chip';
import Spacing from '../components/Spacing';
import CountDown from '../components/CountDown';
import SafeAreaWrapper from '../components/SafeAreaWrapper';


function Home({ navigation, route }): React.JSX.Element {

    const dispatch = useAppDispatch()
    const { colors, activeTheme } = useTheme()

    const styles = useMemo(() => GetStyles(colors), [activeTheme])

    return (
        <SafeAreaWrapper>

            <Header />

            <ScrollView >

                <HomeCarousel />


                <View style={styles.innerSection} >

                    <HomeCategories />

                </View>

                <Spacing vertical={15} />


                <View style={[globalStyles.globalPadding, globalStyles.rowCenterBetween]} >
                    <View style={globalStyles.rowCenter} >
                        <CustomText variant="head" >Flash Sale</CustomText>
                        <Spacing horizontal={15} />
                        <CountDown />
                    </View>
                    <Pressable>
                        <CustomText type="light" >View All</CustomText>
                    </Pressable>
                </View>

                <Spacing vertical={10} />

                <FlatList
                    style={globalStyles.globalPadding}
                    data={[1, 1, 1, 1]}
                    horizontal
                    renderItem={({ item }) =>
                        <Product productWidth={200} />
                    }
                    showsHorizontalScrollIndicator={false}
                />

                <Spacing vertical={20} />


                <View style={[globalStyles.globalPadding, globalStyles.rowCenterBetween]} >
                    <CustomText variant="head" >Recommended for you</CustomText>
                    <Pressable>
                        <CustomText type="light" >View All</CustomText>
                    </Pressable>
                </View>

                <Spacing vertical={10} />

                <FlatList
                    style={globalStyles.globalPadding}
                    data={[1, 1, 1, 1]}
                    horizontal
                    renderItem={({ item }) =>
                        <Product productWidth={200} />
                    }
                    showsHorizontalScrollIndicator={false}
                />

                <Spacing vertical={50} />


                {/* <View>
                        <FlatList 
                            style={globalStyles.globalPadding}
                            data={[1,1,1,1]}
                            numColumns={2}
                            renderItem={({item}) => 
                                <Product />   
                            }
                        />
                    </View> */}



                {/* <Pressable
                        onPress={() => navigation.navigate("Categories")}
                    >
                        <Text style={{fontSize:20, fontFamily:"helvetica-rounded-bold", color:'#000'}} >Helvetica Rounded Bold</Text>
                    </Pressable>
                    <Icons name="home" size={90} />
                    <Pressable
                        onPress={() => dispatch(UpdateTheme("Dark"))}
                    >
                        <Text>Change theme to {activeTheme}</Text>
                    </Pressable> */}
            </ScrollView>

        </SafeAreaWrapper>
    );
}

const GetStyles = (colors: any) => StyleSheet.create({

    innerSection: {
        paddingHorizontal: 15,
    }

});

export default Home;
