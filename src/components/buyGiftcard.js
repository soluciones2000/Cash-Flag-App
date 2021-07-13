'use strict'

import React, {useState} from 'react';
import {
   StyleSheet, 
   ScrollView,
   View,
   Image,
   Text,
   TextInput,
   TouchableOpacity,
   Alert
} from 'react-native';

const BuyGiftcard = (params) => {
  const navigation = params.navigation;
  const email = params.route.params.email;
  const token = params.route.params.token;
  const comercios = params.route.params.comercios;
  const premium = params.route.params.premium;
  const actLista = params.route.params.actlista;
  const [txtNombres, settxtNombres] = useState('');
  const [txtApellidos, settxtApellidos] = useState('');
  const [txtTelefono, settxtTelefono] = useState('');
  const [txtEmail, settxtEmail] = useState('');
  const [txtMsg, settxtMsg] = useState('');

  const validaciones = () => {
    if(txtNombres!='' && 
      txtApellidos!='' && 
      txtTelefono!='' && 
      txtEmail!='') {
      if(premium=="") {
        navigation.navigate('detGiftcardLocal',{
          email: email,
          token: token,
          comercios: comercios,
          nombres: txtNombres,
          apellidos: txtApellidos,
          telefono: txtTelefono,
          correo: txtEmail,
          mensaje: txtMsg,
          actlista: actLista
        })
      } else {
        navigation.navigate('detGiftcardPremium',{
          email: email,
          token: token,
          comercios: comercios,
          nombres: txtNombres,
          apellidos: txtApellidos,
          telefono: txtTelefono,
          correo: txtEmail,
          mensaje: txtMsg,
          actlista: actLista
        })
      }
    } else {
      Alert.alert(
        'Ups, algo salió mal',
        'No se pueden dejar campos en blanco'
      )
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{
        width: '100%'
      }}>
        <View style={{alignItems: "center"}}>
          <Image style={styles.imagepeq}
            source={{uri: 'https://app.cash-flag.com/img/logoclub.png'}}
          />
        </View>
        <Text allowFontScaling={false} style={styles.text}>
          Datos del beneficiario
        </Text>
        <View style={{alignItems: 'center'}}>
          <Text allowFontScaling={false} style={{textAlign: "center"}}>
            Nombres
          </Text>
          <TextInput style={styles.textinput}
            onChangeText={settxtNombres}
            value={txtNombres}
            editable={true}
            maxLength={50}
            placeholder='Nombres del beneficiario'
          />
          <Text allowFontScaling={false}>
            Apellidos
          </Text>
          <TextInput style={styles.textinput}
            onChangeText={settxtApellidos}
            value={txtApellidos}
            editable={true}
            maxLength={50}
            placeholder='Apellidos del beneficiario'
          />
          <Text allowFontScaling={false}>
            Teléfono
          </Text>
          <TextInput style={styles.textinput}
            onChangeText={settxtTelefono}
            value={txtTelefono}
            editable={true}
            maxLength={12}
            placeholder='584XX1234567'
          />
          <Text allowFontScaling={false}>
            Correo electrónico
          </Text>
          <TextInput style={styles.textinput}
            onChangeText={settxtEmail}
            value={txtEmail}
            editable={true}
            maxLength={50}
            placeholder='email del beneficiario'
          />
          <Text allowFontScaling={false}>
            Mensaje
          </Text>
          <TextInput style={styles.textinputmulti}
            onChangeText={settxtMsg}
            value={txtMsg}
            editable={true}
            maxLength={250}
            placeholder='Mensaje para el beneficiario'
            multiline
          />
        </View>

        <View style={{
          flexDirection: "row",
          wdith: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <TouchableOpacity 
            style={styles.boton}
            onPress={validaciones}
          >
            <Text allowFontScaling={false} style={styles.textoboton}>
              Continuar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.boton}
            onPress={ () => {
              settxtNombres('');
              settxtApellidos('');
              settxtTelefono('');
              settxtEmail('');
              settxtMsg('');
            }}
          >
            <Text allowFontScaling={false} style={styles.textoboton}>
              Limpiar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
   )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },  
    imagepeq: {
    width: 214,
    height: 120
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10
  },
  textinput: {
    height: 40,
    width: 250,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    textAlign: 'center'
  },
  textinputmulti: {
    height: 60,
    width: 250,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    paddingHorizontal: 10
  },
  boton: {
    width: 120,
    height: 40,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10
  },
  textoboton: {
    color:"white",
    fontSize: 20
  }
});

module.exports = BuyGiftcard;