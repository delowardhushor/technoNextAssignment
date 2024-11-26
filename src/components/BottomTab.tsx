import { View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '../themes';
import CustomText from './CustomText';
import IconButton from './IconButton';
import Feather from 'react-native-vector-icons/Feather'
import Spacing from './Spacing';
import Badge from './Badge';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function BottomTab({ state, descriptors, navigation }) {

    const {colors, activeTheme} = useTheme()

  const insets = useSafeAreaInsets()


  return (
    <View style={{ height:60 + insets.bottom, flexDirection:'row', justifyContent:'space-around', alignItems:'center', backgroundColor:colors.background, borderTopColor:colors.border, borderTopWidth:1, paddingBottom: insets.bottom }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconName = () => {
            if(route.name === 'Home'){
                return 'home'
            }
            if(route.name === 'Shops'){
                return 'archive'
            }
            if(route.name === 'Cart'){
                return 'shopping-cart'
            }
            if(route.name === 'Profile'){
                return 'user'
            }
            if(route.name === 'Settings'){
                return 'settings'
            }
            if(route.name === 'Account'){
                return 'user'
            }
            return 'home'  // default icon name when no icon is found
        }


        return (
            <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{ flex: 1, alignItems:'center', justifyContent:'center',  }}
            >
                <Feather 
                    name={iconName()} 
                    size={22} 
                    color={isFocused ? colors.base : colors.lightFont} 
                />
                <Spacing vertical={2} />
                <CustomText 
                    color={isFocused ? colors.base : colors.lightFont }
                    type={"bold"}
                    size={11}
                >
                    {label}
                </CustomText>
            </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default BottomTab