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

const NEWUSER_URL = 'https://app.cash-flag.com/apis/v1/socios/afiliacion';

const NewUserScreen = (params) => {
  const newUser = params.recNewUser;
  const volver = params.volver;
  const [txtUser, settxtUser] = useState('');
  const [txtNombres, settxtNombres] = useState('');
  const [txtApellidos, settxtApellidos] = useState('');
  const [txtTelefono, settxtTelefono] = useState('');
  const [txtPass, settxtPass] = useState('');
  const [txtPas2, settxtPas2] = useState('');
  const [txtDesafio, settxtDesafio] = useState('');
  const [txtRespuesta, settxtRespuesta] = useState('');

  const registro = () => {
    if(
      txtUser!='' && 
      txtNombres!='' && 
      txtApellidos!='' && 
      txtTelefono!='' && 
      txtPass!='' && 
      txtPas2!='' && 
      txtDesafio!='' && 
      txtRespuesta!='') {
      if(txtPass!=txtPas2) {
        Alert.alert(
          'Ups, algo salió mal',
          'El password no coincide'
        )
      } else {
        let datos = new FormData();
        datos.append("email",     txtUser);
        datos.append("nombres",   txtNombres);
        datos.append("apellidos", txtApellidos);
        datos.append("telefono",  txtTelefono);
        datos.append("password",  txtPass);
        datos.append("pregunta",  txtDesafio);
        datos.append("respuesta", txtRespuesta);

        fetch(NEWUSER_URL, {
          method: 'POST',
          body: datos
        })
        .then((response) => response.json())
        .then((responseData) => {
          if(responseData.exito=="SI") {
            Alert.alert(
              "Exito",
              responseData.mensaje
            );
            volver();
          } else {
            Alert.alert(
              "Ups, algo salió mal",
              responseData.mensaje
            );
          }
        });
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
        <Text style={styles.text}>
          Afiliación de nuevos usuarios
        </Text>
        <View style={{alignItems: 'center'}}>
          <Text style={{textAlign: "center"}}>
            Correo electrónico
          </Text>
          <TextInput style={styles.textinput}
            onChangeText={settxtUser}
            value={txtUser}
            editable={true}
            maxLength={50}
            placeholder='Correo electrónico'
          />
          <Text>
            Nombres
          </Text>
          <TextInput style={styles.textinput}
            onChangeText={settxtNombres}
            value={txtNombres}
            editable={true}
            maxLength={50}
            placeholder='Nombres'
          />
          <Text>
            Apellidos
          </Text>
          <TextInput style={styles.textinput}
            onChangeText={settxtApellidos}
            value={txtApellidos}
            editable={true}
            maxLength={50}
            placeholder='Apellidos'
          />
          <Text>
            Teléfono
          </Text>
          <TextInput style={styles.textinput}
            onChangeText={settxtTelefono}
            value={txtTelefono}
            editable={true}
            maxLength={12}
            placeholder='584XXXXXXXXX'
          />
          <Text>
            Password
          </Text>
          <TextInput style={styles.textinput}
            onChangeText={settxtPass}
            value={txtPass}
            editable={true}
            maxLength={50}
            secureTextEntry={ true}
            placeholder='****'
          />
          <Text>
            Confirme su Password
          </Text>
          <TextInput style={styles.textinput}
            onChangeText={settxtPas2}
            value={txtPas2}
            editable={true}
            maxLength={50}
            secureTextEntry={ true}
            placeholder='****'
          />
          <Text>
            Pregunta de desafío (para cambiar password)
          </Text>
          <TextInput style={styles.textinput}
            onChangeText={settxtDesafio}
            value={txtDesafio}
            editable={true}
            maxLength={50}
            placeholder='Pregunta de desafío'
          />
          <Text>
            Respuesta a la pregunta de desafío
          </Text>
          <TextInput style={styles.textinput}
            onChangeText={settxtRespuesta}
            value={txtRespuesta}
            editable={true}
            maxLength={50}
            secureTextEntry={ true}
            placeholder='****'
          />
        </View>
        <View style={{alignItems: "center"}}>
        </View>

        <View style={{
          flexDirection: "row",
          wdith: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <TouchableOpacity 
            style={styles.boton}
            onPress={registro}
          >
            <Text style={styles.textoboton}>
              Enviar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.boton}
            onPress={volver}
          >
            <Text style={styles.textoboton}>
              Volver
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
    marginTop: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', 
    paddingVertical: 10
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

module.exports = NewUserScreen;