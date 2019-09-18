import React, { Component } from 'react';
import {Text,View,StyleSheet,AsyncStorage,ToastAndroid,ScrollView} from 'react-native';
import {Button, Avatar, List, ListItem} from 'react-native-elements';
import ip from '../ipconfig';

export default class NutriologistScreen extends Component{
    constructor(props){
        super(props);

        this.state = {
            _id:'',
            name:'',
            lastName:'',
            email:'',
            cedProfessional:'',
            formation:'',
            grade:'',
        }
    }

    componentDidMount = async() => {
        const id = await AsyncStorage.getItem('userID');
        
        this.setNutriologisID(id)
    }

    setNutriologisID(id){
        fetch(`http://${ip}/api/pacients/${id}`)
        .then(res => res.json())
        .then(data => {
            //this.setState({_id:data.nutriologist})
            const id = data.nutriologist;
            this.getNutriologistInfo(id)
        })
        .catch(err => console.error(err));
    }

    getNutriologistInfo(id){
        fetch(`http://${ip}/api/nutriologist/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                _id:data._id,
                name:data.name,
                lastName:data.lastName,
                cedProfessional:data.cedProfessional,
                formation:data.formation,
                grade:data.grade,
                email:data.email
            })
        })
        .catch(err => console.error(err))
    }

    render(){
        return(
            <ScrollView style={{flex: 1, marginBottom: 20,backgroundColor:'#f1f0f1'}}>
                <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white', borderRadius: 5, alignItems: 'center', height: 150,borderColor:'black',borderWidth:0.5}}>
                    <View style={{flex: 3, flexDirection: 'row'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Avatar
                                width={140}
                                height={140}
                                source={{
                                    uri: 'https://firebasestorage.googleapis.com/v0/b/nutriapp-58aac.appspot.com/o/photo_profile%2Fnutriologo-2-2.jpg?alt=media&token=8b50849d-3318-47d4-9e14-bd2638e82f69',
                                }}
                                activeOpacity={0.7}
                                avatarStyle={{borderRadius: 140/2}}
                                overlayContainerStyle={{backgroundColor: 'transparent'}}
                                />
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{ flex: 1, marginTop: 10, justifyContent: 'center'}}>
                                <Text style={{ fontFamily: 'bold', fontSize: 25, color: 'rgba(98,93,144,1)', marginLeft: -15}}>
                                    {this.state.name} {this.state.lastName} 
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <List>
                    <ListItem title='Email'
                        subtitle={this.state.email}
                    />
                    <ListItem title='Cedula Profesional'
                        subtitle={this.state.cedProfessional}
                    />
                    <ListItem title='Formacion'
                        subtitle={this.state.formation}
                    />
                    <ListItem title='Grado'
                        subtitle={this.state.grade}
                    />
                </List>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Cerrar"
                    buttonStyle={{
                        marginTop:20,
                        marginBottom:20,
                        backgroundColor: "#f9a825",
                        borderRadius:5
                    }}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    imgContainer:{
        marginHorizontal:10,
        marginTop:10,
        flex:1,
        flexDirection:'column'
    }
})