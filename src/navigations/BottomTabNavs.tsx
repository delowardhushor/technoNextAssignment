import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import BottomTab from '../components/BottomTab';
import Cart from '../screens/Cart';
import History from '../screens/History';

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
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
}

export default BottomTabNavs
