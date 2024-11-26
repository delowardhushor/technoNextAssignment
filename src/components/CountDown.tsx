import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
    Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Dimensions,
  View,
} from 'react-native';
import { useAppDispatch } from '../redux/storeHooks';
import { useTheme } from '../themes';
import { UpdateTheme } from '../redux/settingSlice';

import Feather from 'react-native-vector-icons/Feather'
import CustomText from './CustomText';
import Spacing from './Spacing';
import Chip from './Chip';
import moment from 'moment';
import { ConvertSectoDay } from '../uti/uti';


function CountDown({value}): React.JSX.Element {

    const dispatch = useAppDispatch()
    const {colors, activeTheme} = useTheme()
    const styles = useMemo(() => GetStyles(colors), [activeTheme])

    const CountDown = moment().add(1, 'weeks')

    const [countTimeSecs, SetCountTimeSecs] = useState(moment(value || CountDown).diff(moment(), 'seconds'))

    useEffect(() => {

        const int  = setInterval(() => {
    
          if(countTimeSecs){
            SetCountTimeSecs(i => i - 1)
          }
    
    
        }, 1000)
    
        return () => clearInterval(int)
    
    
    }, [countTimeSecs])

    // console.log("countTimeSecs", moment(CountDown).diff(moment(), 'seconds'), countTimeSecs)
      
    const SecToDay = ConvertSectoDay(countTimeSecs)

    return (
        <View style={{flexDirection:'row'}} >
            <View style={{alignItems:'center'}} >
                <CustomText size={8} type="bold"  >DAYS</CustomText>
                <Spacing vertical={2} />
                <Chip label={SecToDay.day} active />
            </View>
            <Spacing horizontal={5} />
            <View style={{alignItems:'center'}} >
                <CustomText size={8} type="bold"  >HOURS</CustomText>
                <Spacing vertical={2} />
                <Chip label={SecToDay.hour} active />
            </View>
            <Spacing horizontal={5} />
            <View style={{alignItems:'center'}} >
                <CustomText size={8} type="bold"  >MINS</CustomText>
                <Spacing vertical={2} />
                <Chip label={SecToDay.minutes} active />
            </View>
            <Spacing horizontal={5} />
            <View style={{alignItems:'center'}} >
                <CustomText size={8} type="bold"  >SECS</CustomText>
                <Spacing vertical={2} />
                <Chip label={SecToDay.seconds} active />
            </View>
        </View>
               
    );
}

const GetStyles = (colors:any) => StyleSheet.create({
    
    
});

export default CountDown;
