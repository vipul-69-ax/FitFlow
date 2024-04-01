import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FitFlowNavigator from "./FitFlowNavigator";
import UserHome from "../pages/User/UserHome";
import UserNavigator from "./UserNavigator";
import {Ionicons, AntDesign} from '@expo/vector-icons'
const { Navigator, Screen } = createBottomTabNavigator();

export default function BottomAppNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor:"#EC5353"
      }}
    >
      <Screen name="fitflow" component={FitFlowNavigator} options={{
        tabBarIcon:({color, focused})=>{
            return <Ionicons
                color={color}
                size={24}
                name="home"
            />
        },
        title:"Home"
      }}/>
      <Screen name="user" component={UserNavigator} options={{
        tabBarIcon:({color, focused})=>{
            return <AntDesign
                color={color}
                size={24}
                name="user"
            />
        },
        title:"User"
      }}/>
    </Navigator>
  );
}
