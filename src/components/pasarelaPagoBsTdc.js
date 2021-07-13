'use strict'

import React, {useState, useEffect} from 'react';
import {
   StyleSheet, 
   View,
   ScrollView,
   Image,
   Text,
   TextInput,
   TouchableOpacity,
   Alert,
   Modal,
   Dimensions
} from 'react-native';
import DatePicker from 'react-native-datepicker'

import * as Device from 'expo-device';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

const TARJETA_URL = "https://app.cash-flag.com/apis/pasarela/pagotarjeta.php?";
const REPORTE_URL = "https://app.cash-flag.com/apis/v1/socios/prepago?";

const d = new Date();
let y = d.getFullYear();
let x = d.getMonth()+1;
let m = (x<10) ? "0"+x : x ;

let latitude="";
let longitude="";
let browserAgent="";

const PasarelaPagoBsTdc = (params) => {
  const navigation = params.navigation;
  const email = params.route.params.email;
  const token = params.route.params.token;
  const comercio = params.route.params.comercio;
  const divisa = params.route.params.divisa;
  const monto = params.route.params.monto;
  const premium = params.route.params.premium;
  const tipopago = params.route.params.tipopago;

  const [card, setCard] = useState(null);
  const [vencimiento, setVencimiento] = useState(m+'/'+y);
  const [cvv, setCvv] = useState(null);
  const [cedula, setCedula] = useState(null);

  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
    GetWebViewUserAgent();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'No posee permisos',
        'Permite a la app usar el permiso de geolocalización.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'No posee permisos',
        'Permite a la app usar el permiso de geolocalización.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      latitude = coords.latitude;
      longitude = coords.longitude;
    }
  };

  const GetWebViewUserAgent = async () => {
    let agent = await Constants.getWebViewUserAgentAsync();
    browserAgent = agent.substr(0,80);
  };

  const procesaPago = (arg) => {
    let datos = new FormData();
    datos.append("email",      arg.email);
    datos.append("token",      arg.token);
    datos.append("idcomercio", arg.comercio);
    datos.append("moneda",     arg.divisa);
    datos.append("monto",      arg.monto);
    datos.append("premium",    arg.premium);
    datos.append("tipopago",   'tarjeta');
    datos.append("menu",       'socio');
    datos.append("origen",     arg.origen);
    datos.append("referencia", arg.referencia);

    fetch(REPORTE_URL, {
      method: 'POST',
      body: datos
    })
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.exito=="SI") {
        let nuevosaldo = responseData.disponible+responseData.pendiente;
        let mensaje  = "Número de tarjeta: "+responseData.card;
        mensaje += "\nSu nuevo saldo es de: "+responseData.disponible;
        Alert.alert(
          responseData.mensaje,
          mensaje
        );
        setCard(null);
        setVencimiento(m+'/'+y);
        setCvv(null);
        setCedula(null);
        navigation.popToTop();
      } else {
        Alert.alert(
          "Ups, algo salió mal",
          responseData.mensaje
        );
      }
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
      <View style={{alignItems: "center"}}>
        <Image style={styles.imagepeq}
          source={{uri: 'https://app.cash-flag.com/img/logoclub.png'}}
        />
      </View>
      <Text allowFontScaling={false} style={styles.textSmall}>
        Datos de la Tarjeta de crédito{"\n"}
        (nacionales o internacionales)
      </Text>
      <View style={{ alignItems: 'center'}}>
      <Text allowFontScaling={false} style={styles.text}>
        Número de tarjeta
      </Text>
      <TextInput
        style={{
          height: 40,
          width: 250,
          marginTop: 5,
          marginBottom: 15,
          borderRadius: 10,
          backgroundColor: 'lightgray',
          textAlign: 'center'
        }}
        onChangeText={setCard}
        value={card}
        editable={true}
        maxLength={18}
        placeholder='Número de tarjeta'
      />
      <Text allowFontScaling={false} style={styles.text}>
        Fecha de vencimiento
      </Text>
      <View style={styles.pickerinput}>
        <DatePicker
          style={{
            width: 240,
            textAlign: 'center',
            borderColor: 'none',
          }}
          date={vencimiento}
          mode="date"
          placeholder="Selecciona fecha"
          format="MM/YYYY"
          minDate="07/2021"
          confirmBtnText="Confirmar"
          cancelBtnText="Cancelar"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 5,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              justifyContent: 'center',
              borderColor: 'lightgray',
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {
            setVencimiento(date);
          }}
        />
      </View>
      <Text allowFontScaling={false} style={styles.text}>
        Código de seguridad (CVV)
      </Text>
      <TextInput
        style={{
          height: 40,
          width: 250,
          marginTop: 5,
          marginBottom: 15,
          borderRadius: 10,
          backgroundColor: 'lightgray',
          textAlign: 'center'
        }}
        onChangeText={setCvv}
        value={cvv}
        editable={true}
        secureTextEntry={ true}
        maxLength={3}
      />
      <Text allowFontScaling={false} style={styles.text}>
        Número de cédula
      </Text>
      <TextInput
        style={{
          height: 40,
          width: 250,
          marginTop: 5,
          marginBottom: 15,
          borderRadius: 10,
          backgroundColor: 'lightgray',
          textAlign: 'center'
        }}
        onChangeText={setCedula}
        value={cedula}
        editable={true}
        maxLength={9}
        placeholder='V12345678'
      />
      </View>
      <View style={{
        flexDirection: "row",
        wdith: '100%',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
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
            let datos = new FormData();
            datos.append("tipotarjeta",  tipopago);
            datos.append("tarjeta",      card);
            datos.append("cedula",       cedula);
            datos.append("vencimiento",  vencimiento.substr(3,4)+"/"+vencimiento.substr(0,2));
            datos.append("cvv",          cvv);
            datos.append("monto",        monto);
            datos.append("browser",      browserAgent);
            datos.append("mobile",       "true");
            datos.append("manufacturer", Device.manufacturer);
            datos.append("model",        Device.modelName);
            datos.append("osversion",    Device.osVersion);
            datos.append("latitude",     latitude);
            datos.append("longitude",    longitude);

            fetch(TARJETA_URL, {
              method: 'POST',
              body: datos
            })
            .then((response) => response.json())
            .then((responseData) => {
              console.log('mensaje',responseData.mensaje);
              console.log('reponse',responseData.response);
              console.log('err',responseData.err);

              if(responseData.exito=="SI") {
                let referencia = responseData.referencia;
                procesaPago({
                  email: email,
                  token: token,
                  comercio: comercio,
                  divisa: divisa,
                  monto: monto,
                  premium: premium,
                  tipopago: tipopago,
                  menu: 'socio',
                  origen: 'mercantil',
                  referencia: referencia
                });
              } else {
                Alert.alert(
                  "Ups, algo salió mal",
                  responseData.mensaje
                );
              }
            });
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              color:"white",
              fontSize: 16
            }}
          >
            Enviar
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
            setCard(null);
            setVencimiento(m+'/'+y);
            setCvv(null);
            setCedula(null);
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
      </ScrollView>
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
    pickerinput: {
      height: 40,
      width: 250,
      marginTop: 5,
      marginBottom: 15,
      borderRadius: 10,
      backgroundColor: 'lightgray',
      justifyContent: 'center'
    },
    text: {
      fontSize: 20,
      textAlign: "center"
    },
    textSmall: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 10
    }
});

module.exports = PasarelaPagoBsTdc;