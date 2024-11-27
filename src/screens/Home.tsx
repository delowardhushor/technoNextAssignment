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
import { useFetchProductsQuery } from '../apis/products';


function Home({ navigation, route }): React.JSX.Element {

    const dispatch = useAppDispatch()
    const { colors, activeTheme } = useTheme()

    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const { data, isLoading, error, refetch } = useFetchProductsQuery(sortOrder);


    const styles = useMemo(() => GetStyles(colors), [activeTheme])

    return (
        <SafeAreaWrapper>

            <Header />

            <FlatList
                style={globalStyles.globalPadding}
                data={data}
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

export default Home;
