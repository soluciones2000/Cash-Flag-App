import React, { Component, useState, useEffect } from 'react';
import { 
  View, 
  Text,
  TouchableOpacity, 
  FlatList, 
  Image } from 'react-native';

const styles = require('./styles');

const Cupones = (params) => {
  const navigation = params.navigation;
  const email = params.email;
  const token = params.token;
  const [data, setData] = useState(params.cupones);
  const [isAct, setAct] = useState(false);

  const actualizalista = (index) => {
    let xaCupones = data;
    xaCupones.splice(index,1);
    setData(xaCupones);
    setAct(!isAct);
  };

  const renderItem = ({item, index}) => {    
    return (
    <View style={{
        backgroundColor: 'lightblue',
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
            qrcode: item.qrcode,
            email: email,
            token: token,
            actlista: actualizalista,
            indice: index
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
      </TouchableOpacity>
    </View>
    )
  };
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList style={{width: '100%'}}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.cuponlargo}
        extraData={isAct}
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
              No tienes cupones para canjear, puedes obtener recompensas consumiendo en cualquiera de los comercios afiliados y registrando tu compra o utilzando alguna de nuestras tarjetas prepagadas o de regalo, visita  https://app.cash-flag.com para ver los comercios afiliados
            </Text>
          </View>
        )}
      />
    </View>
  )
}

module.exports = Cupones;