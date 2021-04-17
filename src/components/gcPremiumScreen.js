'use strict'

import React, { Component, useState } from 'react';
import {
   View,
   Image,
   TouchableOpacity,
   Text,
   TextInput,
   Modal,
   Alert
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

const styles = require('./styles');

const GcPremiumCard = (params) => {
  const [txtMonto, settxtMonto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const imgprov = params.route.params.logo;
  const msjtipo = 'Tarjeta de regalo';
  const card = params.route.params.card;
  const numcard = params.route.params.card.substr(0,4)+' '+params.route.params.card.substr(4,4)+' '+params.route.params.card.substr(8,4)+' '+params.route.params.card.substr(12,4);
  const nombres = params.route.params.nombre;
  const validez = "Valida hasta: "+params.route.params.validez;
  const saldo = params.route.params.saldo;
  const moneda = params.route.params.moneda;
  const simbolo = params.route.params.simbolo;

  const code_qr = 'https://app.cash-flag.com/card/premium.png';
  const dibujomoneda = params.route.params.dibujomoneda;
  const icongft = 'https://app.cash-flag.com/img/gift-solid.png';

  const fondocard  = 'rgba(218,165,32,0.625)';
  const colortext  = 'black';
  const colorborde = 'black';

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <QRCode
              value={'{"t":"p","c":"'+card+'","m":'+txtMonto+'}'}
              size={250}
              color='black'
              Background='white'
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
                setModalVisible(!modalVisible);
                }
              }
            >
              <Text style={{
                color:"white",
                fontSize: 16
              }}>
                Cerrar QR
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <LinearGradient
        // Button Linear Gradient
        colors={['#C09E70', 'white', '#C09E70']}
        style={{
          width: 310,   
          height: 195,
          borderRadius: 13,
          borderColor: colorborde,
          borderWidth: 2,
          borderStyle: "solid",
          marginTop: '10%',
          marginHorizontal: 'auto',
          flexDirection: 'column',
          justifyContent: "space-between"
        }}
      >

        <View style={{
          borderColor: colorborde,
          borderWidth: 2,
          borderStyle: "solid",
          margin: 5,
          borderRadius: 9,
          height: '94%'
        }}>
          <View style={{
            width: '30%',
            height: '30%',
            top: 5,
            left: 5
          }}>
            <Image style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain'
              }}
              source={{uri: imgprov}}
            />
          </View>
          <View style={{
            alignItems: "flex-end",
            marginRight: 7.5,
            top: -10            
          }}>
            <Text style={{color: colortext, fontSize: 13}}>{msjtipo}</Text>
            <Text style={{color: colortext, fontSize: 16, fontWeight: 'bold'}}>{numcard}</Text>
            <Text style={{color: colortext, fontSize: 13}}>{nombres}</Text>
            <Text style={{color: colortext, fontSize: 10}}>{validez}</Text>
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: "space-between",
            marginTop: '-3%',
            height: '40%'
          }}>
            <View style={{
              width: '30%',
              height: '90%',
              marginBottom: '5%',
              marginLeft: '3%',
              alignItems: 'center'
            }}>
              <Text style={{ fontSize: 40, fontWeight: "bold" }}>
                {simbolo}
              </Text>
            </View>
            <View style={{
              width: '20%',
              height: '50%',
              top: -105,
              left: 90
            }}>
              <Image style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain'
              }}
                source={{uri: code_qr}}
              />
            </View>
            <View style={{
              width: '15%',
              height: '90%',
              marginRight: '5%',
              marginBottom: '2%'
            }}>
              <Image style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain'
              }}
                source={{uri: icongft}}
              />
            </View>
          </View>
        </View>

      </LinearGradient>

      <Text style={{
        marginTop: 0.5,
        fontSize: 9
      }}>
        Tarjeta generada por SGC Consultores C.A. - www.sgc-consultores.com.ve
      </Text>
      <Text style={{
        marginTop: 10,
        fontSize: 24
      }}>
        Saldo:
        <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
          {saldo} {simbolo}
        </Text>
      </Text>
      <View style={{
        flexDirection: 'row', 
        width: "100%",
        justifyContent: 'center',
        alignContent: "space-between"
      }}>
        <Text style={{
          fontSize: 16,
          height: 40,
          marginTop: 18,
          marginRight: 5,
          textAlign: "left"
        }}>
          Monto a pagar:
        </Text>
        <TextInput 
          style={{
            fontSize: 16,
            height: 40,
            width: 150,
            marginTop: 10,
            paddingRight: 5,
            borderRadius: 10,
            backgroundColor: 'lightgray',
            textAlign: 'right'
          }}
          onChangeText={settxtMonto}
          value={txtMonto}
          editable={true}
          maxLength={20}
          placeholder='0.00'
         />
      </View>
      <View style={{
        wdith: '100%',
        textAlign: 'left',
        marginHorizontal: 10,
        marginBottom: 20
      }}>
        <Text style={{fontSize: 13}}>
          Opciones para enviar la transacción:
        </Text>
        <Text style={{fontSize: 13}}>
          1) Mostrar el código QR (el comerciante escanea)
        </Text>
        <Text style={{fontSize: 13}}>
          2) Escanear el código QR del comercio
        </Text>      
      </View>
      <View style={{
        flexDirection: "row",
        wdith: '100%'
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
            if(saldo>txtMonto && txtMonto>0) {
              setModalVisible(true)
            } else {
              if(txtMonto<=0) {
                Alert.alert(
                  "Ups, parece que algo salió mal",
                  "El Monto de la transacción debe ser mayor que cero"
                );
              } else {
                Alert.alert(
                  "Ups, parece que algo salió mal",
                  "El saldo de la tarjeta no es suficiente para esta transacción"
                );
              }
            }
          }}
        >
          <Text style={styles.textoboton}>
            Mostrar QR
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
            if(saldo>txtMonto && txtMonto>0) {
              setModalVisible(true)
            } else {
              if(txtMonto<=0) {
                Alert.alert(
                  "Ups, parece que algo salió mal",
                  "El Monto de la transacción debe ser mayor que cero"
                );
              } else {
                Alert.alert(
                  "Ups, parece que algo salió mal",
                  "El saldo de la tarjeta no es suficiente para esta transacción"
                );
              }
            }
          }}
        >
          <Text style={styles.textoboton}>
            Escanear QR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
   )
}

module.exports = GcPremiumCard;