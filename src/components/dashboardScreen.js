'use strict'

import React, { Component, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  ImageBackground
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const styles = require('./styles');

const Dashboard = (params) => {
  const navigation = params.navigation;

  const imgprov = require('../../assets/img/logoclubd.png');
  const msjtipo = 'Cliente Frecuente';

  const idsocio = params.idsocio;
  const numcard = params.card;

  const numcupones = params.numcupones;
  const numprepusd = params.numprepusd;
  const numprepbs  = params.numprepbs;
  const numgiftusd = params.numgiftusd;
  const numgiftbs  = params.numgiftbs;
  /*
  const card = params.card;
  const numcard = params.card.substr(0,4)+' '+params.card.substr(4,4)+' '+params.card.substr(8,4);
  */
  const nombres = params.nombre;
  const validez = "Miembro desde: "+params.validez;
  const icongft = params.card;

  const colortext  = 'rgba(244,228,142,255)';
  const colorborde = 'rgba(244,228,142,255)';
  const image = require('../../assets/img/card-bg-blue.png');

  return (
    <View style={stylesLocal.container}>
      <TouchableOpacity onPress={() =>
        navigation.navigate('QrScreen', {
          idsocio: idsocio,
          card: numcard,
          nombre: nombres
        })
      }>
      <View style={{
        width: 310,
        height: 195,
        marginHorizontal: 'auto',
        marginTop: '10%',
        borderRadius: 13,
        flexDirection: 'column',
        justifyContent: "space-between",
        borderColor: colorborde,
        borderWidth: 2,
        borderStyle: "solid"
      }}>
        <ImageBackground 
          source={image}
          style={{
            width: '100%',
            height: '100%'
          }}
          imageStyle={{
            resizeMode: 'cover',
            borderRadius: 9
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
              source={imgprov}
            />
          </View>
          <View style={{
            alignItems: "flex-end",
            marginRight: 7.5,
            top: -10            
          }}>
            <Text allowFontScaling={false} style={{color: colortext, fontSize: 13}}>{msjtipo}</Text>
            <Text allowFontScaling={false} style={{color: colortext, fontWeight: 'bold', fontSize: 16}}>{numcard}</Text>
            <Text allowFontScaling={false} style={{color: colortext, fontSize: 13}}>{nombres}</Text>
            <Text allowFontScaling={false} style={{color: colortext, fontSize: 10}}>{validez}</Text>
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: "flex-end",
            height: '40%'
          }}>
            <View style={{
              width: '20%',
              height: '100%',
              right: 5,
              bottom: 5
              
            }}>
              <QRCode
                value={idsocio}
                size={50}
                color='black'
                Background='white'
              />
            </View>
          </View>
        </View>
        </ImageBackground>
      </View>
      </TouchableOpacity>
      <Text allowFontScaling={false} style={{
        marginTop: 0.5,
        fontSize: 9
      }}>
        Tarjeta generada por SGC Consultores C.A. - www.sgc-consultores.com.ve
      </Text>
      <View style={{ paddingVertical: 20, width: '100%' }}>
        <Text
          allowFontScaling={false} 
          style={{ 
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
            width: '100%',
            marginTop: 10
          }}
        >
          Saldos consolidados
        </Text>
        <View style={{
          wdith: '100%',
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}>
          <TouchableOpacity style={{
            backgroundColor: 'rgba(244,228,142,255)',
            width: '80%',
            height: 90,
            padding: 10,
            marginVertical: 10,
            borderRadius: 10,
            justifyContent: 'center'
          }}>
            <Text
              allowFontScaling={false} 
              style={{ 
                fontWeight: 'bold',
                fontSize: 15,
                textAlign: 'center',
                width: '100%',
                color: 'black'
              }}
            >
              Recompensas reclamadas:{'\n'}
              {numcupones}
              {/* {'\n'}{'\n'}
              Pulsa para ir a la cuponera */}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: 'rgba(3,44,98,1)',
            width: '80%',
            height: 180,
            padding: 10, 
            marginVertical: 10,
            borderRadius: 10,
            justifyContent: 'center'
          }}>
            <Text
              allowFontScaling={false} 
              style={{ 
                fontWeight: 'bold',
                fontSize: 15,
                textAlign: 'center',
                width: '100%',
                color: 'white'
              }}
            >
              Tarjetas de compras:{'\n'}
              {numprepusd} USD{'\n'}
              {numprepbs} Bs.{'\n'}{'\n'}
              Tarjetas de regalo:{'\n'}
              {numgiftusd} USD{'\n'}
              {numgiftbs} Bs.
              {/* {'\n'}{'\n'} */}
              {/* Pulsa para ir al tarjetero */}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const stylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', 
    paddingVertical: 10
  }
});

module.exports = Dashboard;