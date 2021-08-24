import React, { Component, useState, useEffect } from 'react';
import { 
  View, 
  Text,
  TouchableOpacity, 
  FlatList, 
  Image,
  Alert } from 'react-native';

const PRODUCTS_URL = 'https://app.cash-flag.com/apis/v1/socios/productos?';
  
const styles = require('./styles');

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
          <View style={styles.container}>
            <Text style={styles.text}>
              No tienes cupones para canjear, puedes obtener recompensas consumiendo en cualquiera de los comercios afiliados y registrando tu compra o utilizando alguna de nuestras tarjetas de compras o de regalo, visita  https://app.cash-flag.com para ver los comercios afiliados
            </Text>
          </View>
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

module.exports = Cupones;