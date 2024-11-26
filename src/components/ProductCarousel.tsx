import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
    Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Dimensions,
  View,
  FlatList,
  useWindowDimensions,
  Image,
} from 'react-native';
import { useAppDispatch } from '../redux/storeHooks';
import { globalStyles, useTheme } from '../themes';
import { UpdateTheme } from '../redux/settingSlice';

import Icons from 'react-native-vector-icons/AntDesign'
import { HomeCarouselData } from '../statics/fakeData';


function ProductCarousel(): React.JSX.Element {

    const dispatch = useAppDispatch()
    const ScrollRef = useRef(null)
    const {colors, activeTheme} = useTheme()
    const styles = useMemo(() => GetStyles(colors), [activeTheme])
    const {width} = useWindowDimensions()

    console.log("width", width)

    const [activeCarousel, SetactiveCarousel] = useState(0)

    const sliderWidth = width

    useEffect(() => {

        const CarouselInterval = setInterval(() => {

            SetactiveCarousel(i => {

                const newI = i == HomeCarouselData.length - 1 ? 0 : i + 1
                
                ScrollRef?.current?.scrollToOffset({animated:true, offset:sliderWidth*newI})

                return newI
                
            })

        }, 5000)

        return () => clearInterval(CarouselInterval)

    }, [activeCarousel])

    const OnScroll = (event : any) => {

        SetactiveCarousel(Math.round(parseFloat(event?.nativeEvent?.contentOffset?.x/sliderWidth)))

    }

    return (
        <View style={{}} >
            <FlatList 
                ref={ScrollRef}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={HomeCarouselData}
                pagingEnabled
                onScroll={OnScroll}
                renderItem={({item}) => 
                    <View 
                        style={{ width:sliderWidth, alignItems:'center', justifyContent:'center'}}
                    >
                        <Image
                            style={{
                                height:sliderWidth*.8, 
                                width:sliderWidth
                            }}
                            source={item?.image}
                            resizeMode='cover'
                        />
                        
                    </View>
                }    
                keyExtractor={(item, index) => index.toString()}            
            />
            <View style={{marginTop:-30, height:30, alignItems:'center', justifyContent:'center', flexDirection:'row'}} >
                {HomeCarouselData?.map((ele, index) => 
                    <View 
                        style={{height:6, width:activeCarousel == index ? 18 : 6, borderRadius:3, backgroundColor:colors.white, marginHorizontal:2}}
                    />
                )}
            </View>
        </View>
    );
}

const GetStyles = (colors:any) => StyleSheet.create({

    header:{
        height:60,
        width:Dimensions.get("window").width,
        alignItems:'center', 
        justifyContent:'space-between',
        flexDirection:'row',
        paddingHorizontal:15
    }
    
});

export default ProductCarousel;
