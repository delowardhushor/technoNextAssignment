import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    ActivityIndicator,
    Alert,
    DeviceEventEmitter,
    FlatList,
    NativeModules,
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
import { UpdateLocation, UpdateTheme } from '../redux/settingSlice';

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
import moment from 'moment';
import { useNetInfo } from '@react-native-community/netinfo';
import { setCachedProducts } from '../redux/cacheSlice';
import { startTimestampUpdates, onTimestampUpdate, stopTimestampUpdates } from '../uti/TimestampModuleWrapper';

const { TimestampModule } = NativeModules;

function Home({ navigation, route } : {navigation:any, route: any}): React.JSX.Element {

    const dispatch = useAppDispatch()

    const { colors, activeTheme } = useTheme()

    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const { data : products, isLoading, error, refetch } = useFetchProductsQuery(sortOrder);


    const [timestamp, setTimestamp] = useState<string | null>(null);

    useEffect(() => {

        TimestampModule.startTimestampUpdates();
        const subscription = DeviceEventEmitter.addListener('TimestampEvent', (newTimestamp: string) => {
            
            setTimestamp(newTimestamp);

        });

        return () => {
            TimestampModule.stopTimestampUpdates(); 
            subscription.remove(); 
        };

    }, []);

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
            dispatch(UpdateLocation({ latitude, longitude }))
        },
        (error) => {
            Alert.alert('Error', error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      };

    //   console.log("Location", location)

    const styles = useMemo(() => GetStyles(colors), [activeTheme])

    const netInfo = useNetInfo()

    const isOffline = !netInfo.isConnected;

    const cachedProducts = useAppSelector(state=> state.cache.products);


    useEffect(() => {
        if (!isOffline && products) {
            dispatch(setCachedProducts(products));
        }
    }, [isOffline, products, dispatch]);

    const productList = isOffline ? cachedProducts : products;

    const formattedTimestamp = timestamp
        ? moment(Number(timestamp)).format('MMMM Do YYYY, h:mm:ss a')
        : 'Waiting for timestamp...';

    return (
        <SafeAreaWrapper>

            <Header />

            <CustomText style={{textAlign:'center'}} type='bold' >Local Time: {formattedTimestamp}</CustomText>

            <View
                style={styles.productTitleWrapper}
            >
                
                <CustomText>Products</CustomText>

                <TouchableOpacity
                    style={styles.sortBtn}
                    onPress={() => setSortOrder(sortOrder == 'asc' ? 'desc' : 'asc')}
                >
                    <FontAwesome5 
                        name={sortOrder == 'asc' ? "sort-alpha-down" : "sort-alpha-up"}
                        size={18}
                        color={colors.font}
                    />
                </TouchableOpacity>

            </View>

            {isLoading ?
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}} >
                    <ActivityIndicator />
                </View>
            :   
                <FlatList
                    style={globalStyles.globalPadding}
                    data={productList}
                    numColumns={2}
                    renderItem={({ item }) =>
                        <Product 
                            productData={item}
                        />
                    }
                    showsHorizontalScrollIndicator={false}
                />
            }

        </SafeAreaWrapper>
    );
}

const GetStyles = (colors: any) => StyleSheet.create({

    innerSection: {
        paddingHorizontal: 15,
    },

    productTitleWrapper:{
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
    },

    sortBtn:{
        height:40,
        width:40,
        justifyContent:'center',
        alignItems:'center',
        borderColor: colors.border,
    }

});

export default Home;
