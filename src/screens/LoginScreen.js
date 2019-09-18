import React, {Component} from 'react';
import {StyleSheet,View} from 'react-native';

import Form from '../components/FormLogin';

export default class LoginScreen extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Form {...this.props}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
      backgroundColor:'#4db6ac',
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    signupTextCont:{
        flexGrow:1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    signupText:{
        color:'rgba(255,255,255,0.6)',
        fontSize:18
    },
    signupButton:{
        color:'#ffffff',
        fontSize:18,
        fontWeight:'100'
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
  }
  });