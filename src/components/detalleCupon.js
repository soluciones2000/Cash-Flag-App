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
  console.log(params.route.params);

  const logoproveedor = params.route.params.logoproveedor;
  const idproveedor   = params.route.params.idproveedor;
  const cuponlargo    = params.route.params.cuponlargo;
  const premio        = params.route.params.premio;
  const vencimiento   = params.route.params.vencimiento;
  const proveedor     = params.route.params.proveedor;
  const barcode       = params.route.params.barcode;
  const qrcode        = params.route.params.qrcode;
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: "center", 
      alignItems: 'center'
    }}>
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
              height: 140,
              marginVertical: 5
          }}>
            <Image
              style={{width: 140, height: 140, resizeMode: 'contain'}}
              source={{uri: logoproveedor}}
            />
            <Text 
              allowFontScaling={false} 
              style={{
                fontSize: 30, 
                color: 'white',
                width: 160, 
                height: 140, 
                fontWeight: 'bold', 
                justifyContent: "center", 
                alignItems: 'center',
                textAlignVertical: 'center',
                textAlign: 'center'
              }}
            >
              {premio}
            </Text>
          </View>
        </View>
        <View style={{
          width: '100%',
          justifyContent: "center", 
          alignItems: 'center',
          marginVertical: 5
        }}>
          <Image
            style={{width: '100%', height: 50}}
            source={{uri: barcode}}
          />
        </View>
        <View style={{margintVertical: 5}}>
          <Text allowFontScaling={false} style={{fontSize: 20, fontWeight: 'bold'}}>
            {cuponlargo}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            marginVertical: 5
          }}
        >
          <Text 
            allowFontScaling={false} 
            style={{
              fontSize: 15, 
              color: 'black',
              width: 160, 
              fontWeight: 'bold', 
              justifyContent: "center", 
              alignItems: 'center',
              textAlignVertical: 'center',
              textAlign: 'center'
            }}
          >
            {proveedor}{'\n'}{'\n'}
            Fecha de vencimiento:{'\n'}{vencimiento}
          </Text>
          <Image
            style={{
              height: 120,
              width: 120,
              resizeMode: 'contain',
              borderColor: 'black',
              borderWidth: 1
            }}
            source={{uri: qrcode}}
          />
        </View>
      </View>
      <View style={{marginTop: 40}}>
        <TouchableOpacity 
          style={styles.boton}
          onPress={() => {
            setModalVisible(!modalVisible);
        }}>
          <Text allowFontScaling={false} style={styles.textoboton}>
            Transferir a otro socio
          </Text>
        </TouchableOpacity>
      </View>
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
                    actualizalista(indice);
                    params.navigation.navigate('Cupones');
                  } else {
                    Alert.alert(
                      "Ups, algo salió mal",
                      responseData.mensaje
                    );
                  }
                });
                setModalVisible(!modalVisible);
              }}
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
    </View>
  )
}

module.exports = Detallecupon;