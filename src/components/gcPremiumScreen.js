'use strict'

import React, { Component, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Modal,
  Alert,
  Linking
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { BarCodeScanner } from 'expo-barcode-scanner';

const styles = require('./styles');

const GcPremiumCard = (params) => {
  const actualizasaldo = params.route.params.actsaldo;
  const indice = params.route.params.indice;
  const [txtMonto, settxtMonto] = useState(null);
  const [txtSaldo, settxtSaldo] = useState(params.route.params.saldo)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalQRVisible, setModalQRVisible] = useState(false);  
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const idproveedor = params.route.params.idproveedor;
  const origen = 'app';
  const token = '';

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

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let dataqr = JSON.parse(data);
		let datos = new FormData();
    datos.append("idproveedor", dataqr.idp);
    datos.append("monto",       txtMonto);
    datos.append("tarjeta",     card);
    datos.append("origen",      origen);
    datos.append("token",       token);

    fetch('https://app.cash-flag.com/php/enviacobrocardapp.php', {
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
        settxtSaldo(responseData.nuevosaldo);
        settxtMonto(0);
        actualizasaldo(responseData.nuevosaldo,indice);
      } else {
        Alert.alert(
          "Ups, algo salió mal",
          responseData.mensaje
        );
      }
    });
    setScanned(false);
    setModalQRVisible(!modalQRVisible);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso para acceder a la cámara</Text>;
  }

  if (hasPermission === false) {
    return <Text>Debe dar permiso para acceder a la cámara</Text>;
  }

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalQRVisible}
        onRequestClose={() => {
          setScanned(false);
          setModalQRVisible(!modalQRVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalQRView}>
            <View style={styles.lector}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
            <TouchableOpacity 
              style={{
                height: 30,
                width: 135,
                marginTop: 25,
                backgroundColor: 'blue',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10
              }}
              onPress={() => {
                setScanned(false);
                setModalQRVisible(!modalQRVisible);
                }
              }
            >
              <Text allowFontScaling={false} style={{
                color:"white",
                fontSize: 16
              }}>
                Cerrar Lector
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
              value={'{"t":"g","c":"'+card+'","m":'+txtMonto+',"f":"digital"}'}
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
              <Text allowFontScaling={false} style={{
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
            <Text allowFontScaling={false} style={{color: colortext, fontSize: 13}}>{msjtipo}</Text>
            <Text allowFontScaling={false} style={{color: colortext, fontSize: 16, fontWeight: 'bold'}}>{numcard}</Text>
            <Text allowFontScaling={false} style={{color: colortext, fontSize: 13}}>{nombres}</Text>
            <Text allowFontScaling={false} style={{color: colortext, fontSize: 10}}>{validez}</Text>
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
              <Text allowFontScaling={false} style={{ fontSize: 40, fontWeight: "bold" }}>
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

      <Text allowFontScaling={false} style={{
        marginTop: 0.5,
        fontSize: 9
      }}>
        Tarjeta generada por SGC Consultores C.A. - www.sgc-consultores.com.ve
      </Text>
      <Text allowFontScaling={false} style={{
        marginTop: 10,
        fontSize: 24
      }}>
        <Text allowFontScaling={false} style={{marginRight: 5}}>
          Saldo:
        </Text>
        <Text allowFontScaling={false} style={{marginLeft: 10, fontWeight: 'bold'}}>
          {txtSaldo} {simbolo}
        </Text>
      </Text>
      <View allowFontScaling={false} style={{
        flexDirection: 'row', 
        width: "100%",
        justifyContent: 'center',
        alignContent: "space-between"
      }}>
        <Text allowFontScaling={false} style={{
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
        <Text allowFontScaling={false} style={{fontSize: 13}}>
          Opciones para enviar la transacción:
        </Text>
        <Text allowFontScaling={false} style={{fontSize: 13}}>
          1) Mostrar el código QR (el comerciante escanea)
        </Text>
        <Text allowFontScaling={false} style={{fontSize: 13}}>
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
            if(txtSaldo>txtMonto && txtMonto>0) {
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
          <Text allowFontScaling={false} style={styles.textoboton}>
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
            if(txtSaldo>txtMonto && txtMonto>0) {
              setModalQRVisible(true)
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
          <Text allowFontScaling={false} style={styles.textoboton}>
            Escanear QR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
   )
}

module.exports = GcPremiumCard;