import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const USER_URL = "https://app.cash-flag.com/apis/v1/socios/login?";
const PRODUCTS_URL = 'https://app.cash-flag.com/apis/v1/socios/productos?';
const TRANSF_URL = 'https://app.cash-flag.com/apis/v1/socios/transfierecupon';

const styles = require('./src/components/styles');

const Login          = require('./src/components/loginScreen');
const NewUser        = require('./src/components/newUserScreen');
const ResetPwd       = require('./src/components/resetPwdScreen');
const Cupones        = require('./src/components/cupones');
const Prepagos       = require('./src/components/prepagos');
const Giftcards      = require('./src/components/giftcards');
const DetalleCupon   = require('./src/components/detalleCupon');
const PrPremiumCard  = require('./src/components/prPremiumScreen');
const PrepaidCard    = require('./src/components/prepaidScreen');
const GcPremiumCard  = require('./src/components/gcPremiumScreen');
const Gift_Card      = require('./src/components/giftcardScreen');
// const LocalRec      = require('./src/components/recargaLocal');
// const PremiumRec    = require('./src/components/recargaPremium');
// const ReportePago   = require('./src/components/reporte');
const BuyGiftcard    = require('./src/components/buyGiftcard');
const LocalGiftDet   = require('./src/components/detGiftcardLocal');
const PremiumGiftDet = require('./src/components/detGiftcardPremium');
const GiftcardRep    = require('./src/components/repGiftcard');

const StackLogin = createStackNavigator();
const StackCupones = createStackNavigator();
const StackPrepagos = createStackNavigator();
const StackGiftcards = createStackNavigator();
const TabPrincipal = createBottomTabNavigator();

export default class CashFlag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      newUser: false,
      resetPwd: false,
      oCupones: [],
      oPrepagos: [],
      oGiftcards: [],
      oComercios: [],
      socio: '',
      email: '',
      token: ''
    };
  }

  txtEmail = '';
  txtPregunta = '';

  actualizastate = (parametros) => {
    this.fetchUser(parametros.txtUser,parametros.txtPass);
  };

  resetPwd = (email,pregunta) => {
    this.txtEmail = email;
    this.txtPregunta = pregunta;
    this.setState({
      isLogged: false,
      newUser: false,
      resetPwd: true
    });
  };

  volver = () => {
    this.setState({
      isLogged: false,
      newUser: false,
      resetPwd: false
    });
  };

  successReset = () => {
    this.setState({
      isLogged: false,
      newUser: false,
      resetPwd: false
    });
  };

  newUser = () => {
      this.setState({
        isLogged: false,
        newUser: true,
        resetPwd: false
      });
  };

  recNewUser = (txtUser,
    txtNombres,
    txtApellidos,
    txtTelefono,
    txtPass,
    txtDesafio,
    txtRespuesta) => {
    this.setState({
      isLogged: false,
      newUser: false,
      resetPwd: false
    });
  };

  async fetchUser(u,p) {
    if(this.state.isLogged==false) {
      await fetch(USER_URL+"email="+u+"&password="+p)
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
 
  async fetchData(u,t) {
    await fetch(PRODUCTS_URL+'email='+u+'&token='+t)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        isLogged: true,
        newUser: false,
        resetPwd: false,
        oCupones: responseData.cupones,
        oPrepagos: responseData.prepagos,
        oGiftcards: responseData.giftcards,
        oComercios: responseData.comercios,
        socio: responseData.socio,
        email: u,
        token: t
      });
    });
  }

  async actuaListaCupones(u,t) {
    await fetch(PRODUCTS_URL+'email='+u+'&token='+t)
    .then((response) => response.json())
    .then((responseData) => {
      return responseData.cupones
    });
  }

  async actuaListaPrepagos(u,t) {
    await fetch(PRODUCTS_URL+'email='+u+'&token='+t)
    .then((response) => response.json())
    .then((responseData) => {
      return responseData.prepagos
    });
  }

  async actuaListaGiftcards(u,t) {
    await fetch(PRODUCTS_URL+'email='+u+'&token='+t)
    .then((response) => response.json())
    .then((responseData) => {
      return responseData.giftcards
    });
  }

  tabPrincipal = () => {
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
      <StackPrepagos.Screen
        key="scrRecLocal"
        name="recLocal"
        component={LocalRec}
        options={{
          title: 'Recarga tarjeta (Paso 1)'
        }}
      />
      <StackPrepagos.Screen
        key="scrRecPremium"
        name="recPremium"
        component={PremiumRec}
        options={{
          title: 'Recarga tarjeta (Paso 1)'
        }}
      />
      <StackPrepagos.Screen
        key="scrReporte"
        name="reporte"
        component={ReportePago}
        options={{
          title: 'Recarga tarjeta (Paso 2)'
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
      <StackPrepagos.Screen
        key="scrBuyGiftcard"
        name="buyGiftcard"
        component={BuyGiftcard}
        options={{
          title: 'Comprar Giftcard (Paso 1)'
        }}
      />
      <StackPrepagos.Screen
        key="scrDetGiftcardLocal"
        name="detGiftcardLocal"
        component={LocalGiftDet}
        options={{
          title: 'Comprar Giftcard (Paso 2)'
        }}
      />
      <StackPrepagos.Screen
        key="scrDetGiftcardPremium"
        name="detGiftcardPremium"
        component={PremiumGiftDet}
        options={{
          title: 'Comprar Giftcard (Paso 2)'
        }}
      />
      <StackPrepagos.Screen
        key="scrRepGiftcard"
        name="repGiftcard"
        component={GiftcardRep}
        options={{
          title: 'Comprar Giftcard (Paso 3)'
        }}
      />
    </StackGiftcards.Navigator>
  )

  scrLogout = ({navigation}) => {
    this.setState({
      isLogged: false,
      newUser: false,
      resetPwd: false,
      oCupones: [],
      oPrepagos: [],
      oGiftcards: [],
      socio: '',
      email: '',
      token: ''
    });
    return (
    <Login 
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
      comercios={this.state.oComercios}
    />
  )

  scrPrepagos = ({navigation}) => (
    <Prepagos 
      navigation={navigation} 
      prepagos={this.state.oPrepagos}
      socio={this.state.socio}
      email={this.state.email}
      token={this.state.token}
      comercios={this.state.oComercios}
      actDatos={this.actuaListaPrepagos}
    />
  )

  scrGiftcards = ({navigation}) => (
    <Giftcards 
      navigation={navigation} 
      giftcards={this.state.oGiftcards}
      socio={this.state.socio}
      email={this.state.email}
      token={this.state.token}
      comercios={this.state.oComercios}
      actDatos={this.actuaListaGiftcards}
    />
  )

  render() {
    if(this.state.isLogged) {
      return (
        <NavigationContainer>
          <this.tabPrincipal/>
        </NavigationContainer>
      );
    } else {
      if(this.state.newUser) {
        return (
          <View style={styles.container}>
            <NewUser 
              recNewUser={this.recNewUser}
              volver={this.volver}
            />
          </View>
        );
      } else {
        if(this.state.resetPwd) {
          return (
            <View style={styles.container}>
              <ResetPwd 
                email={this.txtEmail}
                pregunta={this.txtPregunta}
                successReset={this.successReset}
                volver={this.volver}
              />
            </View>
          );
        } else {
          return (
            <View style={styles.container}>
              <Login 
                datos={this.actualizastate}
                resetPwd={this.resetPwd}
                newUser={this.newUser}
              />
            </View>
          );
        }
      }
    }
  }
}