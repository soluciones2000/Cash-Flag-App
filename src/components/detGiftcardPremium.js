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
  ActivityIndicator
} from 'react-native';
import { Picker} from '@react-native-picker/picker';
import RadioButtonRN from 'radio-buttons-react-native';

const datos = [
  {label: 'T. de Crédito (nacional o internac.)', value: 'tdc' },
  {label: 'T. de Débito (sólo Bco. Mercantil)', value: 'tdd' },
  {label: 'Pago movil C2P', value: 'c2p' }
];
let valor = 1;

const datos2 = [
  {label: 'Zelle',  value: 'zelle' },
  {label: 'UPHOLD', value: 'uphold' },
];
let valor2 = 1;

const Aviso = (param) => {
  if(param.moneda=='bs') {
    return (
      <Text allowFontScaling={false} style={styles.parrafoSmall}>
        Instrucciones para pagar en Bs.:{"\n"}{"\n"}
        <Text style={{textDecorationLine: 'underline'}}>
          Transferencia Banco Mercantil
        </Text>{"\n"}
        RIF: J-40242441-8{"\n"}
        Cuenta: 0105 0755 3217 5502 6986{"\n"}
        A nombre de: SGC Consultores C.A.{"\n"}
        {"\n"}
        <Text style={{textDecorationLine: 'underline'}}>
          Pago movil:
        </Text>{"\n"}
        Debe ingresar en la opción pago en linea{"\n"}{"\n"}
        <Text style={{fontWeight: 'bold', color: 'red'}}>
          Ten en cuenta que los reportes de pago pueden tardar hasta 24 horas hábiles en confirmarse.
        </Text>
      </Text>  
    ) 
  } else {
    return (
      <View>
        <Text allowFontScaling={false} style={styles.parrafoSmall}>
          {"\n"}Instrucciones para pagar en USD:{"\n"}{"\n"}
          <Text style={{textDecorationLine: 'underline'}}>
            ZELLE:
          </Text>{"\n"}
          Enviar fondos a: vivo@zelle247.com{"\n"}
          <Text style={{fontWeight: 'bold'}}>
            Esta transacción se confirmará en linea al reportar el pago.
          </Text>
          {"\n"}{"\n"}
          <Text style={{textDecorationLine: 'underline'}}>
            UPHOLD:
          </Text>{"\n"}
          Enviar fondos a: sgcvzla@gmail.com{"\n"}
          <Text style={{fontWeight: 'bold'}}>
            Esta transacción puede tardar hasta 24 horas hábiles en confirmarse.
          </Text>
          {"\n"}
        </Text>
        <View>
          <Text style={{textDecorationLine: 'underline'}}>
            Seleciona tu medio de pago:
          </Text>
          <RadioButtonRN
            style={{ width: '90%', marginBottom: 10 }}
            data={datos2}
            initial={1}
            selectedBtn={(e) => {
              valor2 = e.value;
            }}
            circleSize={11}
            textStyle={{fontSize: 15}}
            box={false}
          />
        </View>
      </View>
    )
  }
}

const PagoEnLinea = (param) => {
  if(param.moneda=='bs') {
    return (
      <RadioButtonRN
        style={{ width: '90%', marginVertical: 5 }}
        data={datos}
        initial={1}
        selectedBtn={(e) => {
          valor = e.value;
        }}
        circleSize={11}
        textStyle={{fontSize: 15}}
        box={false}
      />
    )
  } else {
    return (
      <View>
        <Text allowFontScaling={false} style={styles.parrafoSmall}>
          {"\n"}Instrucciones para pagar en USD:{"\n"}{"\n"}
          <Text style={{textDecorationLine: 'underline'}}>
            ZELLE:
          </Text>{"\n"}
          Enviar fondos a: vivo@zelle247.com{"\n"}
          <Text style={{fontWeight: 'bold'}}>
            Esta transacción se confirmará en linea al reportar el pago.
          </Text>
          {"\n"}{"\n"}
          <Text style={{textDecorationLine: 'underline'}}>
            UPHOLD:
          </Text>{"\n"}
          Enviar fondos a: sgcvzla@gmail.com{"\n"}
          <Text style={{fontWeight: 'bold'}}>
            Esta transacción puede tardar hasta 24 horas hábiles en confirmarse.
          </Text>
          {"\n"}
        </Text>
        <View style={{ backgroundColor: 'yellow' }}>
          <RadioButtonRN
            style={{ width: '90%', marginVertical: 5 }}
            data={datos2}
            initial={1}
            selectedBtn={(e) => {
              valor = e.value;
            }}
            circleSize={11}
            textStyle={{fontSize: 15}}
            box={false}
          />
        </View>
      </View>
    )
  }
}

const DetGiftcardPremium = (params) => {
  const navigation = params.navigation;
  const email = params.route.params.email;
  const token = params.route.params.token;
  const nombres = params.route.params.nombres;
  const apellidos = params.route.params.apellidos;
  const telefono = params.route.params.telefono;
  const correo = params.route.params.correo;
  const mensaje = params.route.params.mensaje;
  const actLista = params.route.params.actlista;

  const [txtComercio] = useState(3);
  const [txtMoneda, settxtMoneda] = useState('bs');
  const [txtMonto, settxtMonto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

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
      <Text
        allowFontScaling={false}
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          textAlign: "center",
          marginVertical: 10
        }}
      >
        Este producto tiene un costo para el usuario del 8% sobre el monto de la transacción cuando se realiza en dólares, si se realiza en Bs. el costo será de 3%.
      </Text>

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
            if(txtMoneda=='bs') {
              setModalVisible2(!modalVisible2);
            } else {
              navigation.navigate('pasarelaPagoDolarTdc',{
                email: email,
                token: token,
                comercio: txtComercio,
                divisa: txtMoneda,
                monto: txtMonto,
                premium: "1",
                nombres: nombres,
                apellidos: apellidos,
                telefono: telefono,
                correo: correo,
                mensaje: mensaje,
                actlista: actLista,
                instrumento: 'giftcard'
              });
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
            marginLeft: 5,
            borderRadius: 10
          }}
          onPress={() => {
            let xVar = 0;
            if(txtMonto==0 || txtMonto==null) { xVar = 2 }
            if(txtComercio==0) { xVar = 1 }
            if(xVar>0) {
              switch(xVar) {
                case 1:
                  Alert.alert(
                    "Éxito",
                    "Debes seleccionar un comercio"
                  );              
                break;
                case 2:
                  Alert.alert(
                    "Éxito",
                    "Debes indicar un monto"
                  );              
                break;
              }
            } else {
              setModalVisible(!modalVisible);
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
              <Text style={{fontWeight: 'bold'}}>
                Antes de continuar debes realizar el pago
              </Text>
            </Text>
            <Aviso moneda={txtMoneda}/>
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
                  setModalVisible(!modalVisible);
                  if (txtMoneda=='bs') {
                    navigation.navigate('repGiftcard',{
                      email: email,
                      token: token,
                      comercio: txtComercio,
                      divisa: txtMoneda,
                      monto: txtMonto,
                      premium: "1",
                      nombres: nombres,
                      apellidos: apellidos,
                      telefono: telefono,
                      correo: correo,
                      mensaje: mensaje
                    })
                    } else {
                    if (valor2=='zelle') {
                      navigation.navigate('repZelleGiftcard',{
                        email: email,
                        token: token,
                        comercio: txtComercio,
                        divisa: txtMoneda,
                        monto: txtMonto,
                        premium: "1",
                        nombres: nombres,
                        apellidos: apellidos,
                        telefono: telefono,
                        correo: correo,
                        mensaje: mensaje,
                        actlista: actLista
                      })
                    } else {
                      navigation.navigate('repGiftcard',{
                        email: email,
                        token: token,
                        comercio: txtComercio,
                        divisa: txtMoneda,
                        monto: txtMonto,
                        premium: "1",
                        nombres: nombres,
                        apellidos: apellidos,
                        telefono: telefono,
                        correo: correo,
                        mensaje: mensaje
                      })
                    }
                  }
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
                  setModalVisible(!modalVisible);
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
              <Text style={{fontWeight: 'bold'}}>
                Selecciona tu modalidad preferida para el pago
              </Text>
            </Text>
            <PagoEnLinea moneda={txtMoneda}/>
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
                  setModalVisible2(!modalVisible2);
                  switch (valor) {
                    case 'tdc':
                      navigation.navigate('pasarelaPagoBsTdc',{
                        email: email,
                        token: token,
                        comercio: txtComercio,
                        divisa: txtMoneda,
                        monto: txtMonto,
                        premium: "1",
                        nombres: nombres,
                        apellidos: apellidos,
                        telefono: telefono,
                        correo: correo,
                        mensaje: mensaje,
                        tipopago: valor,
                        actlista: actLista,
                        instrumento: 'giftcard'
                      })
                    break;
                    case 'tdd':
                      navigation.navigate('pasarelaPagoBsTdd',{
                        email: email,
                        token: token,
                        comercio: txtComercio,
                        divisa: txtMoneda,
                        monto: txtMonto,
                        premium: "1",
                        nombres: nombres,
                        apellidos: apellidos,
                        telefono: telefono,
                        correo: correo,
                        mensaje: mensaje,
                        tipopago: valor,
                        actlista: actLista,
                        instrumento: 'giftcard'
                      })
                    break;
                    case 'c2p':
                      navigation.navigate('pasarelaPagoBsC2p',{
                        email: email,
                        token: token,
                        comercio: txtComercio,
                        divisa: txtMoneda,
                        monto: txtMonto,
                        premium: "1",
                        nombres: nombres,
                        apellidos: apellidos,
                        telefono: telefono,
                        correo: correo,
                        mensaje: mensaje,
                        tipopago: valor,
                        actlista: actLista,
                        instrumento: 'giftcard'
                      })
                    break;
                  }
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
  text: {
    fontSize: 20,
    textAlign: "center"
  },
  parrafoSmall: {
    fontSize: 15,
    textAlign: "justify"
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

module.exports = DetGiftcardPremium;