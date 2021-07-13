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
import { Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker'

import * as Device from 'expo-device';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

const TARJETA_URL = "https://app.cash-flag.com/apis/pasarela/pagoc2p.php?";
const REPORTE_URL = "https://app.cash-flag.com/apis/v1/socios/prepago?";

const d = new Date();
let y = d.getFullYear();
let x = d.getMonth()+1;
let m = (x<10) ? "0"+x : x ;

let latitude=0;
let longitude=0;
let browserAgent="";

const PasarelaPagoBsC2p = (params) => {
  const navigation = params.navigation;
  const email = params.route.params.email;
  const token = params.route.params.token;
  const comercio = params.route.params.comercio;
  const divisa = params.route.params.divisa;
  const monto = params.route.params.monto;
  const premium = params.route.params.premium;
  const tipopago = params.route.params.tipopago;

  const [banco, setBanco] = useState('0000');
  const [phone, setPhone] = useState(null);
  const [cedula, setCedula] = useState(null);
  const [clave, setClave] = useState(null);

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

    let { coords } = await Location.getCurrentPositionAsync({});
    console.log('coords',coords);
    console.log('despues');

    if (coords) {
      latitude = coords.latitude;
      longitude = coords.longitude;
    }
    console.log('latitude',latitude);
    console.log('longitude',longitude);
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
        setBanco('0000');
        setPhone(null);
        setCedula(null);
        setClave(null);
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
        Datos de la Tarjeta de débito{"\n"}
        (sólo Banco Mercantil)
      </Text>
      <View style={{ alignItems: 'center'}}>
      <Text allowFontScaling={false} style={styles.text}>
        Tipo de cuenta
      </Text>
      <View style={styles.pickerinput}>
        <Picker
          selectedValue={banco}
          onValueChange={(itemValue, itemIndex) => { 
            setBanco(itemValue);
          }}
          prompt={'Seleccione banco'}
        >
          <Picker.Item label='100% Banco' value="0156" />
          <Picker.Item label='ABN Amro Bank' value="0196" />
          <Picker.Item label='Bancamiga Banco Microfinanciero, C.A.' value="0172" />
          <Picker.Item label='Banco Activo Banco Comercial, C.A.' value="0171" />
          <Picker.Item label='Banco Agrícola' value="0166" />
          <Picker.Item label='Banco Bicentenario' value="0175" />
          <Picker.Item label='Banco Caroní, C.A. Banco Universal' value="0128" />
          <Picker.Item label='Banco De Desarrollo Del Microempresario' value="0164" />
          <Picker.Item label='Banco De Venezuela S.A.I.C.A.' value="0102" />
          <Picker.Item label='Banco Del Caribe C.A.' value="0114" />
          <Picker.Item label='Banco Del Pueblo Soberano C.A.' value="0149" />
          <Picker.Item label='Banco Del Tesoro' value="0163" />
          <Picker.Item label='Banco Espirito Santo, S.A.' value="0176" />
          <Picker.Item label='Banco Exterior C.A.' value="0115" />
          <Picker.Item label='Banco Industrial De Venezuela.' value="0003" />
          <Picker.Item label='Banco Internacional De Desarrollo, C.A.' value="0173" />
          <Picker.Item label='Banco Mercantil C.A.' value="0105" />
          <Picker.Item label='Banco Nacional De Crédito' value="0191" />
          <Picker.Item label='Banco Occidental De Descuento' value="0116" />
          <Picker.Item label='Banco Plaza' value="0138" />
          <Picker.Item label='Banco Provincial Bbva' value="0108" />
          <Picker.Item label='Banco Venezolano De Crédito S.A.' value="0104" />
          <Picker.Item label='Bancrecer S.A. Banco De Desarrollo' value="0168" />
          <Picker.Item label='Banesco Banco Universal  ' value="0134" />
          <Picker.Item label='Banfanb' value="0177" />
          <Picker.Item label='Bangente' value="0146" />
          <Picker.Item label='Banplus Banco Comercial C.A' value="0174" />
          <Picker.Item label='Citibank.' value="0190" />
          <Picker.Item label='Corp Banca.' value="0121" />
          <Picker.Item label='Delsur Banco Universal' value="0157" />
          <Picker.Item label='Fondo Comün' value="0151" />
          <Picker.Item label='Instituto Municipal De Crédito Popular' value="0601" />
          <Picker.Item label='Mibanco Banco De Desarrollo, C.A.' value="0169" />
          <Picker.Item label='Sofitasa' value="0137" />
        </Picker>
      </View>
      <Text allowFontScaling={false} style={styles.text}>
        Número de teléfono
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
        onChangeText={setPhone}
        value={phone}
        editable={true}
        maxLength={12}
        placeholder='584#########'
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
      <Text allowFontScaling={false} style={styles.text}>
        Clave de compra de tu banco
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
        onChangeText={setClave}
        value={clave}
        editable={true}
        secureTextEntry={ true}
        maxLength={10}
        placeholder='****'
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
            console.log('entró');
            let datos = new FormData();
            datos.append("codigobanco",    banco);
            datos.append("telefonoorigen", phone);
            datos.append("cedulac2p",      cedula);
            datos.append("monto",          monto);
            datos.append("browser",        browserAgent);
            datos.append("mobile",         "true");
            datos.append("manufacturer",   Device.manufacturer);
            datos.append("model",          Device.modelName);
            datos.append("osversion",      Device.osVersion);
            datos.append("latitude",       latitude);
            datos.append("longitude",      longitude);

            console.log(datos);

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
            setBanco('0000');
            setPhone(null);
            setCedula(null);
            setClave(null);
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

module.exports = PasarelaPagoBsC2p;