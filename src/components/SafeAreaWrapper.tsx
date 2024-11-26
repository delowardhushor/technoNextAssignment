import React from 'react';
import {
    SafeAreaView,
    View
} from 'react-native';
import { useTheme } from '../themes';



function SafeAreaWrapper({children}): React.JSX.Element {

    const {colors} = useTheme()

    return (
        <View style={{backgroundColor:colors.background, flex:1}} >
            <SafeAreaView style={{flex:1}} >
                {children} 
            </SafeAreaView>
        </View>
    );
}


export default SafeAreaWrapper;
