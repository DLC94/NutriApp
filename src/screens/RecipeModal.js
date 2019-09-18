import React, { Component } from 'react';
import {View,StyleSheet,ToastAndroid,ImageBackground,ScrollView,Linking} from 'react-native';
import {Button,Text, List,ListItem,Divider,Badge} from 'react-native-elements';

export default class RecipeModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            image:'https://firebasestorage.googleapis.com/v0/b/nutriapp-58aac.appspot.com/o/20170127020138_cargando.png?alt=media&token=a451b261-16fa-46f3-a942-e833ffae59f5',
            ingredients:[],
            porcion:0,
            calories:0,
            url:''
        }
    }

    componentDidMount(){
        const {params} = this.props.navigation.state;
        //ToastAndroid.show(params.label + 'hola',ToastAndroid.SHORT);
        const recipe = params.hit.recipe;
        this.setState({
            name:recipe.label,
            image:recipe.image,
            ingredients:recipe.ingredientLines,
            calories:recipe.calories,
            porcion:recipe.yield,
            url:recipe.url
        })
    }

    ingredientsList(){
        return this.state.ingredients.map((e,i)=>{
            return (
                <ListItem key={i} 
                    title={e}
                    hideChevron
                    />)
        })
    }

    render(){
        return(
            <ScrollView style={styles.container}>
                <View style={{marginHorizontal:10,marginTop:10}}>
                <ImageBackground source={{uri:`${this.state.image}`}}
                    style={{width:'100%',height:250}}>
                    <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,.6)',height:250,paddingHorizontal:10}}>
                        <Text h3 style={{color:'white'}}>{this.state.name}</Text>
                    </View>
                </ImageBackground>
                </View>
                <View style={{marginHorizontal:10}}>
                    <Text h4>Ingredientes</Text>
                    <Divider style={{ backgroundColor: 'black' }} />
                    {this.ingredientsList()}
                </View>
                <View style={{marginHorizontal:10}}>
                    <Button onPress={()=>{Linking.openURL(this.state.url)}}
                        title="Ver pasos"
                        buttonStyle={{
                            marginTop:20,
                            marginBottom:20,
                            backgroundColor: "#4db6ac",
                            borderRadius:5
                        }}
                    />
                </View>
                <View style={{marginHorizontal:10}}>
                    <Text h4>Nutricion</Text>
                    <Divider style={{ backgroundColor: 'black' }} />
                    <ListItem title="Calorias/Porcion" subtitle={Math.round(this.state.calories/this.state.porcion)} hideChevron />
                    <ListItem title="Porciones" subtitle={this.state.porcion} hideChevron />
                </View>
                
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
        
    }
})