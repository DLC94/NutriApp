import React, { Component } from 'react';
import {Text,View,StyleSheet,AsyncStorage,ScrollView} from 'react-native';
import {Button,Card} from 'react-native-elements';
import ip from '../ipconfig';

export default class GoalsScreen extends Component{
    constructor(props){
        super(props);

        this.state = {
            goals:[],
            _id:''
        }
    }

    componentDidMount = async() =>{
        const id = await AsyncStorage.getItem('userID');
        this.getPacient(id)
    }

    getPacient(id){
        fetch(`http://${ip}/api/pacients/${id}`)
        .then(res => res.json())
        .then(data => {
            if(data.plan){
                this.setState({_id:data.plan})
                this.getPlan()
            }
        })
    }

    getPlan(){
        fetch(`http://${ip}/api/plan/${this.state._id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                goals:data.goals
            })
            
        })
    }

    /*
    [
        [bajarpeso,verme mejor,[como mucho, no hago ejercicio],[no comer tanto, hacer ejercicio]],
        [objetivo2,benf2,[ob21,ob22,ob23],[sol21,sol22,sol23]],
        [objetivo3,benf3,[ob31,ob32],[sol31,sol32,sol33]]
    ]
    */

    listOfObj(){
        /*return this.state.goals.map((e,i)=>{
            return e.objetivos.map((e,i)=>{
                return <Text key={i}>{e}</Text>
            })
        })*/
        return this.state.goals.map((e,i)=>{
            return e.objetivos.map((e,i)=>{
                return <Card key={i} title={`${e}`}>
                            {this.listOfBen(i)}
                            {this.listOfObs(i)}
                        </Card>
            })
        })
    }

    listOfBen(index){
        return this.state.goals.map((e)=>{
            return e.beneficios.map((e,i)=>{
                if(i === index){
                    return <Text key={i}>Quiero lograr el objetivo para: {e}</Text>
                }
            })
        })
    }

    listOfObs(index){
        return this.state.goals.map((e)=>{
            return e.obstaculos.map((e,i)=>{
                if(i === index){
                    return e.map((e,i)=>{
                        return <Text key={i}>Obstaculo: {e} - Solucion: {this.listOfSol(index,i)}</Text>
                    })
                }
            })
        })
    }

    listOfSol(index,index2){
        return this.state.goals.map((e)=>{
            return e.solucion.map((e,i)=>{
                if(i === index){
                    return e.map((e,i)=>{
                        if(i === index2){
                            return <Text key={i}>{e}</Text>
                        }
                    })
                }
            })
        })
    }

    render(){
        return(
            <ScrollView>
                {this.listOfObj()}
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
        flexGrow:1,
        justifyContent:'center',
        alignItems:'center'
    }
})