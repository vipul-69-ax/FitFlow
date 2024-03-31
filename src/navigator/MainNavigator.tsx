import { createStackNavigator } from "@react-navigation/stack";
import SearchPage from "../pages/SearchPage";
import ExerciseInfo from "../pages/ExerciseInfo";
import Home from "../pages/Home";
import Landing from "../pages/Landing";
import Days from "../pages/Days";

const {Screen, Navigator} = createStackNavigator()

export default function MainNavigator(){
    return <Navigator screenOptions={{
        cardStyle:{backgroundColor:'white'}
    }}>
        <Screen
            name="landing" component={Landing}
            options={{
                headerShown:false
            }}
        />
        <Screen
            name="home" component={Home}
            options={{
                headerShown:false
            }}
        />
        <Screen
            name="days" component={Days}
            options={{
                title:"Workout Day"
            }}
        />
        <Screen
            name="search" component={SearchPage}
            options={{
                headerShown:!false
            }}
        />
        <Screen
            name="info" component={ExerciseInfo}
            options={{
            }}
        />
    </Navigator>
}