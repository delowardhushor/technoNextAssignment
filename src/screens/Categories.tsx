import React from 'react';
import type {PropsWithChildren} from 'react';
import {
    Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { useAppDispatch } from '../redux/storeHooks';
import { useTheme } from '../themes';
import { UpdateTheme } from '../redux/settingSlice';
import CustomText from '../components/CustomText';


function Categories(): React.JSX.Element {

    const dispatch = useAppDispatch()
    const {colors, activeTheme} = useTheme()    

    return (
        <View style={{backgroundColor:colors.background, flex:1}} >
            <CustomText>Home Screen</CustomText>
            <Pressable
                onPress={() => dispatch(UpdateTheme("Dark"))}
            >
                <CustomText>Change theme to {activeTheme}</CustomText>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    
});

export default Categories;
