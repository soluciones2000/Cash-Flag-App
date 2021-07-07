'use strict'

import React, {useState} from 'react';
import {
  StyleSheet, 
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions
} from 'react-native';
import { Picker} from '@react-native-picker/picker';

const CUPON_URL = "https://app.cash-flag.com/apis/v1/socios/generacupon?";

const NewCupon = (params) => {
  const navigation = params.navigation;
  const email = params.route.params.email;
  const token = params.route.params.token;
  const comercios = params.route.params.comercios;
  const actLista = params.route.params.actlista;

  const [txtComercio, settxtComercio] = useState(0);
  const [txtDocumento, settxtDocumento] = useState(null);
  const [txtMonto, settxtMonto] = useState(null);

  return (
    <View style={styles.container}>
      <View style={{alignItems: "center"}}>
        <Image style={styles.imagepeq}
          source={{uri: 'https://app.cash-flag.com/img/logoclub.png'}}
        />
      </View>
      <Text allowFontScaling={false} style={styles.text}>
        Comercio
      </Text>
      <View style={styles.pickerinput}>
        <Picker
          style={styles.pickerinputdetalle}
          selectedValue={txtComercio}
          onValueChange={(itemValue) => {
            settxtComercio(itemValue);
          }}
          prompt={'Seleccione comercio'}
        >
          <Picker.Item label='Seleccione' value={0} />
          {
            comercios.map( (c) => (
              <Picker.Item label={c.nombrecomercio} value={c.idcomercio} />
            ))
          }
        </Picker>
      </View>

      <Text allowFontScaling={false} style={styles.text}>
        Documento de compra
      </Text>
      <TextInput 
        style={{
          height: 40,
          width: 250,
          marginTop: 5,
          marginBottom: 15,
          borderRadius: 10,
          paddingHorizontal: 10,
          backgroundColor: 'lightgray',
          textAlign: 'center'
        }}
        onChangeText={settxtDocumento}
        value={txtDocumento}
        editable={true}
        maxLength={20}
        placeholder='Documento de compra'
      />

      <Text allowFontScaling={false} style={styles.text}>
        Monto de la compra
      </Text>
      <TextInput 
        style={{
          height: 40,
          width: 250,
          marginTop: 5,
          marginBottom: 15,
          borderRadius: 10,
          paddingHorizontal: 10,
          backgroundColor: 'lightgray',
          textAlign: 'right'
        }}
        onChangeText={settxtMonto}
        value={txtMonto}
        editable={true}
        maxLength={20}
        placeholder='0.00'
      />
      <View style={{
        flexDirection: "row",
        wdith: '100%',
        marginBottom: 20
      }}>
        <TouchableOpacity 
          style={{
            height: 40,
            width: 135,
            backgroundColor: 'blue',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 5,
            borderRadius: 10
          }}
          onPress={() => {
            let xVar = 0;
            if(txtMonto==0 || txtMonto==null) { xVar = 3 }
            if(txtDocumento=="" || txtDocumento==null) { xVar = 2 }
            if(txtComercio==0) { xVar = 1 }
            if(xVar>0) {
              switch(xVar) {
                case 1:
                  Alert.alert(
                    "Ups, algo salió mal",
                    "Debes seleccionar un comercio"
                  );              
                break;
                case 2:
                  Alert.alert(
                    "Ups, algo salió mal",
                    "Debes indicar un número de documento para identificar la compra"
                  );              
                break;
                case 3:
                  Alert.alert(
                    "Ups, algo salió mal",
                    "Debes indicar un monto"
                  );              
                break;
              }
            } else {
              let datos = new FormData();
              datos.append("email",      email);
              datos.append("token",      token);
              datos.append("idcomercio", txtComercio);
              datos.append("factura",    txtDocumento);
              datos.append("monto",      txtMonto);

              fetch(CUPON_URL, {
                method: 'POST',
                body: datos
              })
              .then((response) => response.json())
              .then((responseData) => {
                if(responseData.exito=="SI") {
                  Alert.alert(
                    'éxito',
                    responseData.mensaje
                  );
                  settxtComercio(0);
                  settxtDocumento(null);
                  settxtMonto(null);
                  actLista();
                  navigation.popToTop();
                } else {
                  Alert.alert(
                    "Ups, algo salió mal",
                    responseData.mensaje
                  );
                }
              });
            }
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              color:"white",
              fontSize: 16
            }}
          >
            Enviar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{
            height: 40,
            width: 135,
            backgroundColor: 'blue',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 5,
            borderRadius: 10
          }}
          onPress={() => {
            settxtComercio(0);
            settxtDocumento(null);
            settxtMonto(null);
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              color:"white",
              fontSize: 16
            }}
          >
            Limpiar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagepeq: {
    width: 214,
    height: 120
  },
  text: {
    fontSize: 20,
    textAlign: "center"
  },
  pickerinput: {
    height: 40,
    width: 250,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    justifyContent: 'center'
  }
});

module.exports = NewCupon;