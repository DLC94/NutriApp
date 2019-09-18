import React, {Component} from 'react';
import {View,Text,StyleSheet,AsyncStorage,ToastAndroid,ScrollView} from 'react-native';
import {Agenda,Calendar} from 'react-native-calendars';
import ip from '../ipconfig';
import moment from 'moment'
import {ListItem} from 'react-native-elements';
import {AirbnbRating,Rating} from 'react-native-ratings'

const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

class Arrow extends Component{
    render(){
        if(this.props.direction === 'left')
            return <Text>{`<`}</Text>
        else 
            return <Text>{`>`}</Text>
    }
}

class CalendarScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            finalDate:'',
            startDate:'',
            foods:[],
            today:'',
            _id:'',
            items:{},
            day:'',
            aliments:[],
            ratings:[1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1],
            value:1
        }
    }

    componentDidMount = async() => {
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
            
            const fDate = moment(data.finalDate);
            const finalDate = `${fDate.format('YYYY')}-${fDate.format('MM')}-${fDate.format('DD')}`;
            const sDate = moment(data.startDate);
            const startDate = `${sDate.format('YYYY')}-${sDate.format('MM')}-${sDate.format('DD')}`;
            const hoy = moment();
            const today = `${hoy.format('YYYY')}-${hoy.format('MM')}-${hoy.format('DD')}`;
            /*const listComidas = data.foods.map((e,i)=>{
                return {text:`${e.comida} - ${e.hora}`}
            })
            var jsonData = {};
            const diff = fDate.diff(sDate,'days');
            for(let i = 0; i <= diff;i++){
                let fechaInicio = moment(data.startDate).add(i,'days');
                let name = `${fechaInicio.format('YYYY')}-${fechaInicio.format('MM')}-${fechaInicio.format('DD')}`;;
                jsonData[name] = listComidas
            }*/
            this.setState({
                finalDate:finalDate,
                startDate:startDate,
                foods:data.foods,
                today:today,
                aliments:data.aliments,
                day:{day:Number(hoy.format('DD')),month:Number(hoy.format('MM')),year:Number(hoy.format('YYYY'))}
                //items:jsonData
            })
            
        })
    }

    lisfOfFood(){
        return this.state.foods.map((e,i)=>{
            return <ListItem key={i} 
                title={e.comida}
                subtitle={e.hora}
                onPress={()=>{
                    this.props.navigation.navigate('FoodsScreen',{index:i,alimentos:this.state.aliments[i]})
                }}
            />
        })
    }

    ratingCompleted(rating) {
        ToastAndroid.show(`Rating Complete ${rating}`,ToastAndroid.SHORT);
    }

    daySelect(day){
        const fDate = moment(`${day.year}-${day.month < 10?('0'+day.month):day.month}-${day.day< 10?('0'+day.day):day.day}`);
        const sDate = moment(this.state.startDate);
        const diff = fDate.diff(sDate,'days');
        const value = this.state.ratings[diff]
        this.setState({day:day,value:value});
    }
   
    render(){
        /*return(
            <View style={{ flex: 1}}>
                <Agenda 
                    items={this.state.items}
                    selected={this.state.today}
                    minDate={this.state.startDate}
                    maxDate={this.state.finalDate}
                    renderItem={this.renderItem}
                    renderEmptyDate={this.renderEmptyDate}
                    rowHasChanged={this.rowHasChanged}
                    onDayPress={(day)=>{console.log('day pressed')}}
                    onDayChange={(day)=>{console.log('day changed')}}
                    renderEmptyData = {() => {return (<View />);}}  
                    theme={{
                        agendaDayTextColor: '#FF9800',
                        agendaDayNumColor: '#FF9800',
                        agendaTodayColor: '#cf8921',
                        agendaKnobColor: '#4db6ac',
                        selectedDayBackgroundColor: '#4db6ac'
                      }}
                />
            </View>
        )*/
        return(
            <ScrollView style={{flex:1,backgroundColor:'#f1f0f1'}}>
                <Calendar
                    current={this.state.today}
                    minDate={this.state.startDate}
                    maxDate={this.state.finalDate}
                    monthFormat={'yyyy MMM'}
                    onDayPress={(day) => {this.daySelect(day)}}
                    onMonthChange={(month) => {console.log('month changed', month)}}
                    renderArrow={(direction) => (<Arrow direction={direction} />)}
                    hideExtraDays={true}
                    firstDay={1}
                    onPressArrowLeft={substractMonth => substractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                    style={{
                        borderWidth: 1,
                        borderColor: 'gray',
                        height: 370
                      }}
                />
                {/*<Text>Comidas para el {this.state.day.day} de {meses[this.state.day.month-1]} de {this.state.day.year}</Text>*/}
                {/*<View style={{backgroundColor:'white',marginTop:5,height:120,padding:10}}>
                    <Text>Califica tu dia {this.state.day.day} de {meses[this.state.day.month-1]} de {this.state.day.year} {this.state.value}</Text>
                    <AirbnbRating
                        count={5}
                        reviews={["Muy Mal", "Mal", "Bien", "Muy Bien", "Grandioso"]}
                        defaultRating={this.state.value}
                        size={20}
                        onFinishRating={this.ratingCompleted}
                    />
                    
                </View>*/}
                <View style={{backgroundColor:'white'}}>
                    {this.lisfOfFood()}
                </View>
            </ScrollView>
        )
       
    }

    renderItem = (item) => {
        return (
            <View style={[styles.item]}>
              <View>
                <View>
                  <Text>{item.text} </Text>
                  
                  </View>
              </View>
            </View>
        );
    }

    renderEmptyDate = () =>{
        return (
            <View style={styles.item}>
                <View><Text>No hay comidas</Text></View>
            </View>
        );
    }

    rowHasChanged = (r1,r2) =>{
        return (r1.day !== r2.day || r1.location !== r2.location || r1.name !== r2.name || r1.user !== r2.user);
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        marginTop: 45,
        marginRight: 10,
        borderTopWidth: 2,
        borderTopColor: '#dddddd',
        height: 5,
    }
})

export default CalendarScreen;