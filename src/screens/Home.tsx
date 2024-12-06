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
import IconButton from '../components/IconButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { RequestLocationPermission } from '../uti/uti';
import Geolocation from '@react-native-community/geolocation';



function Home({ navigation, route }): React.JSX.Element {

    const dispatch = useAppDispatch()

    const { colors, activeTheme } = useTheme()

    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const { data, isLoading, error, refetch } = useFetchProductsQuery(sortOrder);

    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    useEffect(() => {
        fetchLocation()
    }, [])

    const fetchLocation = async () => {
        // (requestLocationPermission logic as earlier)

        const hasPermission = await RequestLocationPermission();
        if (!hasPermission) return;

        Geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
        },
        (error) => {
            Alert.alert('Error', error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      };

      console.log("Location", location)

    const styles = useMemo(() => GetStyles(colors), [activeTheme])

    return (
        <SafeAreaWrapper>

            <Header 
                location={location}
            />

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    marginBottom: 10,
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    backgroundColor: colors.background,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 1.41,
                    elevation: 2,
                }}
            >
                
                <CustomText>Products</CustomText>
                <TouchableOpacity
                    style={{
                        height:40,
                        width:40,
                        justifyContent:'center',
                        alignItems:'center',
                        borderColor: colors.border,
                    }}
                    onPress={() => setSortOrder(sortOrder == 'asc' ? 'desc' : 'asc')}
                >
                    <FontAwesome5 
                        name={sortOrder == 'asc' ? "sort-alpha-down" : "sort-alpha-up"}
                        size={18}
                        color={colors.font}
                    />
                </TouchableOpacity>

            </View>

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
