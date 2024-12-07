import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    Alert,
    FlatList,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/storeHooks';
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
import { useFetchProductsQuery } from '../apis/products';
import IconButton from '../components/IconButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { GetViewedProducts, RequestLocationPermission } from '../uti/uti';
import Geolocation from '@react-native-community/geolocation';



function History({ navigation, route }): React.JSX.Element {

    const dispatch = useAppDispatch()

    const { colors, activeTheme } = useTheme()

    const styles = useMemo(() => GetStyles(colors), [activeTheme])

    const history = useAppSelector((state) => state.history);


   
    return (
        <SafeAreaWrapper>

            <Header />

            <FlatList
                style={globalStyles.globalPadding}
                data={history}
                numColumns={2}
                renderItem={({ item }) =>
                    <Product 
                        productData={item}
                    />
                }
                showsHorizontalScrollIndicator={false}
            />

        </SafeAreaWrapper>
    );
}

const GetStyles = (colors: any) => StyleSheet.create({

    innerSection: {
        paddingHorizontal: 15,
    }

});

export default History;
