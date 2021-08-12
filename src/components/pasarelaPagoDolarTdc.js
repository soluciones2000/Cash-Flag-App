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
   ActivityIndicator
} from 'react-native';
import DatePicker from 'react-native-datepicker'

import * as Device from 'expo-device';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

const GET_TOKEN_URL    = "https://app.cash-flag.com/apis/net247/net247_gettoken";
const CREATE_TOKEN_URL = "https://app.cash-flag.com/apis/net247/net247_createtoken";
const ACTIVATECARD_URL = "https://app.cash-flag.com/apis/net247/net247_activatecard";
const PAYMENT_URL      = "https://app.cash-flag.com/apis/net247/net247_createonlinepayment";

const TARJETA_URL  = "https://app.cash-flag.com/apis/pasarela/pagotarjeta.php?";
const PREPAGO_URL  = "https://app.cash-flag.com/apis/v1/socios/prepago?";
const GIFTCARD_URL = "https://app.cash-flag.com/apis/v1/socios/giftcard?";
let REPORTE_URL = "";

const d = new Date();
let z = d.getFullYear();
let a = z.toString();
let y = a.substr(2,2);
let x = d.getMonth()+1;
let m = (x<10) ? "0"+x : x ;

const PasarelaPagoDolarTdc = (params) => {
   const navigation = params.navigation;
   const email = params.route.params.email;
   const token = params.route.params.token;
   const comercio = params.route.params.comercio;
   const divisa = params.route.params.divisa;
   const monto = params.route.params.monto;
   const premium = params.route.params.premium;
   const actLista = params.route.params.actlista;
   const instrumento = params.route.params.instrumento;
   const tipopago = 'tarjeta';

   const nombres   = (instrumento=='giftcard') ? params.route.params.nombres : "";
   const apellidos = (instrumento=='giftcard') ? params.route.params.apellidos : "";
   const telefono  = (instrumento=='giftcard') ? params.route.params.telefono : "";
   const correo    = (instrumento=='giftcard') ? params.route.params.correo : "";
   const mensaje   = (instrumento=='giftcard') ? params.route.params.mensaje : "";

   const [card, setCard] = useState(null);
   const [vencimiento, setVencimiento] = useState(m+y);
   const [cvv, setCvv] = useState(null);
   const [name, setName] = useState(null);
   const [address, setAddress] = useState(null);
   const [address2, setAddress2] = useState(null);
   const [zip, setZip] = useState(null);
   const [montoValidacion, setMontoValidacion] = useState(null);

   const [modalVisible, setModalVisible] = useState(false);
   const [modalVisible2, setModalVisible2] = useState(false);
   const [modalVisible3, setModalVisible3] = useState(false);

   const procesatarjeta = (monto,card,vencimiento,cvv,name,address,address2,zip) => {
      let datos = new FormData();
      datos.append("monto",       monto);
      datos.append("card",        card);
      datos.append("vencimiento", vencimiento);
      datos.append("cvv",         cvv);
      datos.append("name",        name);
      datos.append("address",     address);
      datos.append("address2",    address2);
      datos.append("zip",         zip);

      fetch(PAYMENT_URL, {
         method: 'POST',
         body: datos
      })
      .then((response) => response.json())
      .then((responseData) => {
         console.log('PAYMENT_URL');
         console.log(responseData);
         if(responseData.exito=="SI") {
            let referencia = responseData.referencia;
            procesaPago({
               email: email,
               token: token,
               comercio: comercio,
               nombres: nombres,
               apellidos: apellidos,
               telefono: telefono,
               correo: correo,
               mensaje: mensaje,
               divisa: divisa,
               monto: monto,
               premium: premium,
               tipopago: tipopago,
               menu: 'socio',
               origen: 'vivo',
               referencia: referencia
            });
         } else {
            setModalVisible3(false);
            Alert.alert(
               "Ups, algo salió mal",
               responseData.mensaje
            );
         }
      });
   };

   const procesaPago = (arg) => {
      let datos = new FormData();
      if(instrumento=='prepago') {
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
         REPORTE_URL = PREPAGO_URL;
      } else {
         datos.append("emailsocio",   arg.email);
         datos.append("token",        arg.token);
         datos.append("idcomercio",   arg.comercio);
         datos.append("nombres",      arg.nombres);
         datos.append("apellidos",    arg.apellidos);
         datos.append("telefono",     arg.telefono);
         datos.append("email",        arg.correo);
         datos.append("txtemail",     arg.mensaje);
         datos.append("moneda",       arg.divisa);
         datos.append("monto",        arg.monto);
         datos.append("premium",      arg.premium);
         datos.append("tipopago",     'tarjeta');
         datos.append("menu",         'socio');
         datos.append("origen",       arg.origen);
         datos.append("referencia",   arg.referencia);
         datos.append("cardcashflag", '');
         REPORTE_URL = GIFTCARD_URL;
      }

      fetch(REPORTE_URL, {
         method: 'POST',
         body: datos
      })
      .then((response) => response.json())
      .then((responseData) => {
         setModalVisible3(false);
         if(responseData.exito=="SI") {
            let nuevosaldo = responseData.disponible+responseData.pendiente;
            let mensaje  = "Número de tarjeta: "+responseData.card;
            mensaje += "\nSu nuevo saldo es de: "+responseData.disponible;
            Alert.alert(
               responseData.mensaje,
               mensaje
            );
            setCard(null);
            setVencimiento(m+y);
            setCvv(null);
            setName(null);
            setAddress(null);
            setAddress2(null);
            setZip(null);
            setMontoValidacion(null);
            actLista();
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
         <Modal
            transparent={true}
            visible={modalVisible3}
            onRequestClose={() => {
               setModalVisible3(!modalVisible3);
            }}
         >
            <View style={{flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center"}}>
               <ActivityIndicator size="large" color="white" />
            </View>
         </Modal>
         <ScrollView style={{ width: '100%' }}>
            <View style={{alignItems: "center"}}>
               <Image style={styles.imagepeq}
                  source={{uri: 'https://app.cash-flag.com/img/logoclub.png'}}
               />
            </View>
            <Text allowFontScaling={false} style={styles.textSmall}>
               Datos de la Tarjeta
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
                     format="MMYY"
                     minDate="0721"
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
                  maxLength={4}
               />
               <Text allowFontScaling={false} style={styles.text}>
                  Nombre del tarjetahabiente
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
                  onChangeText={setName}
                  value={name}
                  editable={true}
                  maxLength={50}
                  placeholder='Nombre'
               />

               <Text allowFontScaling={false} style={styles.text}>
                  Dirección
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
                  onChangeText={setAddress}
                  value={address}
                  editable={true}
                  maxLength={100}
                  placeholder='Dirección'
               />
               <Text allowFontScaling={false} style={styles.text}>
                  Dirección (2)
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
                  onChangeText={setAddress2}
                  value={address2}
                  editable={true}
                  maxLength={100}
                  placeholder='Complemento de dirección'
               />
               <Text allowFontScaling={false} style={styles.text}>
                  Código postal (ZIP)
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
                  onChangeText={setZip}
                  value={zip}
                  editable={true}
                  maxLength={10}
                  placeholder='Zip code'
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
                     setModalVisible3(true);
                     fetch(GET_TOKEN_URL+'?card='+card, {
                        method: 'GET'
                     })
                     .then((response) => response.json())
                     .then((responseData) => {
                        console.log('GET_TOKEN_URL');
                        console.log(responseData);
                        if(responseData.exito=="SI") {
                           procesatarjeta(monto,card,vencimiento,cvv,name,address,address2,zip);
                        } else {
                           setModalVisible3(false);
                           setModalVisible(!modalVisible);
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
         <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
               setModalVisible(!modalVisible);
            }}
            >
            <View style={styles.centeredView}>
               <View style={styles.modalViewAviso}>
                  <Text
                  allowFontScaling={false} 
                  style={styles.text}
                  >
                     Por tu seguridad y la nuestra, esta tarjeta debe ser activada para procesar el pago, vamos a enviar una pequeña transacción (de menos de 5,00 USD y que luego será reversada) y te pedimos que vayas a tu estado de cuenta, tomes nota del monto y lo confirmes en la próxima pantalla.{"\n"}{"\n"}
                     Si estás de acuerdo pulsa en "Aceptar" o utiliza otra tarjeta ya activada.{"\n"}{"\n"}
                     <Text style={{fontWeight: 'bold'}}>
                        Nota: Este cargo aparecerá en el estado de cuenta bajo el concepto "net24-7".
                     </Text>
                  </Text>
                  <View style={{
                  flexDirection: "row",
                  wdith: '100%',
                  marginBottom: 10
                  }}>
                     <TouchableOpacity 
                        style={{
                           height: 30,
                           width: 120,
                           marginTop: 10,
                           backgroundColor: 'blue',
                           alignItems: 'center',
                           justifyContent: 'center',
                           marginRight: 5,
                           borderRadius: 10
                        }}
                        onPress={() => {
                           setModalVisible3(true);
                           let datos = new FormData();
                           datos.append("card",        card);
                           datos.append("vencimiento", vencimiento);
                           datos.append("address",     address.trim()+" "+address2.trim());
                           datos.append("zip",         zip);
                           datos.append("cvv",         cvv);

                           fetch(CREATE_TOKEN_URL, {
                              method: 'POST',
                              body: datos
                           })
                           .then((response) => response.json())
                           .then((responseData) => {
                              console.log('CREATE_TOKEN_URL');
                              console.log(responseData);
                              setModalVisible3(false);
                              if(responseData.exito=="SI") {
                                 setModalVisible(!modalVisible);
                                 setModalVisible2(!modalVisible2);
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
                           style={{ color:"white", fontSize: 16 }}
                        >
                           Continuar
                        </Text>
                     </TouchableOpacity>
                     <TouchableOpacity 
                        style={{
                           height: 30,
                           width: 120,
                           marginTop: 10,
                           backgroundColor: 'blue',
                           alignItems: 'center',
                           justifyContent: 'center',
                           marginLeft: 5,
                           borderRadius: 10
                        }}
                        onPress={() => {
                           setModalVisible(false);
                        }}
                     >
                        <Text 
                           allowFontScaling={false} 
                           style={{ color:"white", fontSize: 16 }}
                        >
                           Cerrar
                        </Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </Modal>
         <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}
            onRequestClose={() => {
               setModalVisible2(!modalVisible2);
            }}
            >
            <View style={styles.centeredView}>
               <View style={styles.modalViewAviso}>
                  <Text
                  allowFontScaling={false} 
                  style={styles.text}
                  >
                     Ingresa por favor el monto del cargo que aparece en el estado de cuenta de la tarjeta para activarla en la plataforma.
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
                     onChangeText={setMontoValidacion}
                     value={montoValidacion}
                     editable={true}
                     maxLength={5}
                     placeholder='0.00'
                  />
                  <View style={{
                  flexDirection: "row",
                  wdith: '100%',
                  marginBottom: 10
                  }}>
                     <TouchableOpacity 
                        style={{
                           height: 30,
                           width: 120,
                           marginTop: 10,
                           backgroundColor: 'blue',
                           alignItems: 'center',
                           justifyContent: 'center',
                           marginRight: 5,
                           borderRadius: 10
                        }}
                        onPress={() => {
                           setModalVisible3(true);
                           let datos = new FormData();
                           datos.append("card",  card);
                           datos.append("value", montoValidacion);

                           fetch(ACTIVATECARD_URL, {
                              method: 'POST',
                              body: datos
                           })
                           .then((response) => response.json())
                           .then((responseData) => {
                              console.log('ACTIVATECARD_URL');
                              console.log(responseData);
                              setModalVisible3(false);
                              if(responseData.exito=="SI") {
                                 setModalVisible2(!modalVisible2);
                                 Alert.alert(
                                    "Gracias!",
                                    "Hemos activado la tarjeta, ahora puedes proceder al pago."
                                 );                     
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
                           style={{ color:"white", fontSize: 16 }}
                        >
                           Enviar
                        </Text>
                     </TouchableOpacity>
                     <TouchableOpacity 
                        style={{
                           height: 30,
                           width: 120,
                           marginTop: 10,
                           backgroundColor: 'blue',
                           alignItems: 'center',
                           justifyContent: 'center',
                           marginLeft: 5,
                           borderRadius: 10
                        }}
                        onPress={() => {
                           setModalVisible2(!modalVisible2);
                        }}
                     >
                        <Text 
                           allowFontScaling={false} 
                           style={{ color:"white", fontSize: 16 }}
                        >
                           Cerrar
                        </Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </Modal>
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
   },
   modalViewAviso: {
      marginTop: 225,
      marginHorizontal: 5,
      marginBottom: 5,
      backgroundColor: "white",
      borderColor: "black",
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 10,
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
   }
});

module.exports = PasarelaPagoDolarTdc;