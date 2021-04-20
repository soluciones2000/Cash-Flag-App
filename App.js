import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TouchableHighlight, 
  TouchableOpacity, 
  FlatList, 
  Alert, 
  Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const USER_URL = "https://app.cash-flag.com/apis/v1/socios/login?";
const PRODUCTS_URL = 'https://app.cash-flag.com/apis/v1/socios/productos?';

const styles = require('./src/components/styles');

const Login         = require('./src/components/loginScreen');
const Cupones       = require('./src/components/cupones');
const Prepagos      = require('./src/components/prepagos');
const Giftcards     = require('./src/components/giftcards');
const DetalleCupon  = require('./src/components/detalleCupon');
const PrPremiumCard = require('./src/components/prPremiumScreen');
const PrepaidCard   = require('./src/components/prepaidScreen');
const GcPremiumCard = require('./src/components/gcPremiumScreen');
const Gift_Card     = require('./src/components/giftcardScreen');

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const scrLogin = ({navigation}) => (
  <Login navigation={navigation}/>
);

export default class CashFlag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'cupones',
      isLogged: false,
      oCupones: [],
      oPrepagos: [],
      oGiftcards: [],
      socio: '',
      email: '',
      token: ''
    };
  }

  fetchUser(u,p) {
    if(this.state.isLogged==false) {
      fetch(USER_URL+"email="+u+"&password="+p)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.exito=="SI") {
          this.fetchData(u,responseData.token);
        } else {
          Alert.alert('Aviso', responseData.mensaje);
        }
      })         
    }
  }
 
  fetchData(u,t) {
    fetch(PRODUCTS_URL+'email='+u+'&token='+t)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        isLogged: true,
        oCupones: responseData.cupones,
        oPrepagos: responseData.prepagos,
        oGiftcards: responseData.giftcards,
        socio: responseData.socio,
        email: u,
        token: t
      });
    });
  }

  scrCupones = ({navigation}) => (
    <Cupones 
      navigation={navigation} 
      cupones={this.state.oCupones}
    />
  )

  scrPrepagos = ({navigation}) => (
    <Prepagos 
      navigation={navigation} 
      prepagos={this.state.oPrepagos}
      socio={this.state.socio}
    />
  )

  scrGiftcards = ({navigation}) => (
    <Giftcards 
      navigation={navigation} 
      giftcards={this.state.oGiftcards}
      socio={this.state.socio}
    />
  )

  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={scrLogin}
        options={{
          title: 'Login'
        }}
      />
      <Stack.Screen 
        name="Dashboard"
        children={({route, navigation}) => {
          const {correo,passwd} = route.params;
          this.fetchUser(correo, passwd);
          if(this.state.isLogged){
            return (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "white",
                  activeBackgroundColor: "black",
                  inactiveTintColor: "blue",
                  inactiveBackgroundColor: "white"
                }}
              >
                <Tab.Screen
                  key="cupones"
                  name="Cupones"
                  component={this.scrCupones}
                  options={{
                    title: 'Cupones',
                    tabBarIcon: ({ color, size}) => (
                      <Ionicons name='receipt' size={size} color={color}/>
                    )
                  }}
                />
                <Tab.Screen
                  key="prepagos"
                  name="Prepagos"
                  component={this.scrPrepagos}
                  options={{
                    title: 'Prepagos',
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name='logo-usd' size={size} color={color}/>
                    )
                  }}
                />
                <Tab.Screen
                  key="giftcards"
                  name="Giftcards"
                  component={this.scrGiftcards}
                  options={{
                    title: 'Giftcards',
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name='gift' size={size} color={color}/>
                    )
                  }}
                />
                <Tab.Screen
                  key="salir"
                  name="Salir"
                  component={Login}
                  options={{
                    title: 'Salir',
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name='log-out' size={size} color={color}/>
                    )
                  }}
                />
              </Tab.Navigator>
            )
          } else {
            return (
              <Login navigation={navigation}/>
            )
          }
        }}
        options={
          this.state.isLogged ?
        {
          title: 'Mis productos'
        } : {
          title: 'Login'
        }}
      />
      <Stack.Screen
        name="Cupon"
        component={DetalleCupon}
        options={{
          title: 'Cupón de Recompensa'
        }}
      />
      <Stack.Screen
        name="Prepaids"
        component={PrepaidCard}
        options={{
          title: 'Tarjeta Prepagada'
        }}
      />
      <Stack.Screen
        name="PrPremium"
        component={PrPremiumCard}
        options={{
          title: 'Tarjeta Prepagada'
        }}
      />
      <Stack.Screen
        name="Gift_Card"
        component={Gift_Card}
        options={{
          title: 'Tarjeta de regalo'
        }}
      />
      <Stack.Screen
        name="GcPremium"
        component={GcPremiumCard}
        options={{
          title: 'Tarjeta de regalo'
        }}
      />
      </Stack.Navigator>
      </NavigationContainer>
    );
  }
}