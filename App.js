import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const USER_URL = "https://app.cash-flag.com/apis/v1/socios/login?";
const PRODUCTS_URL = 'https://app.cash-flag.com/apis/v1/socios/productos?';
const TRANSF_URL = 'https://app.cash-flag.com/apis/v1/socios/transfierecupon';

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

const StackPrincipal = createStackNavigator();
const StackCupones = createStackNavigator();
const StackPrepagos = createStackNavigator();
const StackGiftcards = createStackNavigator();
const TabPrincipal = createBottomTabNavigator();

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

  actualizastate = (parametros) => {
    this.fetchUser(parametros.navigation,parametros.txtUser,parametros.txtPass);
  };

  async fetchUser(n,u,p) {
    if(this.state.isLogged==false) {
      await fetch(USER_URL+"email="+u+"&password="+p)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.exito=="SI") {
          this.fetchData(n,u,responseData.token);
        } else {
          Alert.alert('Aviso', responseData.mensaje);
        }
      })         
    }
  }
 
  async fetchData(n,u,t) {
    await fetch(PRODUCTS_URL+'email='+u+'&token='+t)
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
      n.replace('Dashboard',{navigation:n});
    });
  }

  tabPrincipal = ({route, navigation}) => {
    const {correo,passwd} = route.params;
    return (
    <TabPrincipal.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        activeBackgroundColor: "black",
        inactiveTintColor: "blue",
        inactiveBackgroundColor: "white"
      }}
    >
      <TabPrincipal.Screen
        key="cupones"
        name="Cupones"
        children={this.stackCupones}
        options={{
          title: 'Cupones',
          tabBarIcon: ({ color, size}) => (
            <Ionicons name='receipt' size={size} color={color}/>
          )
        }}
      />
      <TabPrincipal.Screen
        key="prepagos"
        name="Prepagos"
        component={this.stackPrepagos}
        options={{
          title: 'Prepagos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='logo-usd' size={size} color={color}/>
          )
        }}
      />
      <TabPrincipal.Screen
        key="giftcards"
        name="Giftcards"
        component={this.stackGiftcards}
        options={{
          title: 'Giftcards',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='gift' size={size} color={color}/>
          )
        }}
      />
      <TabPrincipal.Screen
        key="salir"
        name="Salir"
        component={this.scrLogout}
        options={{
          title: 'Salir',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='log-out' size={size} color={color}/>
          ),
          tabBarVisible: false
        }}
      />
    </TabPrincipal.Navigator>
  )}

  stackCupones = ({navigation}) => (
    <StackCupones.Navigator>
      <StackCupones.Screen
        key="cupones"
        name="Cupones"
        component={this.scrCupones}
        options={{
          title: 'Recompensas'
        }}
      />
      <StackCupones.Screen
        key="detCupon"
        name="Cupon"
        component={DetalleCupon}
        options={{
          title: 'Cupón de Recompensa'
        }}
      />
    </StackCupones.Navigator>
  )

  stackPrepagos = ({navigation}) => (
    <StackPrepagos.Navigator>
      <StackPrepagos.Screen
        key="prepagos"
        name="Prepagos"
        component={this.scrPrepagos}
        options={{
          title: 'Tarjetas prepagadas'
        }}
      />
      <StackPrepagos.Screen
        key="detPrepagos"
        name="Prepaids"
        component={PrepaidCard}
        options={{
          title: 'Tarjeta Prepagada'
        }}
      />
      <StackPrepagos.Screen
        key="detprPremium"
        name="PrPremium"
        component={PrPremiumCard}
        options={{
          title: 'Tarjeta Prepagada'
        }}
      />
    </StackPrepagos.Navigator>
  )

  stackGiftcards = ({navigation}) => (
    <StackGiftcards.Navigator>
      <StackGiftcards.Screen
        key="giftcards"
        name="Giftcards"
        component={this.scrGiftcards}
        options={{
          title: 'Tarjetas de regalo'
        }}

      />
      <StackGiftcards.Screen
        key="detGiftcard"
        name="Gift_Card"
        component={Gift_Card}
        options={{
          title: 'Tarjeta de regalo'
        }}
      />
      <StackGiftcards.Screen
        key="detgcPremium"
        name="GcPremium"
        component={GcPremiumCard}
        options={{
          title: 'Tarjeta de regalo'
        }}
      />
    </StackGiftcards.Navigator>
  )

  scrLogin = ({navigation}) => (
    <Login 
      navigation={navigation}
      datos={this.actualizastate}
    />
  )

  scrLogout = ({route,navigation}) => {
    this.setState({
      isLogged: false,
      oCupones: [],
      oPrepagos: [],
      oGiftcards: [],
      socio: '',
      email: '',
      token: ''
    });
    return (
      <Login 
        navigation={navigation}
        datos={this.actualizastate}
      />
    )
  }

  scrCupones = ({navigation}) => (
    <Cupones 
      navigation={navigation} 
      cupones={this.state.oCupones}
      email={this.state.email}
      token={this.state.token}
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
        <StackPrincipal.Navigator
          headerMode='none'
          headerShown={false}
        >
          <StackPrincipal.Screen
            name="Login"
            component={this.scrLogin}
            options={{
              title: 'Login'
            }}
            tabBarOptions={{
              tabBarVisible: false
            }}
          />
          <StackPrincipal.Screen 
            name="Dashboard"
            children={this.tabPrincipal}
            options={{
              title: 'Login'
            }}
            tabBarOptions={{
              tabBarVisible: false
            }}
          />
        </StackPrincipal.Navigator>
      </NavigationContainer>
    );
  }
}