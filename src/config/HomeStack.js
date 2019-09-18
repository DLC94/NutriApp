import {createStackNavigator} from 'react-navigation'
import NutriologistScreen from '../screens/NutriologistScreen';
import GoalsScreen from '../screens/GoalsScreen';
import RecipeModal from '../screens/RecipeModal';
import FoodsScreen from '../screens/FoodsScreen';
import AlimentoScreen from '../screens/AlimentoScreen';
import AppStack from '../config/AppStack';

let scenes = {
    AppStack:{screen:AppStack},
    NutriologistScreen:{screen:NutriologistScreen},
    GoalsScreen:{screen:GoalsScreen},
    RecipeModal:{screen:RecipeModal},
    FoodsScreen:{screen:FoodsScreen},
    AlimentoScreen:{screen:AlimentoScreen}
}

const HomeStack = createStackNavigator(scenes,{headerMode:'none',initialRouteName:'AppStack'});

export default HomeStack;