import _ from 'lodash'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTheme } from '../themes'
import { View } from 'react-native'


export default function CircleIcons({ name }): React.JSX.Element {

    const {colors} = useTheme()

    return(
        <View 
            style={{
                height:50,
                width:50,
                borderRadius:25,
                backgroundColor:colors.base,
                justifyContent:'center',
                alignItems:'center',
                borderWidth:8,
                borderColor:colors.baseLight
            }} 
        >
            <Ionicons name={name} size={24} color={colors.white}  />
        </View>
    )

}