import React,{Component} from 'react';
import {View,ToastAndroid,ScrollView,Text} from 'react-native';
import {SearchBar, Button, Card } from 'react-native-elements';

//app key bd51ee30c8f14a1cb9ce9fdbe5f8791b	
//app id bc078424
// https://api.edamam.com/search?q=chicken&app_id=bc078424&app_key=bd51ee30c8f14a1cb9ce9fdbe5f8791b
class RecipesScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            query:'',
            hits:[]
        }

        this.search = this.search.bind(this);
    }

    search(){
        //ToastAndroid.show(this.state.query,ToastAndroid.SHORT);
        fetch(`https://api.edamam.com/search?q=${this.state.query}&app_id=bc078424&app_key=bd51ee30c8f14a1cb9ce9fdbe5f8791b`)
        .then(res=>res.json())
        .then(data => {
            if(data.hits.length > 0){
                this.setState({hits:data.hits});
            }
        })
        .catch(err => console.error(err));
    }

    listOfCards(){
        return this.state.hits.map((e,i)=>{
            return (
                <Card key={i} image={{uri:e.recipe.image}} title={e.recipe.label}>
                    <Button
                        backgroundColor='#4db6ac'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='Ver mas'
                        onPress={()=>{this.props.navigation.navigate('RecipeModal',{hit:this.state.hits[i]})}}
                    />
                </Card>
            )
        })
    }

    render(){
        return(
            <View style={{ flex: 1, backgroundColor:'#f1f0f1'}}>
                <View>
                    <View>
                    <SearchBar
                        lightTheme
                        onChangeText={(e)=>{this.setState({query:e})}}
                        placeholder='Busca una receta' />
                    </View>
                    <View>
                        <Button
                            title="Buscar" 
                            buttonStyle={{
                                marginTop:5,
                                backgroundColor: "#f9a825",
                                borderRadius:5
                            }}
                            onPress={this.search}/>
                    </View>
                </View>
                <ScrollView>
                    {this.listOfCards()}
                </ScrollView>
            </View>
        )
    }
}

export default RecipesScreen;