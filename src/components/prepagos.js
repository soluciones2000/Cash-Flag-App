import React, { Component, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableHighlight, 
  TouchableOpacity, 
  FlatList, 
  Alert, 
  Image } from 'react-native';

const styles = require('./styles');

const Prepagos = (params) => {
  const navigation = params.navigation;
  const socio = params.socio;
  const [data, setData] = useState(params.prepagos);
  const [isRender, setIsrender] = useState(false);

  const actualizasaldo = (saldo,index) => {
    let xaPrepagos = data;
    xaPrepagos[index].saldo = saldo;
    setData(xaPrepagos);
    setIsrender(!isRender)
  };

  return (
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
        data={data}
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
        keyExtractor={(item) => item.tarjeta}
        extraData={data}
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
}

module.exports = Prepagos;