'use strict'

import React, { Component, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native';

const styles = require('./styles');

const TRANSF_URL = 'https://app.cash-flag.com/apis/v1/socios/transfierecupon';

const Detallecupon = (params) => {
  const actualizalista = params.route.params.actlista;
  const indice = params.route.params.indice;
  const email = params.route.params.email;
  const token = params.route.params.token;
  const [txtEmail, settxtEmail] = useState('')
  const [modalVisible, setModalVisible] = useState(false);

   const logoproveedor = params.route.params.logoproveedor;
   const idproveedor = params.route.params.idproveedor;
   const cuponlargo = params.route.params.cuponlargo;
   const barcode       = params.route.params.barcode;
   const qrcode        = params.route.params.qrcode;
   return (
      <ScrollView style={{ 
        flex: 1, 
        justifyContent: "center", 
        alignItems: 'center'
      }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalViewTransfCupon}>
            <Text style={styles.text}>
                E-mail del destinatario
            </Text>
            <TextInput style={styles.textinput}
                onChangeText={settxtEmail}
                value={txtEmail}
                editable={true}
                maxLength={50}
                placeholder='Correo electrónico'
            />
              <TouchableOpacity 
                style={{
                  height: 30,
                  width: 135,
                  marginTop: 10,
                  backgroundColor: 'blue',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10
                }}
                onPress={() => {
                  let datos = new FormData();
                  datos.append("emailsocio",   email);
                  datos.append("token",        token);
                  datos.append("emaildestino", txtEmail);
                  datos.append("cuponlargo",   cuponlargo);

                  fetch(TRANSF_URL, {
                    method: 'POST',
                    body: datos
                  })
                  .then((response) => response.json())
                  .then((responseData) => {
                    if(responseData.exito=="SI") {
                      Alert.alert(
                        "Éxito",
                        responseData.mensaje
                      );
                      settxtEmail('');
                      actualizalista(cuponlargo,indice);
                      params.navigation.navigate('Cupones');
                    } else {
                      Alert.alert(
                        "Ups, algo salió mal",
                        responseData.mensaje
                      );
                    }
                  });
                  setModalVisible(!modalVisible);
                  }
                }
              >
                <Text style={{
                  color:"white",
                  fontSize: 16
                }}>
                  Enviar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={{ 
            flex: 1, 
            justifyContent: "flex-start", 
            alignItems: 'center'
         }}
         >
            <View>
               <Image
                  style={{width: 140, height: 140, resizeMode: 'contain'}}
                  source={{uri: logoproveedor}}
               />
            </View>
            <View style={{marginTop: 5}}>
               <Image
                  style={{width: 325, height: 50}}
                  source={{uri: barcode}}
               />
            </View>
            <View style={{margintTop: 5, marginBottom: 30}}>
               <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {cuponlargo}
               </Text>
            </View>
            <View style={{margintTop: 40}}>
               <Image
                  style={{height: 250, width: 250, resizeMode: 'contain', borderColor: 'black', borderWidth: 1}}
                  source={{uri: qrcode}}
               />
            </View>
            <View style={{margintTop: 50}}>
               <TouchableOpacity 
                  style={styles.boton}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
               >
                  <Text style={styles.textoboton}>
                     Transferir a otro socio
                  </Text>
               </TouchableOpacity>
            </View>
         </View>
      </ScrollView>
   )
}

module.exports = Detallecupon;