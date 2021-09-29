import React, { Component, useState, useEffect } from 'react';
import { 
  Linking,
  StyleSheet, 
  View, 
  Text,
  TouchableOpacity, 
  FlatList, 
  Image } from 'react-native';

const PRODUCTS_URL = 'https://app.cash-flag.com/apis/v1/socios/productos?';
  
const styles = require('./styles');

const Aviso = () => {
  return (
    <View style={styles2.container}>
      <View style={{alignItems: "center", marginTop: 50}}>
        <Image
          style={{
            width: 120,
            height: 120,
            resizeMode: 'contain'
          }}
          source={require('../../assets/img/ico-warning.png')}
        />
      </View>
      <View style={{
        backgroundColor: 'rgba(3,44,98,1)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 5,
          height: 5
        },
        shadowOpacity: 0.5,
        elevation: 5,
        height: 50,
        width: '80%',
        marginTop: 30
      }}>
        <Text
          allowFontScaling={false}
          style={{
            color: 'rgba(195,150,58,255)',
            fontSize: 20
          }}
        >
          No tienes recompensas
        </Text>
      </View>
      <Text allowFontScaling={false} style={styles2.parrafoSmall}>
        Gana recompensas en nuestros comercios afiliados, registra tu consumo o utiliza alguna de nuestras tarjetas de compras o de regalo.
        {"\n"}{"\n"}
        Conoce los comercios afiliados ingresando en:
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          shadowColor: "#000",
          shadowOffset: {
            width: 5,
            height: 5
          },
          shadowOpacity: 0.25,
          elevation: 5,
          height: 50,
          width: '80%',
          marginTop: 30
        }}
        onPress={() => Linking.openURL('https://app.cash-flag.com')}
      >
        <Text allowFontScaling={false} style={styles.textoboton}>
          app.cash-flag.com
        </Text>
      </TouchableOpacity>
    </View>  
  ) 
}

const Cupones = (params) => {
  const navigation = params.navigation;
  const email = params.email;
  const token = params.token;
  const [data, setData] = useState(params.cupones);
  const [isAct, setAct] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const comercios = params.comercios;
  const actDatos = params.actDatos;

  const actualizalista = (index) => {
    let xaCupones = data;
    xaCupones.splice(index,1);
    setData(xaCupones);
    setAct(!isAct);
  };

  const listRefresh = async () => {
    setRefreshing(true);
    await fetch(PRODUCTS_URL+'email='+email+'&token='+token)
    .then((response) => response.json())
    .then((responseData) => {
      setData(responseData.cupones);
      setRefreshing(false);
    });
  };

  const renderItem = ({item, index}) => {  
    return (
    <View style={{
        // backgroundColor: 'lightgray',
        height: 160,
        paddingVertical: 10,
        alignItems: 'center'
      }
    }>
      <TouchableOpacity 
        onPress={() => 
          navigation.navigate('Cupon', {
            logoproveedor: item.logoproveedor, 
            idproveedor: item.idproveedor, 
            cuponlargo: item.cuponlargo,
            barcode: item.barcode,
            qrcode: item.qrcode,
            premio: item.premio,
            vencimiento: item.fechavencimiento,
            proveedor: item.nombreproveedor,
            email: email,
            token: token,
            actlista: actualizalista,
            indice: index
          })
        }
      >
        <View style={{ 
          justifyContent: "flex-start", 
          alignItems: 'center',
          borderColor: 'black',
          borderWidth: 2,
          borderStyle: "dashed",
          // backgroundColor: 'yellow',
          width: '80%',
          borderRadius: 1,
          shadowColor: "black",
          shadowOffset: {width: 2, height: 2},
          shadowOpacity: 0.5
        }}>
          <View style={{width: '100%', backgroundColor: 'rgba(195,150,58,255)'}}>
            <View 
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
                height: 80,
                marginVertical: 5
            }}>
              <Image
                style={{width: 80, height: 80, resizeMode: 'contain'}}
                source={{uri: item.logoproveedor}}
              />
              <Text 
                allowFontScaling={false} 
                style={{
                  fontSize: 17, 
                  color: 'white',
                  width: 160, 
                  height: 80, 
                  fontWeight: 'bold', 
                  justifyContent: "center", 
                  alignItems: 'center',
                  textAlignVertical: 'center',
                  textAlign: 'center'
                }}
              >
                {item.premio}
              </Text>
            </View>
          </View>
          <View
          >
            <Text 
              allowFontScaling={false} 
              style={{
                fontSize: 17, 
                // width: 160, 
                height: 50, 
                color: 'black',
                fontWeight: 'bold', 
                justifyContent: "center", 
                alignItems: 'center',
                textAlignVertical: 'center',
                textAlign: 'center'
              }}
            >
              Valido hasta el: {item.fechavencimiento}
            </Text>
          </View>
        </View>
        {/* 
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
              <Text allowFontScaling={false}>Cupón:</Text>
              <Text allowFontScaling={false} style={{ paddingLeft: 5, fontWeight: 'bold'}}>
                {item.cuponlargo}
              </Text>
            </View>
            <Text>
              <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>
                {item.nombreproveedor}
              </Text>
            </Text>
            <Text allowFontScaling={false} style={{ fontWeight: 'bold', color: 'red' }}>
              {item.premio}
            </Text>
            <View style={{flexDirection: "row"}}>
              <Text allowFontScaling={false}>Vencimiento:</Text>
              <Text allowFontScaling={false} style={{ marginLeft: 5, fontWeight: 'bold' }}>
                {item.fechavencimiento}
              </Text>
            </View>
          </View>
        </View>
        */}
      </TouchableOpacity>
    </View>
    )
  };
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList style={{width: '100%'}}
        data={data}
        renderItem={renderItem}
        refreshing = {refreshing}
        onRefresh = {listRefresh}
        keyExtractor={item => item.cuponlargo}
        extraData={isAct}
        ItemSeparatorComponent={() => (
          <View
            style={{
              // backgroundColor: 'gray',
              height: 1,
            }}
          />
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              // backgroundColor: 'gray',
              height: 1,
            }}
          />
        )}
        ListFooterComponent={() => (
          <View
            style={{
              // backgroundColor: 'gray',
              height: 1,
            }}
          />
        )}
        ListEmptyComponent={() => (
          <Aviso/>
          /*
          <View style={styles.container}>
            <Text style={styles.text}>
              No tienes cupones para canjear, puedes obtener recompensas consumiendo en cualquiera de los comercios afiliados y registrando tu compra o utilizando alguna de nuestras tarjetas de compras o de regalo, visita  https://app.cash-flag.com para ver los comercios afiliados
            </Text>
          </View>
          */
        )}
      />
      <TouchableOpacity 
        style={styles.btnContainer}
        onPress={() => {
          navigation.navigate('newCupon', {
            email: email,
            token: token,
            comercios: comercios,
            actlista: listRefresh
          });
        }}
      >
        <Text style={{fontWeight: 'bold', color: 'white'}}>Reclamar recompensa</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // imagepeq: {
  //   width: 214,
  //   height: 120
  // },
  // text: {
  //   fontSize: 20,
  //   textAlign: "center"
  // },
  parrafoSmall: {
    color: 'rgba(3,44,98,1)',
    marginTop: 30,
    width: '90%',
    fontSize: 20,
    textAlign: "center",
    fontWeight: 'bold'
  }
  // ,
  // pickerinput: {
  //   height: 40,
  //   width: 250,
  //   marginTop: 5,
  //   marginBottom: 15,
  //   borderRadius: 10,
  //   backgroundColor: 'lightgray',
  //   justifyContent: 'center'
  // },
  // modalViewAviso: {
  //   marginTop: 225,
  //   marginHorizontal: 5,
  //   marginBottom: 5,
  //   backgroundColor: "white",
  //   borderColor: "black",
  //   borderWidth: 1,
  //   borderStyle: "solid",
  //   borderRadius: 10,
  //   paddingTop: 15,
  //   paddingHorizontal: 15,
  //   paddingBottom: 10,
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2
  //   },
  //   shadowOpacity: 0.25,
  //   elevation: 5
  // }
});

module.exports = Cupones;