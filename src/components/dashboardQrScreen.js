'use strict'

import React, { Component, useState } from 'react';
import {
   View,
   StyleSheet,
   Image,
   Text,
   ImageBackground
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const styles = require('./styles');

const DashboardQrScreen = (params) => {
   console.log(params);
   const navigation = params.navigation;

   const imgprov = require('../../assets/img/logoclubd.png');

   const idsocio = params.route.params.idsocio;
   const numcard = params.route.params.card;
   const nombres = params.route.params.nombre;

   const colortext  = 'rgba(195,150,58,255)';
   const image = require('../../assets/img/card-bg-blue.png');

   return (
      <View style={stylesLocal.container}>
         <ImageBackground 
            source={image}
            style={{
               width: '100%',
               height: '100%'
            }}
            imageStyle={{
               resizeMode: 'cover',
            }}
         >
            <View style={{
               width: '100%',
               alignItems: 'center',
               justifyContent: 'flex-start'
            }}>
               <Image 
                  style={{
                     width: '50%',
                     height: '25%',
                     resizeMode: 'contain'
                  }}
                  source={imgprov}
               />
               <View style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  padding: 5,
                  backgroundColor: 'white'
               }}>
                  <QRCode
                     value={idsocio}
                     size={300}
                     color='black'
                     Background='white'
                     style={{
                        borderColor: 'black',
                        borderWidth: 1
                     }}
                  />
               </View>
               <Text
                  allowFontScaling={false}
                  style={{color: colortext, marginTop: 10, fontWeight: 'bold', fontSize: 35}}
               >
                  {numcard}
               </Text>
               <Text
                  allowFontScaling={false}
                  style={{color: colortext, marginTop: 10, fontSize: 30}}
               >
                  {nombres}
               </Text>
            </View>
         </ImageBackground>
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
      height: '100%'
   }
});

module.exports = DashboardQrScreen;