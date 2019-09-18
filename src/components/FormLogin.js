import React, {Component} from 'react';
import {
    StyleSheet, Text, View,ImageBackground,ScrollView,
    TextInput, AsyncStorage, ToastAndroid,Dimensions,KeyboardAvoidingView
} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import ip from '../ipconfig';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const BD_IMAGE = require('../img/bg_screen4.jpg');

class FormLogin extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            response:'',
            token:'',
            id:'',
            redirect:false
        }

        this._loginAsync = this._loginAsync.bind(this);
    }

    render(){
        return(
            <ScrollView contentContainerStyle={styles.container}>
                
                    <View>
                        <KeyboardAvoidingView contentContainerStyle={styles.loginContainer} behavior='position'>
                        <View style={styles.titleContainer}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.titleText}>NutriApp</Text>
                            </View>
                        </View>
                        <View style={styles.formContainer}>
                        <TextInput style={styles.inputBox} underlineColorAndroid='#1F746B'
                            placeholder='Email'
                            placeholderTextColor='#777777'
                            selectionColor="#4db6ac"
                            keyboardType="email-address"
                            onChangeText={(email)=>this.setState({email})}
                            onSubmitEditing={()=>this.password.focus()}/>

                        <TextInput style={styles.inputBox} underlineColorAndroid='#1F746B'
                            placeholder='Password'
                            secureTextEntry={true}
                            placeholderTextColor='#777777'
                            selectionColor="#4db6ac"
                            onChangeText={(password)=>this.setState({password})}
                            ref={(input) => this.password = input }/>

                        <Button
                            title="Entrar" 
                            buttonStyle={{
                                marginTop:20,
                                marginBottom:20,
                                backgroundColor: "#f9a825",
                                borderRadius:5
                            }}
                            onPress={this._loginAsync}/>
                            
                        </View>
                        </KeyboardAvoidingView>
                    </View>
                
            </ScrollView>
        )
       
    }

    _loginAsync = async()=>{
        const email = this.state.email;
        const password = this.state.password;
        if(email === "" || password === ""){
            /*Alert.alert(
                "Campos Vacios",
                "Favor de llenar todos los campos",
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')}, 
                ],
                {cancelable:false}
            )*/
            ToastAndroid.show('Campo(s) Vacio(s)', ToastAndroid.SHORT);
        }else{
            const bodySend = {email:email,password:password};
            //192.168.1.73
            await fetch(`http://${ip}/api/pacients/signin`,{
                method: 'POST',
                body:JSON.stringify(bodySend),
                headers:{
                    "Accept":'application/json',
                    "Content-Type":'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.token){
                    //Alert.alert("Bien",data.message,[{text: 'OK', onPress: () => console.log('OK Pressed')}],{cancelable:false})
                    this.setState({response:data.message,token:data.token,id:data.id,redirect:true})
                }else{
                    //Alert.alert("Error",data.message,[{text: 'OK', onPress: () => console.log('OK Pressed')}],{cancelable:false})
                    ToastAndroid.show(`Error ${data.message}`, ToastAndroid.SHORT);
                    this.setState({response:data.message,token:'',id:'',redirect:false})
                }
            })
            .catch(err => console.error(err))
            
            if(this.state.redirect === true){
                await AsyncStorage.setItem('userToken',this.state.token)
                await AsyncStorage.setItem('userID',this.state.id);
                this.props.navigation.navigate('App');
            }
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,justifyContent:'center',alignItems:'center'
    },
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBox:{
        width:'100%',
        backgroundColor:'rgba(255,255,255,0.5)',
        paddingHorizontal:5,
        color:'#000000',
        marginVertical:10,
        fontSize:16
    },
    button:{
        width:300,
        backgroundColor:'#087f23',
        borderRadius:25,
        marginVertical:10,
        paddingVertical:12
    },
    buttonText:{
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
    },
    bgImage:{
        flex:1,
        top:0,
        left:0,
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT,
        justifyContent:'center',
        alignItems:'center'
    },
    titleContainer:{
        height:100,
        backgroundColor:'transparent',
        justifyContent:'center'
    },
    formContainer:{
        backgroundColor:'white',
        width:SCREEN_WIDTH - 30,
        borderRadius:10,
        paddingTop:28,
        paddingBottom:28,
        paddingHorizontal:10
    },
    titleText:{
        color:'white',fontSize:30,fontFamily:'regular'
    },
});

export default FormLogin;