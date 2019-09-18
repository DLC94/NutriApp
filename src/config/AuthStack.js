import {createStackNavigator} from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';

let scenes = {
    Login:{screen:LoginScreen,navigationOptions:{
        header:null
    }}
}

const AuthStack = createStackNavigator(scenes);

export default AuthStack;