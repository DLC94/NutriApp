import React, { Component } from 'react';
import {Text,View,StyleSheet,ScrollView} from 'react-native';
import {Button, List, ListItem} from 'react-native-elements';

export default class FoodsScreen extends Component{
    constructor(props){
        super(props);

        this.state = {
            index:-1,
            aliments:[]
        }
    }

    componentDidMount(){
        const {params} = this.props.navigation.state;
        this.setState({index:params.index,aliments:params.alimentos});
    }

    listOfAliments(){
        return this.state.aliments.map((e,i)=>{
            return <ListItem key={i} 
                title={e.label} 
                onPress={()=>{
                    this.props.navigation.navigate('AlimentoScreen',{id:e.value})
                }}
                />
            //return <Text key={i}>{e.label}</Text>
        })
    }

    render(){
        return(
            <ScrollView style={{backgroundColor:'#f1f0f1'}}>
                <List>
                    {this.listOfAliments()}
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
        flexGrow:1
    }
})