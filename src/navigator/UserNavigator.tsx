import { createStackNavigator } from "@react-navigation/stack";
import UserHome from "../pages/User/UserHome";

const {Screen, Navigator} = createStackNavigator()

export default function UserNavigator(){
    return <Navigator screenOptions={{
        cardStyle:{backgroundColor:'white'}
    }}>
        <Screen
            name="userHome" component={UserHome}
            options={{
                headerShown:false
            }}
        />
    </Navigator>
}