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

const Login        = require('./src/components/loginScreen');
const Salir        = require('./src/components/salirScreen');
const DetalleCupon = require('./src/components/detalleCupon');
const PrepaidCard  = require('./src/components/prepaidScreen');
const PrPremiumCard = require('./src/components/prPremiumScreen');
const Gift_Card     = require('./src/components/giftcardScreen');
const GcPremiumCard = require('./src/components/gcPremiumScreen');

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
      socio: ''
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
          socio: responseData.socio
        });
      });
  }

  scrCupones = ({navigation}) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{
        textAlign: 'center',
        fontSize: 25,
        marginTop: 10,
        marginBottom: 10
      }}>
        Recompensas
      </Text>
      <FlatList style={{width: '100%'}}
        data={this.state.oCupones}
        renderItem={({ item, index }) => (          
          <View style={
            index%2==0 ? {
              backgroundColor: 'lightblue',
              height: 90,
              paddingTop: 5,
              paddingBottom: 5
            } : { 
              backgroundColor: 'none',
              height: 90,
              paddingTop: 5,
              paddingBottom: 5
            }
          }>
            <TouchableOpacity 
              onPress={() => 
                navigation.navigate('Cupon', {
                  logoproveedor: item.logoproveedor, 
                  idproveedor: item.idproveedor, 
                  cuponlargo: item.cuponlargo,
                  barcode: item.barcode,
                  qrcode: item.qrcode
                })
              }
            >
              <View style={{flexDirection: 'row', height: '100%'}}>
                <View style={{
                  width: '25%', 
                  paddingHorizontal: 5,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Image 
                    style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                    source={{uri: item.logoproveedor}}
                  />
                </View>
                <View style={{
                  paddingLeft: 5,
                  width: '75%',
                  justifyContent: 'center',
                  textAlign: 'left'
                }}>
                  <View style={{flexDirection: "row"}}>
                    <Text>Cupón:</Text>
                    <Text style={{ paddingLeft: 5, fontWeight: 'bold'}}>
                      {item.cuponlargo}
                    </Text>
                  </View>
                  <Text>
                    <Text style={{ fontWeight: 'bold' }}>
                      {item.nombreproveedor}
                    </Text>
                  </Text>
                  <Text style={{ fontWeight: 'bold', color: 'red' }}>
                    {item.premio}
                  </Text>
                  <View style={{flexDirection: "row"}}>
                    <Text>Vencimiento:</Text>
                    <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                      {item.fechavencimiento}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.cuponlargo}
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: 'lightgray',
              height: 1,
            }}
          />
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              backgroundColor: 'lightgray',
              height: 1,
            }}
          />
        )}
        ListFooterComponent={() => (
          <View
            style={{
              backgroundColor: 'lightgray',
              height: 1,
            }}
          />
        )}
      />
    </View>
  )

  scrPrepagos = ({navigation}) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{
        textAlign: 'center',
        fontSize: 25,
        marginTop: 10,
        marginBottom: 10
      }}>
        Tarjetas prepagadaas
      </Text>
      <FlatList style={{width: '100%'}}
        data={this.state.oPrepagos}
        renderItem={({ item, index }) => (          
          <View style={
            index%2==0 ? {
              backgroundColor: 'lightblue',
              height: 90,
              paddingTop: 5,
              paddingBottom: 5
            } : { 
              backgroundColor: 'none',
              height: 90,
              paddingTop: 5,
              paddingBottom: 5
            }}
          >
            <TouchableOpacity 
              onPress={() => {
                if(item.premium) {
                  navigation.navigate('PrPremium', {
                    logo: item.logotarjeta,
                    card: item.tarjeta,
                    nombre: this.state.socio,
                    validez: item.validez,
                    saldo: item.saldo,
                    moneda: item.moneda,
                    simbolo: item.simbolo,
                    dibujomoneda: item.dibujomoneda
                  })
                } else {
                  navigation.navigate('Prepaids', {
                    logo: item.logotarjeta,
                    card: item.tarjeta,
                    nombre: this.state.socio,
                    validez: item.validez,
                    saldo: item.saldo,
                    moneda: item.moneda,
                    simbolo: item.simbolo
                  })
                }
              }}
            >
              <View style={{flexDirection: 'row', height: '100%'}}>
                <View style={{
                  width: '25%', 
                  paddingHorizontal: 5,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Image 
                    style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                    source={{uri: item.logoproveedor}}
                  />
                </View>
                <View style={{
                  paddingLeft: 5,
                  width: '75%',
                  justifyContent: 'center',
                  textAlign: 'left'
                }}>
                  <View style={{flexDirection: "row"}}>
                    <Text>Tarjeta:</Text>
                    <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                      {item.tarjeta.substr(0,4)+'-'+item.tarjeta.substr(4,4)+'-'+item.tarjeta.substr(8,4)+'-'+item.tarjeta.substr(12,4)}
                    </Text>
                  </View>
                  <View style={{flexDirection: "row"}}>
                    <Text>Tipo:</Text>
                    <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                      {item.premium==1 ? 'PREMIUM' : 'Local'}
                    </Text>
                  </View>
                  <View style={{flexDirection: "row"}}>
                    <Text>Comercio:</Text>
                    <Text style={{ marginLeft: 5, fontWeight: 'bold', color: 'red' }}>
                      {item.premium==1 ? 'Todos' : item.nombre}
                    </Text>
                  </View>
                  <View style={{flexDirection: "row"}}>
                    <Text>Saldo:</Text>
                    <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                      {item.saldo} {item.simbolo}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.tarjeta}
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: 'lightgray',
              height: 1,
            }}
          />
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              backgroundColor: 'lightgray',
              height: 1,
            }}
          />
        )}
        ListFooterComponent={() => (
          <View
            style={{
              backgroundColor: 'lightgray',
              height: 1,
            }}
          />
        )}
      />
    </View>
  )

  scrGiftcards = ({navigation}) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{
        textAlign: 'center',
        fontSize: 25,
        marginTop: 10,
        marginBottom: 10
      }}>
        Tarjetas de regalo
      </Text>
      <FlatList style={{width: '100%'}}
        data={this.state.oGiftcards}
        renderItem={({ item, index }) => (          
          <View style={
            index%2==0 ? {
              backgroundColor: 'lightblue',
              height: 90,
              paddingTop: 5,
              paddingBottom: 5
            } : { 
              backgroundColor: 'none',
              height: 90,
              paddingTop: 5,
              paddingBottom: 5
            }}
          >
            <TouchableOpacity 
              onPress={() => {
                if(item.premium) {
                  navigation.navigate('GcPremium', {
                    logo: item.logotarjeta,
                    card: item.tarjeta,
                    nombre: this.state.socio,
                    validez: item.validez,
                    saldo: item.saldo,
                    moneda: item.moneda,
                    simbolo: item.simbolo,
                    dibujomoneda: item.dibujomoneda
                  })
                } else {
                  navigation.navigate('Gift_Card', {
                    logo: item.logotarjeta,
                    card: item.tarjeta,
                    nombre: this.state.socio,
                    validez: item.validez,
                    saldo: item.saldo,
                    moneda: item.moneda,
                    simbolo: item.simbolo
                  })
                }
              }}
            >
              <View style={{flexDirection: 'row', height: '100%'}}>
                <View style={{
                  width: '25%', 
                  paddingHorizontal: 5,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Image 
                    style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                    source={{uri: item.logoproveedor}}
                  />
                </View>
                <View style={{
                  paddingLeft: 5,
                  width: '75%',
                  justifyContent: 'center',
                  textAlign: 'left'
                }}>
                  <View style={{flexDirection: "row"}}>
                    <Text>Tarjeta:</Text>
                    <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                      {item.tarjeta.substr(0,4)+'-'+item.tarjeta.substr(4,4)+'-'+item.tarjeta.substr(8,4)+'-'+item.tarjeta.substr(12,4)}
                    </Text>
                  </View>
                  <View style={{flexDirection: "row"}}>
                    <Text>Tipo:</Text> 
                    <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                      {item.premium==1 ? 'PREMIUM' : 'Local'}
                    </Text>
                  </View>
                  <View style={{flexDirection: "row"}}>
                    <Text>Comercio:</Text>
                    <Text style={{ marginLeft: 5, fontWeight: 'bold', color: 'red' }}>
                      {item.premium==1 ? 'Todos' : item.nombre}
                    </Text>
                  </View>
                  <View style={{flexDirection: "row"}}>
                    <Text>Saldo:</Text>
                    <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                      {item.saldo} {item.simbolo}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.tarjeta}
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: 'lightgray',
              height: 1,
            }}
          />
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              backgroundColor: 'lightgray',
              height: 1,
            }}
          />
        )}
        ListFooterComponent={() => (
          <View
            style={{
              backgroundColor: 'lightgray',
              height: 1,
            }}
          />
        )}
      />
    </View>
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