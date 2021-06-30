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
   Dimensions
} from 'react-native';
import { Picker} from '@react-native-picker/picker';

const RecargaPremium = (params) => {
  const navigation = params.navigation;
  const email = params.route.params.email;
  const token = params.route.params.token;
  const [txtComercio] = useState(3);
  const [txtMoneda, settxtMoneda] = useState('bs');
  const [txtMonto, settxtMonto] = useState(null);

  return (
    <View style={styles.container}>
      <View style={{alignItems: "center"}}>
        <Image style={styles.imagepeq}
          source={{uri: 'https://app.cash-flag.com/img/logoclub.png'}}
        />
      </View>

      <Text allowFontScaling={false} style={styles.text}>
        Moneda
      </Text>
      <View style={styles.pickerinput}>
        <Picker
          style={styles.pickerinputdetalle}
          selectedValue={txtMoneda}
          onValueChange={(itemValue, itemIndex) => { 
            settxtMoneda(itemValue);
          }}
          prompt={'Seleccione moneda'}
        >
          <Picker.Item label="Bolívares (Bs.)" value='bs' />
          <Picker.Item label="Dólares (US$)" value='dolar' />
        </Picker>
      </View>

      <Text allowFontScaling={false} style={styles.text}>
        Monto
      </Text>
      <TextInput 
        style={{
          height: 40,
          width: 250,
          marginTop: 5,
          marginBottom: 15,
          borderRadius: 10,
          paddingHorizontal: 10,
          backgroundColor: 'lightgray',
          textAlign: 'right'
        }}
        onChangeText={settxtMonto}
        value={txtMonto}
        editable={true}
        maxLength={20}
        placeholder='0.00'
      />
      <View style={{
        flexDirection: "row",
        wdith: '100%',
        marginBottom: 20
      }}>
        <TouchableOpacity 
          style={{
            height: 40,
            width: 135,
            backgroundColor: 'blue',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 5,
            borderRadius: 10
          }}
          onPress={() => {
            Alert.alert(
              "Ups, algo salió mal",
              "Esta opción está temporalmente deshabilitada"
            );
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              color:"white",
              fontSize: 16
            }}
          >
            Pago en línea
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{
            height: 40,
            width: 135,
            backgroundColor: 'blue',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 5,
            borderRadius: 10
          }}
          onPress={() => {
            let xVar = 0;
            if(txtMonto==0 || txtMonto==null) { xVar = 2 }
            if(xVar>0) {
              switch(xVar) {
                case 2:
                  Alert.alert(
                    "Éxito",
                    "Debes indicar un monto"
                  );              
                break;
              }
            } else {
              navigation.navigate('reporte',{
                email: email,
                token: token,
                comercio: txtComercio,
                divisa: txtMoneda,
                monto: txtMonto,
                premium: "1"
              })
            }
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              color:"white",
              fontSize: 16
            }}
          >
            Reporte de pago
          </Text>
        </TouchableOpacity>
      </View>
        <TouchableOpacity 
          style={{
            height: 40,
            width: 135,
            backgroundColor: 'blue',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 5,
            borderRadius: 10
          }}
          onPress={() => {
            settxtMoneda('bs');
            settxtMonto(null);
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              color:"white",
              fontSize: 16
            }}
          >
            Limpiar
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
   pickerinput: {
      height: 40,
      width: 250,
      marginTop: 5,
      marginBottom: 15,
      borderRadius: 10,
      backgroundColor: 'lightgray',
      justifyContent: 'center'
   },
   pickerinputdetalle: {
      border: 'none'
   }
});

module.exports = RecargaPremium;