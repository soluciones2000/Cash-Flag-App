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
  Modal,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const HINT_URL = 'https://app.cash-flag.com/apis/v1/socios/hint';

const ancho = Dimensions.get('window').width
const ancho2 = ancho *.5;

const LoginScreen = (params) => {
  const actualizastate = params.datos;
  const resetPwd = params.resetPwd;
  const newUser = params.newUser;
  const images = params.imgs;
  const [txtUser, settxtUser] = useState('');
  const [txtPass, settxtPass] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [txtEmail, settxtEmail] = useState('')

  const enviar = () => {
    setModalVisible2(!modalVisible2);
    actualizastate({txtUser,txtPass});    
    setModalVisible2(!modalVisible2);
  };
  
  const renderItem = ({item}) => {
    return (
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}>
        <Image
          style={{
            width: '70%',
            height: '50%',
            resizeMode: 'contain'
          }}
          PlaceholderContent={<ActivityIndicator color="rgba(3,44,98,1)"/>}
          source={{uri: item.url }}
        />
        <Text style={{ textAlign: "center" }}>{item.nombre}</Text>
        <Text style={{ textAlign: "center" }}>{item.descripcion}</Text>
        <Text style={{ textAlign: "center" }}>{item.direccion}</Text>
      </View>
    );
  };

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
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 20,
                textAlign: "center"
              }}>
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
      <Modal
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={{flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center"}}>
          <ActivityIndicator size="large" color="white" />
        </View>
      </Modal>
      <View style={styles.container2}>
        <View style={{alignItems: "center", marginTop: 50}}>
          <Image style={styles.imagepeq}
            source={{uri: 'https://app.cash-flag.com/img/logo_gold.png'}}
          />
        </View>
        <Text allowFontScaling={false} style={styles.text}>
          Usuario
        </Text>
        <TextInput style={styles.textinput}
          onChangeText={settxtUser}
          value={txtUser}
          editable={true}
          maxLength={50}
          placeholder='Correo electrónico'
        />
          <Text allowFontScaling={false} style={styles.text}>
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
            // actualizastate({txtUser,txtPass})
            enviar(txtUser,txtPass);
          }}
        >
          <Text allowFontScaling={false} style={styles.textoboton}>
            Acceder
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{marginTop: 20}}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text allowFontScaling={false} style={{margin: 10, color: 'white'}}>
            Olvidaste tu Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {
            newUser()
          }}
        >
          <Text allowFontScaling={false} style={{margin: 10, color: 'white'}}>
            Si eres usuario nuevo ingresa aquí
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{
        fontSize: 20,
        textAlign: "center",
        color: "rgba(195,150,58,255)",
        marginBottom: 10
      }}>
        Conoce nuestros comercios aliados
      </Text>
      <View style={styles.container3}>
        <Carousel
          layout={"default"}
          data={images}
          sliderWidth={ancho}
          itemWidth={ancho2}
          renderItem={renderItem}
          loop={true}
          autoplay={true}
          enableMomentum={true}
          lockScrollWhileSnapping={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(3,44,98,1)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },  
  container2: {
    flex: 2,
    backgroundColor: 'rgba(3,44,98,1)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },  
  container3: {
    flex: 1,
    // backgroundColor: 'rgba(3,44,98,1)',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
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
    height: 100,
    marginBottom: 10,
    resizeMode: 'stretch'
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    color: "white"
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
    width: 250,
    height: 40,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10
    // borderWidth: 1,
  },
  textoboton: {
    color:"white",
    fontSize: 20
  }
});

module.exports = LoginScreen;