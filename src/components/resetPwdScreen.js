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

const ANSWER_URL = 'https://app.cash-flag.com/apis/v1/socios/validAnswer';
const RESETPWD_URL = 'https://app.cash-flag.com/apis/v1/socios/resetPwd';

const ResetPwdScreen = (params) => {
  const txtEmail = params.email;
  const pregunta = params.pregunta;
  const successReset = params.successReset;
  const volver = params.volver;
  const [txtResp, settxtResp] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [txtPass, settxtPass] = useState('');
  const [txtPas2, settxtPas2] = useState('');

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
            <Text allowFontScaling={false} style={styles.text}>
                Introduce tu nueva contraseña
            </Text>
            <TextInput style={styles.textinput}
              onChangeText={settxtPass}
              value={txtPass}
              editable={true}
              maxLength={50}
              secureTextEntry={ true}
              placeholder='****'
            />
            <Text allowFontScaling={false} style={styles.text}>
                Repite la nueva contraseÑa
            </Text>
            <TextInput style={styles.textinput}
              onChangeText={settxtPas2}
              value={txtPas2}
              editable={true}
              maxLength={50}
              secureTextEntry={ true}
              placeholder='****'
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
                datos.append("passw",   txtPass);

                fetch(RESETPWD_URL, {
                  method: 'POST',
                  body: datos
                })
                .then((response) => response.json())
                .then((responseData) => {
                  if(responseData.exito=="SI") {
                    settxtPass('');
                    settxtPas2('');
                    successReset();
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
              <Text allowFontScaling={false} style={{
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
      <Text allowFontScaling={false} style={styles.textTitle}>
        Generación de contraseña
      </Text>
      <Text allowFontScaling={false} style={styles.text}>
        {pregunta}
      </Text>
      <TextInput style={styles.textinput}
        onChangeText={settxtResp}
        value={txtResp}
        editable={true}
        maxLength={50}
        secureTextEntry={ true}
        placeholder='****'
      />
      <View style={{
        flexDirection: "row",
        wdith: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <TouchableOpacity 
          style={styles.boton}
          onPress={() => {
            let datos = new FormData();
            datos.append("email",     txtEmail);
            datos.append("respuesta", txtResp);

            fetch(ANSWER_URL, {
              method: 'POST',
              body: datos
            })
            .then((response) => response.json())
            .then((responseData) => {
              if(responseData.exito=="SI") {
                setModalVisible(!modalVisible);
              } else {
                Alert.alert(
                  "Ups, algo salió mal",
                  responseData.mensaje
                );
              }
            });
          }}
        >
          <Text allowFontScaling={false} style={styles.textoboton}>
            Validar respuesta
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.boton}
          onPress={volver}
        >
          <Text allowFontScaling={false} style={styles.textoboton}>
            Volver
          </Text>
        </TouchableOpacity>
      </View>
    </View>
   )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  textTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30
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
    width: 140,
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
    fontSize: 16
  }
});

module.exports = ResetPwdScreen;