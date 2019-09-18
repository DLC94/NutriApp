import React, { Component } from 'react';
import {Text,View,StyleSheet,ToastAndroid,ScrollView} from 'react-native';
import {Button,Card} from 'react-native-elements';
import ip from '../ipconfig';

export default class AlimentoScreen extends Component{
    constructor(props){
        super(props);

        this.state = {
            _id:'',
            porcion:0,
            kcal:0,
            alimento:'',
            group:'',
            equivalente:'',
            image:'https://firebasestorage.googleapis.com/v0/b/nutriapp-58aac.appspot.com/o/20170127020138_cargando.png?alt=media&token=a451b261-16fa-46f3-a942-e833ffae59f5'
        }
    }

    componentDidMount(){
        const {params} = this.props.navigation.state;
        const id = params.id;
        //this.setState({_id:params.id});
        //ToastAndroid.show(params.id,ToastAndroid.SHORT);
        this.getAlimentoInfo(id)
    }

    getAlimentoInfo(id){
        
        fetch(`http://${ip}/api/food/${id}`)
        .then(res => res.json())
        .then(data => {
            
            this.setState({
                porcion:data.porcion,
                kcal:data.kcal,
                alimento:data.alimento,
                group:data.group,
                equivalente:data.equivalente,
                image:data.image
            })
        })
        .catch(err=>console.error(err));
    }

    render(){
        return(
            <ScrollView style={styles.container}>
                <Card
                title={`${this.state.alimento} (${this.state.porcion})`}
                image={{uri:this.state.image}} imageStyle={{height:400,width:'100%'}} titleStyle={{fontSize:25}}>
                <Text style={{marginBottom: 10,fontSize:20}}>
                    Es equivalente a {this.state.equivalente} y pertenece al grupo de {this.state.group}. Aporta {this.state.kcal} Kcal.
                </Text>
                </Card>
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
        flexGrow:1,backgroundColor:'#f1f0f1'
    }
})