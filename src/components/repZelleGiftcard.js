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
   ActivityIndicator
} from 'react-native';

const ZELLE_URL   = "https://app.cash-flag.com/apis/net247/net247_zelleweb";
const REPORTE_URL = "https://app.cash-flag.com/apis/v1/socios/giftcard?";

const RepZelleGiftcard = (params) => {
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
   const actLista = params.route.params.actlista;

   const [referencia, setReferencia] = useState('');
   const [modalVisible, setModalVisible] = useState(false);

   let confirmacion = '';

   const procesapago = () => {
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
      datos.append("tipopago",     'efectivo');
      datos.append("menu",         'socio');
      datos.append("origen",       'zelle');
      datos.append("referencia",   confirmacion);
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
            mensaje += "\nSu nuevo saldo es de: "+responseData.disponible;
            Alert.alert(
               responseData.mensaje,
               mensaje
            );
            setReferencia('');
            actLista();
            setModalVisible(false);
            navigation.popToTop();
         } else {
            Alert.alert(
               "Ups, algo salió mal",
               responseData.mensaje
            );
         }
      });
   };

   return (
      <View style={styles.container}>
         <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
               setModalVisible(!modalVisible);
            }}
         >
            <View style={{flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center"}}>
               <ActivityIndicator size="large" color="white" />
            </View>
         </Modal>
         <View style={{alignItems: "center"}}>
            <Image style={styles.imagepeq}
               source={{uri: 'https://app.cash-flag.com/img/logoclub.png'}}
            />
            </View>
            <Text allowFontScaling={false} style={styles.text}>
               Referencia (Últimos 5 digitos){"\n"}Respetando mayúsculas y minúsculas
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
               maxLength={5}
               placeholder='Referencia'
            />
            <View style={{
               flexDirection: "row",
               width: '100%',
               marginBottom: 20,
               justifyContent: 'center'
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
                  setModalVisible(true);
                  let datos = new FormData();
                  datos.append("monto",      monto);
                  datos.append("referencia", referencia);

                  fetch(ZELLE_URL, {
                     method: 'POST',
                     body: datos
                  })
                  .then((response) => response.json())
                  .then((responseData) => {
                     if(responseData.exito=="SI") {
                        confirmacion = responseData.confirmacion;
                        procesapago();
                     } else {
                        Alert.alert(
                           "Ups, algo salió mal",
                           responseData.mensaje
                        );
                        setModalVisible(false);
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
                  // setOrigen('');
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

module.exports = RepZelleGiftcard;