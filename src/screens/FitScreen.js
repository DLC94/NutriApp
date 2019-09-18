import React, {Component} from 'react';
import {Text, View,ToastAndroid} from 'react-native';
import { Button } from 'react-native-elements';
import ip from '../ipconfig';
//import GoogleFit from 'react-native-google-fit';

export default class FitScreen extends Component{

    render(){
        return(<View><Text>Hola</Text></View>)
    }
/*
    constructor(props){
        super(props);

        this.state = {
            weight:0,
            response:'hola',
            auth:false,
            steps:[]
        }

        this.authGFit = this.authGFit.bind(this);
        this.logout = this.logout.bind(this);
        this.getSteps = this.getSteps.bind(this);
    }

    getSteps(){
        const options = {
            startDate: "2017-01-01T00:00:17.971Z", // required ISO8601Timestamp
            endDate: new Date().toISOString() // required ISO8601Timestamp
        };
          
        GoogleFit.getDailyStepCountSamples(options, (err, res) => {
            if (err) {
                throw err;
            }
            
            console.log("Daily steps >>>", res);
            this.setState({steps:res})
        });
    }

    showSteps(){
        return this.state.steps.map( (e) => {
            return e.steps.map((e,i) => {
                return <Text>{e}</Text>
            })
        });
    }

    getWeight(){
        const opt = {
            unit:"pound",
            startDate:"2018-01-01T00:00:17.971Z",
            endDate: new Date().toISOString(),
            ascending: false
        }

        GoogleFit.getWeightSamples(opt, (err,res)=>{
            if(err){
                ToastAndroid.show(err,ToastAndroid.SHORT);
            }else{
                //ToastAndroid.show(res,ToastAndroid.SHORT);
                //this.setState({response:res});
                ToastAndroid.show('Todo bien',ToastAndroid.SHORT);
            }
            
        })
    }

    saveWeight(){
        const opt = {
            value:200,
            date: new Date().toISOString(),
            unit:"pound"
        }

        GoogleFit.saveWeight(opt, (err,res) => {
            if(err) ToastAndroid.show("Cant save data to google Fit",ToastAndroid.SHORT);
            else ToastAndroid.show("Save complete",ToastAndroid.SHORT);
            
        })
    }

    componentWillUnmount(){
        GoogleFit.unsubscribeListeners();
    }

    logout(){
        GoogleFit.disconnect((err)=>{
            if(err){ ToastAndroid.show("Error al salir de cuenta",ToastAndroid.SHORT); }
            else{
                ToastAndroid.show('Salida exitosa',ToastAndroid.SHORT);
                this.setState({auth:false})
            }
        });
    }

    authGFit(){
        //ToastAndroid.show('Te vas a loguear',ToastAndroid.SHORT);
        GoogleFit.onAuthorize(()=>{
            ToastAndroid.show('Todo Bien Nos conectamos',ToastAndroid.SHORT);
            this.setState({auth:true});
        });
        
        GoogleFit.onAuthorizeFailure((error)=>{
            ToastAndroid.show(`Paso algo ${error}`,ToastAndroid.SHORT);
            this.setState({auth:false});
        })

        GoogleFit.authorize(()=>{
            ToastAndroid.show('Te vas a loguear',ToastAndroid.SHORT);
            this.setState({auth:true})
        });
    }

    render(){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Fit!</Text>
                <Text>{this.state.response}</Text>
                {this.state.auth===false?
                    (<Button
                        title="Conectar" 
                        buttonStyle={{
                            marginTop:20,
                            marginBottom:20,
                            backgroundColor: "#f9a825",
                            borderRadius:5
                        }}
                        onPress={this.authGFit}/>):
                    (
                    <View>
                    <View>
                        <Button
                            title="Get Steps" 
                            buttonStyle={{
                                marginTop:20,
                                marginBottom:20,
                                backgroundColor: "#f9a825",
                                borderRadius:5
                            }}
                            onPress={this.getSteps}/>
                        {this.getSteps()}
                    </View>
                    <Button
                        title="Peso" 
                        buttonStyle={{
                            marginTop:20,
                            marginBottom:20,
                            backgroundColor: "#f9a825",
                            borderRadius:5
                        }}
                        onPress={this.saveWeight}/>
                    <Button
                        title="Cerrar Sesion" 
                        buttonStyle={{
                            marginTop:20,
                            marginBottom:20,
                            backgroundColor: "#f9a825",
                            borderRadius:5
                        }}
                        onPress={this.logout}/></View>)}
                
                
            </View>
        )
    }
    */
}