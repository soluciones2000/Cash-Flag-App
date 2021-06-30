import React, { Component, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  Alert,
  StyleSheet } from 'react-native';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';

const styles = require('./styles');

const Prepagos = (params) => {
  const navigation = params.navigation;
  const socio = params.socio;
  const [data, setData] = useState(params.prepagos);
  const [isRender, setIsrender] = useState(false);
  const email = params.email
  const token = params.token
  const comercios = params.comercios


  const actualizasaldo = (saldo,index) => {
    let xaPrepagos = data;
    xaPrepagos[index].saldo = saldo;
    setData(xaPrepagos);
    setIsrender(!isRender)
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList style={{width: '100%'}}
        data={data}
        renderItem={({ item, index }) => (  
          <View style={{
              backgroundColor: 'lightblue',
              height: 90,
              paddingTop: 5,
              paddingBottom: 5
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if(item.premium) {
                  this.saldoant = item.saldo;
                  navigation.navigate('PrPremium', {
                    logo: item.logotarjeta,
                    idproveedor: item.idproveedor,
                    card: item.tarjeta,
                    nombre: socio,
                    validez: item.validez,
                    saldo: item.saldo,
                    moneda: item.moneda,
                    simbolo: item.simbolo,
                    dibujomoneda: item.dibujomoneda,
                    actsaldo: actualizasaldo,
                    indice: index
                  })
                } else {
                  navigation.navigate('Prepaids', {
                    logo: item.logotarjeta,
                    idproveedor: item.idproveedor,
                    card: item.tarjeta,
                    nombre: socio,
                    validez: item.validez,
                    saldo: item.saldo,
                    moneda: item.moneda,
                    simbolo: item.simbolo,
                    actsaldo: actualizasaldo,
                    indice: index
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
                    <Text allowFontScaling={false}>Tarjeta:</Text>
                    <Text allowFontScaling={false} style={{ marginLeft: 5, fontWeight: 'bold' }}>
                      {item.tarjeta.substr(0,4)+'-'+item.tarjeta.substr(4,4)+'-'+item.tarjeta.substr(8,4)+'-'+item.tarjeta.substr(12,4)}
                    </Text>
                  </View>
                  <View style={{flexDirection: "row"}}>
                    <Text allowFontScaling={false}>Tipo:</Text>
                    <Text allowFontScaling={false} style={{ marginLeft: 5, fontWeight: 'bold' }}>
                      {item.premium==1 ? 'PREMIUM' : 'Local'}
                    </Text>
                  </View>
                  <View style={{flexDirection: "row"}}>
                    <Text allowFontScaling={false}>Comercio:</Text>
                    <Text allowFontScaling={false} style={{ marginLeft: 5, fontWeight: 'bold', color: 'red' }}>
                      {item.premium==1 ? 'Todos' : item.nombre}
                    </Text>
                  </View>
                  <View style={{flexDirection: "row"}}>
                    <Text allowFontScaling={false}>Saldo:</Text>
                    <Text allowFontScaling={false} style={{ marginLeft: 5, fontWeight: 'bold' }}>
                      {item.saldo} {item.simbolo}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.tarjeta}
        extraData={data}
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: 'black',
              height: 1,
            }}
          />
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              backgroundColor: 'black',
              height: 1,
            }}
          />
        )}
        ListFooterComponent={() => (
          <View
            style={{
              backgroundColor: 'black',
              height: 1,
            }}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.container}>
            <Text style={styles.text}>
              No tienes tarjetas prepagadas, puedes recargar una en cualquiera de los comercios afiliados o visitando https://app.cash-flag.com
            </Text>
          </View>
        )}
      />
      <View 
        style={{
          flex: 1,
          height: '27%',
          width: '45%',
          alignSelf: 'flex-end',
          bottom: 0,
          position: 'absolute'
        }}
      >
        <MenuProvider style={{flexDirection: 'column-reverse'}}>
          <Menu
            renderer={renderers.SlideInMenu}
          >
            <MenuTrigger
              customStyles={{
                TriggerTouchableComponent: TouchableOpacity,
                triggerText: {
                  fontWeight: 'bold',
                  color: 'white'
                },
                triggerWrapper: {
                    margin: 5,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: "blue",
                    bottom: 5,
                    right: 5,
                    shadowColor: "black",
                    shadowOffset: {width: 2, height: 2},
                    shadowOpacity: 0.5
                }
              }}
              text='Recargar Tarjetas'
            />
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption
                value={1}
                text='Tarjeta Local'
                onSelect={value => navigation.navigate('recLocal', {
                  email: email,
                  token: token,
                  comercios: comercios
                })}
              />
              <MenuOption
                value={2}
                text='Tarjeta Premium'
                onSelect={value => navigation.navigate('recPremium', {
                  email: email,
                  token: token
                })}
              />
              <MenuOption
                style={{
                  marginVertical: 5,
                  marginRight: 5,
                  padding: 10,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  shadowColor: "black",
                  shadowOffset: {width: 2, height: 2},
                  shadowOpacity: 0.5,
                  textAlign: 'center'
                }}
                value={0}
                text='Cerrar'
                onSelect={value => console.log(`Selected number: ${value}`)}
              />
            </MenuOptions>
          </Menu>
        </MenuProvider>
      </View>
    </View>
  )
}

const optionsStyles = {
  optionsContainer: {
    paddingHorizontal: 5,
    position: 'absolute',
    bottom: 25,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: '100%'
  },
  optionWrapper: {
    marginVertical: 5,
    marginRight: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    textAlign: 'center'
  }
};

const triggerStyles = {
  triggerText: {
    fontWeight: 'bold',
    color: 'white'
  },
  triggerWrapper: {
      margin: 5,
      padding: 10,
      borderRadius: 10,
      position: "absolute",
      backgroundColor: "blue",
      bottom: 5,
      right: 5,
      shadowColor: "black",
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.5
  }
};

module.exports = Prepagos;