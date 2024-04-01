import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import SearchPage from "../pages/FitFlow/SearchPage";
import ExerciseInfo from "../pages/FitFlow/ExerciseInfo";
import Home from "../pages/FitFlow/Home";
import Landing from "../pages/FitFlow/Landing";
import Days from "../pages/FitFlow/Days";

const {Screen, Navigator} = createStackNavigator()

export default function FitFlowNavigator(){
    return <Navigator screenOptions={{
        cardStyle:{backgroundColor:'white'}
    }}>
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
                headerShown:!false,
                cardStyleInterpolator:CardStyleInterpolators.forFadeFromCenter
            }}
        />
        <Screen
            name="info" component={ExerciseInfo}
            options={{
            }}
        />
    </Navigator>
}