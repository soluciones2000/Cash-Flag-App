import { registerRootComponent } from 'expo';
import React, { Component } from 'react';
import { View, Alert, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import io from "socket.io-client";

import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
// import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const USER_URL = "https://app.cash-flag.com/apis/v1/socios/login?";
const PRODUCTS_URL = 'https://app.cash-flag.com/apis/v1/socios/productos?';
const TOKEN_URL = 'https://app.cash-flag.com/apis/v1/socios/getToken?';
const TRANSF_URL = 'https://app.cash-flag.com/apis/v1/socios/transfierecupon';
const IMG_URL = "https://app.cash-flag.com/apis/v1/comercios/imgs";

const styles = require('./src/components/styles');

const Login                = require('./src/components/loginScreen');
const NewUser              = require('./src/components/newUserScreen');
const ResetPwd             = require('./src/components/resetPwdScreen');
const Dashboard            = require('./src/components/dashboardScreen');
const QrScreen             = require('./src/components/dashboardQrScreen');
const Cupones              = require('./src/components/cupones');
const Prepagos             = require('./src/components/prepagos');
const Giftcards            = require('./src/components/giftcards');
const DetalleCupon         = require('./src/components/detalleCupon');
const NewCupon             = require('./src/components/newCupon');
const PrPremiumCard        = require('./src/components/prPremiumScreen');
const PrepaidCard          = require('./src/components/prepaidScreen');
const GcPremiumCard        = require('./src/components/gcPremiumScreen');
const Gift_Card            = require('./src/components/giftcardScreen');
const LocalRec             = require('./src/components/recargaLocal');
const PremiumRec           = require('./src/components/recargaPremium');
const ReportePago          = require('./src/components/reporte');
const ReporteZelle         = require('./src/components/reporteZelle');
const PasarelaPagoBsTdc    = require('./src/components/pasarelaPagoBsTdc');
const PasarelaPagoBsTdd    = require('./src/components/pasarelaPagoBsTdd');
const PasarelaPagoBsC2p    = require('./src/components/pasarelaPagoBsC2p');
const PasarelaPagoDolarTdc = require('./src/components/pasarelaPagoDolarTdc');
const BuyGiftcard          = require('./src/components/buyGiftcard');
const LocalGiftDet         = require('./src/components/detGiftcardLocal');
const PremiumGiftDet       = require('./src/components/detGiftcardPremium');
const GiftcardRep          = require('./src/components/repGiftcard');
const GiftcardRepZelle     = require('./src/components/repZelleGiftcard');

const StackDashboard = createStackNavigator();
const StackCupones = createStackNavigator();
const StackPrepagos = createStackNavigator();
const StackGiftcards = createStackNavigator();
const TabPrincipal = createBottomTabNavigator();

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    /*
    const devID = (await Notifications.getDevicePushTokenAsync()).data;

    const token = (await Notifications.getExpoPushTokenAsync({
      experienceID: '@soluciones2000/Cash-Flag',
      devicePushToken: devID,
      applicationId: 'com.cashflag.app'
    })).data;
    */
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('getExpoPushTokenAsync()',token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}

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
      token: '',
      aImgs: [],
      idsocio : 0,
      card: '',
      nombre: '',
      validez: '',
      numcupones: 0,
      numprepusd: 0,
      numprepbs: 0,
      numgiftusd: 0,
      numgiftbs: 0,
      tokenPush: ''
    };
  }

  getToken = async (u) => {
    let tkn;
    registerForPushNotificationsAsync()
    .then(token => {
      console.log('token',token);
      tkn = token;
      this.setState({ tokenPush: token });
    })
    .then(() => {
      console.log('then',tkn);
      fetch(TOKEN_URL+"email="+u+"&deviceID="+tkn)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.exito=="SI") {
          console.log(responseData.mensaje);
        } else {
          console.log("Equipo no registrado");
        }
      })         
  
    });

    // registerForPushNotificationsAsync();

    Notifications.addNotificationReceivedListener(notification => {
      console.log('notification',notification);
    });

    Notifications.addNotificationResponseReceivedListener(response => {
      console.log('response',response);
    });

  };

  componentDidMount() {
    this.fetchImg();
    
    this.socket = io('https://ws-cashflag.herokuapp.com/');
    this.socket.on('actlista', msg => console.log("actlista", msg));
  }
      // datos = JSON.parse(msg);
      // console.log("actlista", msg);
      // if (msg=='prepago') {        
      // } else {
      // }

  txtEmail = '';
  txtPregunta = '';
  // aImgs = [];

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

  async fetchImg() {
    await fetch(IMG_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({ aImgs: responseData.imgs});
    });
  }

  async fetchUser(u,p) {    
    console.log(this.state.tokenPush);
    if(this.state.isLogged==false) {
      console.log("USER_URL",USER_URL+"email="+u+"&password="+p);
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
    console.log('PRODUCTS_URL',PRODUCTS_URL+'email='+u+'&token='+t+'&deviceID='+this.state.tokenPush);
    await fetch(PRODUCTS_URL+'email='+u+'&token='+t+'&deviceID='+this.state.tokenPush)
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
        token: t,
        idsocio: responseData.idsocio,
        card: responseData.card,
        nombre: responseData.socio,
        validez: responseData.afiliacion,
        numcupones: responseData.numcupones,
        numprepusd: responseData.numprepusd,
        numprepbs: responseData.numprepbs,
        numgiftusd: responseData.numgiftusd,
        numgiftbs: responseData.numgiftbs
        });
        this.getToken(u);
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
        activeTintColor: "rgba(1,43,103,1)",
        activeBackgroundColor: "lightgray",
        inactiveTintColor: "white",
        inactiveBackgroundColor: "lightgray"
      }}
    >
      <TabPrincipal.Screen
        key="dashboard"
        name="Dashboard"
        children={this.stackDashboard}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size}) => (
            <Ionicons name='home' size={size} color={color}/>
          ),
          tabBarLabelStyle: { fontSize: 25}
        }}
      />
      <TabPrincipal.Screen
        key="cupones"
        name="Cupones"
        children={this.stackCupones}
        options={{
          title: 'Recompensas',
          tabBarIcon: ({ color, size}) => (
            <Ionicons name='receipt' size={size} color={color}/>
          ),
          tabBarLabelStyle: { fontSize: 25}
        }}
      />
      <TabPrincipal.Screen
        key="prepagos"
        name="Prepagos"
        component={this.stackPrepagos}
        options={{
          title: 'Tarj. de compras',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='logo-usd' size={size} color={color}/>
          ),
          tabBarLabelStyle: { fontSize: 25}
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
          ),
          tabBarLabelStyle: { fontSize: 25}
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
          tabBarLabelStyle: { fontSize: 25}
          // ,
          // tabBarVisible: false
        }}
      />
    </TabPrincipal.Navigator>
  )}

  stackDashboard = ({navigation}) => (
    <StackDashboard.Navigator>
      <StackDashboard.Screen
        key="dashboard"
        name="Dashboard"
        component={this.scrDashboard}
        options={{
          title: 'Dashboard',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
      />
      <StackDashboard.Screen
        key="qrscreen"
        name="QrScreen"
        component={QrScreen}
        options={{
          title: 'Cliente Frecuente',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
      />
    </StackDashboard.Navigator>
  )

  stackCupones = ({navigation}) => (
    <StackCupones.Navigator>
      <StackCupones.Screen
        key="cupones"
        name="Cupones"
        component={this.scrCupones}
        options={{
          title: 'Recompensas',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackCupones.Screen
        key="newCupon"
        name="newCupon"
        component={NewCupon}
        options={{
          title: 'Reclamar Recompensa',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackCupones.Screen
        key="detCupon"
        name="Cupon"
        component={DetalleCupon}
        options={{
          title: 'Cupon de Recompensa',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
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
          title: 'Tarjetas de compras',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackPrepagos.Screen
        key="detPrepagos"
        name="Prepaids"
        component={PrepaidCard}
        options={{
          title: 'Tarjeta de Compras',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackPrepagos.Screen
        key="detprPremium"
        name="PrPremium"
        component={PrPremiumCard}
        options={{
          title: 'Tarjeta de Compras',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackPrepagos.Screen
        key="scrRecLocal"
        name="recLocal"
        component={LocalRec}
        options={{
          title: 'Recarga tarjeta (Paso 1)',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackPrepagos.Screen
        key="scrRecPremium"
        name="recPremium"
        component={PremiumRec}
        options={{
          title: 'Recarga tarjeta (Paso 1)',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackPrepagos.Screen
        key="scrReporte"
        name="reporte"
        component={ReportePago}
        options={{
          title: 'Recarga tarjeta (Paso 2)',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackPrepagos.Screen
        key="scrPasarelaPagoBsTdc"
        name="pasarelaPagoBsTdc"
        component={PasarelaPagoBsTdc}
        options={{
          title: 'Recarga tarjeta (Paso 2)',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackPrepagos.Screen
        key="scrPasarelaPagoBsTdd"
        name="pasarelaPagoBsTdd"
        component={PasarelaPagoBsTdd}
        options={{
          title: 'Recarga tarjeta (Paso 2)',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackPrepagos.Screen
        key="scrPasarelaPagoBsC2p"
        name="pasarelaPagoBsC2p"
        component={PasarelaPagoBsC2p}
        options={{
          title: 'Recarga tarjeta (Paso 2)',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackPrepagos.Screen
        key="scrReporteZelle"
        name="reporteZelle"
        component={ReporteZelle}
        options={{
          title: 'Recarga tarjeta (Paso 2)',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackPrepagos.Screen
        key="scrPasarelaPagoDolarTdc"
        name="pasarelaPagoDolarTdc"
        component={PasarelaPagoDolarTdc}
        options={{
          title: 'Recarga tarjeta (Paso 2)',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
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
          title: 'Tarjetas de regalo',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackGiftcards.Screen
        key="detGiftcard"
        name="Gift_Card"
        component={Gift_Card}
        options={{
          title: 'Tarjeta de regalo',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackGiftcards.Screen
        key="detgcPremium"
        name="GcPremium"
        component={GcPremiumCard}
        options={{
          title: 'Tarjeta de regalo',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackGiftcards.Screen
        key="scrBuyGiftcard"
        name="buyGiftcard"
        component={BuyGiftcard}
        options={{
          title: 'Comprar Giftcard (Paso 1)',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackGiftcards.Screen
        key="scrDetGiftcardLocal"
        name="detGiftcardLocal"
        component={LocalGiftDet}
        options={{
          title: 'Comprar Giftcard (Paso 2)',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackGiftcards.Screen
        key="scrDetGiftcardPremium"
        name="detGiftcardPremium"
        component={PremiumGiftDet}
        options={{
          title: 'Comprar Giftcard (Paso 2)',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackGiftcards.Screen
        key="scrRepGiftcard"
        name="repGiftcard"
        component={GiftcardRep}
        options={{
          title: 'Comprar Giftcard (Paso 3)',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackGiftcards.Screen
        key="scrPasarelaPagoBsTdc"
        name="pasarelaPagoBsTdc"
        component={PasarelaPagoBsTdc}
        options={{
          title: 'Comprar Giftcard (Paso 3)',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackGiftcards.Screen
        key="scrPasarelaPagoBsTdd"
        name="pasarelaPagoBsTdd"
        component={PasarelaPagoBsTdd}
        options={{
          title: 'Comprar Giftcard (Paso 3)',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackGiftcards.Screen
        key="scrPasarelaPagoBsC2p"
        name="pasarelaPagoBsC2p"
        component={PasarelaPagoBsC2p}
        options={{
          title: 'Comprar Giftcard (Paso 3)',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackGiftcards.Screen
        key="scrRepZelleGiftcard"
        name="repZelleGiftcard"
        component={GiftcardRepZelle}
        options={{
          title: 'Comprar Giftcard (Paso 3)',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <StackGiftcards.Screen
        key="scrPasarelaPagoDolarTdc"
        name="pasarelaPagoDolarTdc"
        component={PasarelaPagoDolarTdc}
        options={{
          title: 'Comprar Giftcard (Paso 3)',
          headerStyle: {
            backgroundColor: 'rgba(3,44,98,1)'
          },
          headerTintColor: 'rgba(195,150,58,255)',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
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
        resetPwd={this.resetPwd}
        newUser={this.newUser}
        imgs={this.state.aImgs}
      />
    )
  }

  scrDashboard = ({navigation}) => (
    <Dashboard 
      navigation={navigation} 
      card={this.state.card}
      idsocio={this.state.idsocio}
      nombre={this.state.nombre}
      validez={this.state.validez}
      numcupones={this.state.numcupones}
      numprepusd={this.state.numprepusd}
      numprepbs={this.state.numprepbs}
      numgiftusd={this.state.numgiftusd}
      numgiftbs={this.state.numgiftbs}
    />
  )

  scrCupones = ({navigation}) => (
    <Cupones 
      navigation={navigation} 
      cupones={this.state.oCupones}
      email={this.state.email}
      token={this.state.token}
      comercios={this.state.oComercios}
      actDatos={this.actuaListaCupones}
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
      // Tab principal
      return (
        <NavigationContainer>
          <this.tabPrincipal/>
        </NavigationContainer>
      );
    } else {
      if(this.state.newUser) {
        // Usuario nuevo
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
          // Resetar Password
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
            // Pantalla inicial
            <View style={styles.container}>
              <Login 
                datos={this.actualizastate}
                resetPwd={this.resetPwd}
                newUser={this.newUser}
                imgs={this.state.aImgs}
              />
            </View>
          );
        }
      }
    }
  }
}


// const styles2 = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });

registerRootComponent(CashFlag);