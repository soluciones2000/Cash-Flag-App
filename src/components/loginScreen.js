'use strict'

import React, {useState} from 'react';
import {
   Component,
   StyleSheet, 
   View,
   Image,
   Text,
   TextInput,
   TouchableOpacity,
   Alert
} from 'react-native';

const LoginScreen = (params) => {
  const navigation = params.navigation;
  const actualizastate = params.datos;
  const [txtUser, settxtUser] = useState('');
  const [txtPass, settxtPass] = useState('');

  return (
      <View style={styles.container}>
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
              actualizastate({navigation,txtUser,txtPass})
            }}
         >
            <Text style={styles.textoboton}>
               Acceder
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