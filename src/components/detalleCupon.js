'use strict'

import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

const styles = require('./styles');

const detallecupon = (params) => {
   const logoproveedor = params.route.params.logoproveedor;
   const idproveedor = params.route.params.idproveedor;
   const cuponlargo = params.route.params.cuponlargo;
   const barcode       = params.route.params.barcode;
   const qrcode        = params.route.params.qrcode;
   return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <View style={{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center'
         }}
         >
            <View>
               <Image
                  style={{width: 160, height: 160, resizeMode: 'contain'}}
                  source={{uri: logoproveedor}}
               />
            </View>
            <View style={{marginTop: 10}}>
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
                     Alert.alert(
                        "Sorry!",
                        "Esta opción está momentaneamente inhabilitada en la versión movil, puedes transferirlo desde la versión WEB en app.cash-flag.com"
                     );
                     params.navigation.navigate('Cupones');
                  }}
               >
                  <Text style={styles.textoboton}>
                     Transferir a otro socio
                  </Text>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   )
}

module.exports = detallecupon;