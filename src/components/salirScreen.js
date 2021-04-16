'use strict'

import React, { Component } from 'react';
import {
   View,
   Text,
   TouchableHighlight,
} from 'react-native';

const styles = require('./styles');

const salir = (params) => {
   console.log(params);
   return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <Text style={{textAlign: 'center', fontSize: 25}}>
            {/* Salir {params.objeto4} */}
            Salir
         </Text>
         <TouchableHighlight style={styles.boton}>
            <Text style={styles.textoboton}>
               Salir
            </Text>
         </TouchableHighlight>
      </View>
   )
}

module.exports = salir;