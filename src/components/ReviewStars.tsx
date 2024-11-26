import _ from 'lodash'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTheme } from '../themes'
import { View } from 'react-native'


export default function ReviewStars({ value }): React.JSX.Element {

    const {colors} = useTheme()

    return(
        <View style={{flexDirection:'row'}} >
            {_.times(5).map((ele, index) => 
                <Ionicons
                    name="star"
                    size={12}
                    color={index < value ? colors.base : colors.border}
                    style={{marginRight:2}}
                />
            )}
        </View>
    )

}