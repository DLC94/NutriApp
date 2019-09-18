import React, {Component} from 'react';
import {StyleSheet, Text, View,AsyncStorage, ScrollView, ImageBackground,ToastAndroid} from 'react-native';
import { Button, Avatar, ListItem,List, Icon } from 'react-native-elements';
import Notification from 'react-native-android-local-notification';
import moment from 'moment'
import ip from '../ipconfig';

const meses = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"]

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      id:'',
      name:'',
      lastName:'',
      height:0,
      weight:0,
      email:'',
      birth:'',
      gender:'',
      appointmentDate:'',
      appointmentTime:'',
      plan:'',
      plan_finalD:'',
      plan_startD:'',
      plan_foods:[],
      plan_goals:[]
    }
    this._logoutAsync = this._logoutAsync.bind(this);
    this.getInfoPacient = this.getInfoPacient.bind(this);
    this.notificacionComidas = this.notificacionComidas.bind(this);
    this.notificacionCitas = this.notificacionCitas.bind(this);
    this.getPlan = this.getPlan.bind(this);
    this.date_diff = this.date_diff.bind(this);
    this.configurarNotificaciones = this.configurarNotificaciones.bind(this);
  }

  date_diff(date1,date2){
    var dt1 = date1
    var dt2 = date2;
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
  }

  notificacionComidas(){
    const comidas = this.state.plan_foods;
    const f1 = this.state.plan_startD.split("-");
    const f2 = this.state.plan_finalD.split("-");
    const metas = this.state.plan_goals[0];

    const d1 = Number(f1[2]);
    const m1 = Number(f1[1])-1;
    const y1 = Number(f1[0]);
    
    const d2 = Number(f2[2]);
    const m2 = Number(f2[1])-1;
    const y2 = Number(f2[0]);

    const fecha1 = new Date(y1,m1,d1);
    const fecha2 = new Date(y2,m2,d2);
    //const fecha2 = new Date(y2,m2,10);
    const hoy = new Date();

    if(hoy <= fecha2){
      var fechaInicial;
      if(fecha1 <= hoy){
        fechaInicial = hoy;
      }else{
        fechaInicial = fecha1;
      }

      const day = fechaInicial.getDate();
      const month = fechaInicial.getMonth();
      const year = fechaInicial.getFullYear();

      const diferencia = this.date_diff(fechaInicial,fecha2)+1;

      var hora,hour,min,fechaTrigger,fecha, horas = [];
      
      //Notificaciones de comidas
      comidas.forEach(e => {
        horas.push(e.hora);
        hora = e.hora.split(":");
        hour = Number(hora[0]);
        min = Number(hora[1]);
        fecha = new Date(year,month,day,hour,min);
        fechaTrigger = new Date(fecha - 30 * 60000);
        
        Notification.create({
          subject: e.comida,
          message: 'Ya casi es tu proxima comida, da clic para ver que puedes comer',
          sendAt: fechaTrigger,
          repeatEvery: 'day',
          repeatCount: diferencia
        })
      })

      

      //Notificaciones de obstaculos
      const obstaculos = metas.obstaculos[0];
      const length = obstaculos.length;
      var index,h1,h2,hour1,hour2,horaDiff, fechaObj;

      for(let k = 0; k < horas.length-1 ; k++){
        index = Math.floor((Math.random() * length));

        h1 = horas[k].split(":");
        h2 = horas[k+1].split(":");
        hour1 = Number(h1[0]);
        hour2 = Number(h2[0]);
        horaDiff = Math.floor((hour2 - hour1)/2);

        fechaObj = new Date(year,month,day,(hour1 + horaDiff),0);
        Notification.create({
          subject:`Hola!. Durante el dia encontraras obstaculos como ${obstaculos[index]}.`,
          message:"Da clic para saber como solucionarlos.",
          sendAt: fechaObj,
          repeatEvery:'day',
          repeatCount:diferencia
        })
      }



      ToastAndroid.show('Recordatorios Comidas Activados',ToastAndroid.LONG);
    }
  }

  notificacionCitas(){
    //const fecha = moment(this.state.appointmentDate,'YYYY-MM-DD');
    const fecha = this.state.appointmentDate.split("-");
    const hora = this.state.appointmentTime.split(":")

    const day = Number(fecha[2]);
    const month = Number(fecha[1])-1;
    const year = Number(fecha[0]);
    const hour = Number(hora[0])-1;
    const min = Number(hora[1]);

    
    const diaCita = new Date(year,month,day);
    const hoy = new Date();
    const diferencia = this.date_diff(hoy,diaCita);
    const fechaTrigger = new Date(year,month,day,hour,min);
    Notification.create({
      subject:'Proxima Cita',
      message:`${meses[month]} ${day} de ${year}`,
      sendAt: fechaTrigger,
      repeatEvery:'day',
      repeatCount: diferencia
    })
    ToastAndroid.show(`Recordatorio activado`,ToastAndroid.LONG);
  }

  _logoutAsync = async() =>{
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  componentDidMount = async() =>{
    const id = await AsyncStorage.getItem('userID');
    this.setState({id:id})
    this.getInfoPacient();
  }

  configurarNotificaciones = async() =>{
    await Notification.deleteAll();
    if(this.state.appointmentDate){
      notificacionCitas();
    }
    if(this.state.plan){
      if(new Date() )
      notificacionComidas();
    }
  }

  getInfoPacient(){
    fetch(`http://${ip}/api/pacients/${this.state.id}`)
    //fetch(`https://stark-wildwood-38867.herokuapp.com/api/pacients/${this.state.id}`)
      .then(res=>res.json())
      .then(data => {
        this.setState({
          name:data.name,
          lastName:data.lastName,
          height:data.height,
          weight:data.weight,
          email:data.email,
          gender:data.gender
        });
        const fecha = new Date(data.birth);
        const day = fecha.getDate();
        const month = fecha.getMonth();
        const year = fecha.getFullYear();
        const date = day+'/'+(month+1)+'/'+year;
        this.setState({birth:date});
        if (typeof data.appointmentDate !== "undefined") {
          console.log(data.appointmentDate)
          this.setState({appointmentDate:data.appointmentDate})
        }
        if (typeof data.appointmentTime !== "undefined") {
            console.log(data.appointmentTime)
            this.setState({appointmentTime:data.appointmentTime})
        }
        if(typeof data.plan !== "undefined"){
          console.log(data.plan)
          //this.setState({plan:data.plan});
          this.getPlan(data.plan);
        }
      })
      .catch(err => console.log(err));
  }

  getPlan(id){
    fetch(`http://${ip}/api/plan/${id}`)
    .then(res => res.json())
    .then(data => {
      const fDate = moment(data.finalDate);
      const finalDate = `${fDate.format('YYYY')}-${fDate.format('MM')}-${fDate.format('DD')}`;
      const sDate = moment(data.startDate);
      const startDate = `${sDate.format('YYYY')}-${sDate.format('MM')}-${sDate.format('DD')}`;      

      this.setState({
        plan:id,
        plan_finalD:finalDate,
        plan_startD:startDate,
        plan_foods:data.foods,
        plan_goals:data.goals
      })
      //this.configurarNotificaciones;
    })
  }

  render() {
    let img = 'https://firebasestorage.googleapis.com/v0/b/nutriapp-58aac.appspot.com/o/photo_profile%2Fprofile-picture.png?alt=media&token=3a578951-8e59-4898-a7e6-46d905235241';
    if(this.state.gender === 'M'){
      img = 'https://firebasestorage.googleapis.com/v0/b/nutriapp-58aac.appspot.com/o/user.png?alt=media&token=0ce64d11-ea63-4e44-9246-baca05511fd6'
    }else if(this.state.gender === 'F'){
      img = 'https://firebasestorage.googleapis.com/v0/b/nutriapp-58aac.appspot.com/o/user%20(1).png?alt=media&token=fcc71484-2bfc-4c74-87c7-f8f5516b63e4'
    }
    return(
      <ScrollView style={{flex:1,marginBottom:20,backgroundColor:'#f1f0f1'}}>
        <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',borderRadius:10,alignItems:'center',height:250,marginBottom:10,borderColor:'black',borderWidth:0.5}}>
          <ImageBackground source={{uri:'https://images.unsplash.com/photo-1487956382158-bb926046304a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6dfe76002068c25cbf26ae013e6c332a&auto=format&fit=crop&w=751&q=80'}}
            style={{width:'100%',height:150}}>
              <View style={{flex:1,flexDirection:'column'}}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:100}}>
                  <Avatar width={145} height={145} 
                    source={
                      {uri:'https://firebasestorage.googleapis.com/v0/b/nutriapp-58aac.appspot.com/o/photo_profile%2Fprofile-picture.png?alt=media&token=3a578951-8e59-4898-a7e6-46d905235241'}}
                  activeOpacity={0.7} 
                  avatarStyle={{borderRadius:145/2,borderWidth:2,borderColor:'white'}} 
                  overlayContainerStyle={{backgroundColor:'transparent'}} 
                  />
                </View>
                <View style={{flex:1,alignItems:'center'}}>
                  <View style={{ flex: 1, justifyContent: 'center',marginTop:80}}>
                    <Text style={{ fontFamily: 'bold', fontSize: 25, color: 'rgba(98,93,144,1)'}}>
                      {this.state.name} {this.state.lastName} 
                    </Text>
                  </View>
                </View>
              </View>
          </ImageBackground>
          
        </View>
        <List>
          <ListItem
              title='Email'
              subtitle={this.state.email}
              hideChevron
          />  
          <ListItem
              title='Peso'
              subtitle={`${this.state.weight} kg`}
              hideChevron
          />  
          <ListItem
              title='Altura'
              subtitle={`${this.state.height} cm`}
              hideChevron
          />    
          <ListItem
              title='Fecha Nacimiento'
              subtitle={this.state.birth}
              hideChevron
          />    
          <ListItem
              title='Genero'
              subtitle={this.state.gender}
              hideChevron
          />
          {this.state.appointmentDate?
          <ListItem 
            title="Proxima Cita"
            subtitle={`${this.state.appointmentDate} - ${this.state.appointmentTime}`}
            hideChevron
          />:null
          }
          <ListItem 
            title="Metas y Motivaciones"
            onPress={()=>{this.props.navigation.navigate('GoalsScreen')}}
          />
          <ListItem 
            title="Mi nutriologo"
            onPress={()=>{this.props.navigation.navigate('NutriologistScreen')}}
          />
        </List>
        <List>
          {this.state.plan?
          <ListItem 
            title="Recordatorios de comidas"
            subtitle="Presiona para activar"
            hideChevron
            onPress={this.notificacionComidas}
          />:null
          }
          {this.state.appointmentDate?
          <ListItem 
            title="Recordatorios de proxima cita"
            subtitle="Presiona para activar"
            hideChevron
            onPress={this.notificacionCitas}
          />:null
          }
        </List>
        <Button
          title="Cerrar Sesion" 
          buttonStyle={{
              marginTop:20,
              marginBottom:20,
              backgroundColor: "#f9a825",
              borderRadius:5
          }}
          onPress={this._logoutAsync}/>
        
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    profileBg:{
      position:'absolute',
      left:0,
      top:'56px',
      width:'100%',height:'150px',
      backgroundColor:'red'
    }
  });

  /*
Inst. ejecutivo
Invitacion a doctorado.
Comunicarse con ellos
  */
