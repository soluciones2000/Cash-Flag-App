'use strict'

import React, {useState} from 'react';
import { WebView } from 'react-native-webview';

const onMessage = (event) => {
}

const Prueba = () => {
  return <WebView onMessage={} source={{ uri: 'https://app.cash-flag.com/apis/prueba.html' }} />;
}

module.exports = Prueba;