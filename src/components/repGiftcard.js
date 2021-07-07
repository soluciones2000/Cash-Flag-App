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

const REPORTE_URL = "https://app.cash-flag.com/apis/v1/socios/giftcard?";

const RepGiftcard = (params) => {
  const navigation = params.navigation;
  const email = params.route.params.email;
  const token = params.route.params.token;
  const comercio = params.route.params.comercio;
  const divisa = params.route.params.divisa;
  const monto = params.route.params.monto;
  const premium = params.route.params.premium;
  const nombres = params.route.params.nombres;
  const apellidos = params.route.params.apellidos;
  const telefono = params.route.params.telefono;
  const correo = params.route.params.correo;
  const mensaje = params.route.params.mensaje;

  const [origen, setOrigen] = useState('');
  const [referencia, setReferencia] = useState('');

  return (
    <View style={styles.container}>
      <View style={{alignItems: "center"}}>
        <Image style={styles.imagepeq}
          source={{uri: 'https://app.cash-flag.com/img/logoclub.png'}}
        />
      </View>
      <Text allowFontScaling={false} style={styles.text}>
        Cuenta de origen
      </Text>
      <TextInput
        style={{
          height: 40,
          width: 250,
          marginTop: 5,
          marginBottom: 15,
          borderRadius: 10,
          backgroundColor: 'lightgray',
          textAlign: 'center'
        }}
        onChangeText={setOrigen}
        value={origen}
        editable={true}
        maxLength={50}
        placeholder='Cuenta, usuario o teléfono'
      />
      <Text allowFontScaling={false} style={styles.text}>
        Referencia
      </Text>
      <TextInput
        style={{
          height: 40,
          width: 250,
          marginTop: 5,
          marginBottom: 15,
          borderRadius: 10,
          backgroundColor: 'lightgray',
          textAlign: 'center'
        }}
        onChangeText={setReferencia}
        value={referencia}
        editable={true}
        maxLength={50}
        placeholder='Número de referencia'
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
            let datos = new FormData();
            datos.append("emailsocio",   email);
            datos.append("token",        token);
            datos.append("idcomercio",   comercio);
            datos.append("nombres",      nombres);
            datos.append("apellidos",    apellidos);
            datos.append("telefono",     telefono);
            datos.append("email",        correo);
            datos.append("txtemail",     mensaje);
            datos.append("moneda",       divisa);
            datos.append("monto",        monto);
            datos.append("premium",      premium);
            datos.append("tipopago",     'transferencia');
            datos.append("menu",         'socio');
            datos.append("origen",       origen);
            datos.append("referencia",   referencia);
            datos.append("cardcashflag", '');

            fetch(REPORTE_URL, {
              method: 'POST',
              body: datos
            })
            .then((response) => response.json())
            .then((responseData) => {
              if(responseData.exito=="SI") {
                let nuevosaldo = responseData.disponible+responseData.pendiente;
                let mensaje  = "Número de tarjeta: "+responseData.card;
                mensaje += "\nSu saldo actual es de: "+responseData.disponible;
                mensaje += "\nPor confirmar: "+responseData.pendiente;
                mensaje += "\n\nAl confirmar la transacción su nuevo saldo será de: "+nuevosaldo;
                Alert.alert(
                  responseData.mensaje,
                  mensaje
                );
                setOrigen('');
                setReferencia('');
                navigation.popToTop();
              } else {
                Alert.alert(
                  "Ups, algo salió mal",
                  responseData.mensaje
                );
              }
            });
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
            marginRight: 5,
            borderRadius: 10
          }}
          onPress={() => {
            setOrigen('');
            setReferencia('');
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
   }
});

module.exports = RepGiftcard;