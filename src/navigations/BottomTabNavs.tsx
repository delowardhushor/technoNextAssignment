import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import BottomTab from '../components/BottomTab';
import Cart from '../screens/Cart';

const Tab = createBottomTabNavigator();

function BottomTabNavs() {
  return (
    <Tab.Navigator
        screenOptions={{
            headerShown:false
        }}

        tabBar={props => <BottomTab {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Shops" component={Home} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Account" component={Home} />
      <Tab.Screen name="Settings" component={Home} />
    </Tab.Navigator>
  );
}

export default BottomTabNavs
