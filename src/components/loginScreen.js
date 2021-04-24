'use strict'

import React, {useState} from 'react';
import {
   StyleSheet, 
   View,
   Image,
   Text,
   TextInput,
   TouchableOpacity,
   Alert,
   Modal
} from 'react-native';

const HINT_URL = 'https://app.cash-flag.com/apis/v1/socios/hint';

const LoginScreen = (params) => {
  const actualizastate = params.datos;
  const resetPwd = params.resetPwd;
  const newUser = params.newUser;
  const [txtUser, settxtUser] = useState('');
  const [txtPass, settxtPass] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [txtEmail, settxtEmail] = useState('')

  return (
    <View style={styles.container}>
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
                Introduce tu email
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
                datos.append("email",   txtEmail);

                fetch(HINT_URL, {
                  method: 'POST',
                  body: datos
                })
                .then((response) => response.json())
                .then((responseData) => {
                  if(responseData.exito=="SI") {
                    resetPwd(txtEmail, responseData.pregunta);
                    settxtEmail('');
                  } else {
                    Alert.alert(
                      "Ups, algo salió mal",
                      responseData.mensaje
                    );
                  }
                });
                setModalVisible(!modalVisible);
                }
              }
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
      <View style={{alignItems: "center"}}>
        <Image style={styles.imagepeq}
          source={{uri: 'https://app.cash-flag.com/img/logoclub.png'}}
        />
      </View>
      <Text style={styles.text}>
        Usuario
      </Text>
      <TextInput style={styles.textinput}
        onChangeText={settxtUser}
        value={txtUser}
        editable={true}
        maxLength={50}
        placeholder='Correo electrónico'
      />
        <Text style={styles.text}>
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
      <TouchableOpacity 
        style={styles.boton}
        onPress={() => {
          actualizastate({txtUser,txtPass})
        }}
      >
        <Text style={styles.textoboton}>
          Acceder
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={{marginTop: 20}}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Text style={{margin: 10}}>
          Olvidaste tu Password
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => {
          newUser()
        }}
      >
        <Text style={{margin: 10}}>
          Si eres usuario nuevo ingresa aquí
        </Text>
      </TouchableOpacity>

    </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },  
    centeredView: {
      flex: 1,
      alignItems: "center"
    },
    modalViewTransfCupon: {
      marginTop: 225,
      marginHorizontal: 5,
      marginBottom: 5,
      backgroundColor: "white",
      borderColor: "black",
      borderWidth: 1,
      borderStyle: "solid",
      paddingTop: 15,
      paddingHorizontal: 15,
      paddingBottom: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      elevation: 5
    },
    imagepeq: {
     width: 214,
     height: 120
   },
   text: {
     fontSize: 20,
     textAlign: "center"
   },
   textinput: {
      height: 40,
      width: 250,
      marginTop: 5,
      marginBottom: 15,
      borderRadius: 10,
      backgroundColor: 'lightgray',
      textAlign: 'center'
   },
   boton: {
      width: 250,
      height: 40,
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      borderRadius: 10
      // borderWidth: 1,
   },
   textoboton: {
      color:"white",
      fontSize: 20
   }
});

module.exports = LoginScreen;