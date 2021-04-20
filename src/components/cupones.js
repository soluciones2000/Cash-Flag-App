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

const Cupones = (params) => {
  const navigation = params.navigation;
  const [data, setData] = useState(params.cupones);

  return (
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
}

module.exports = Cupones;