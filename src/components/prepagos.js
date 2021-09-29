import React, { Component, useState } from 'react';
import { 
  Linking,
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  Alert,
  StyleSheet,
  ImageBackground
} from 'react-native';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';

const PRODUCTS_URL = 'https://app.cash-flag.com/apis/v1/socios/productos?';

const styles = require('./styles');

const msjtipo = 'Tarjeta de Compras';
const colortext  = 'white';
const colorborde = 'white';
const image = require('../../assets/img/card-bg-black.png');
const icongft = require('../../assets/img/monedas.png');

const Aviso = () => {
  return (
    <View style={styles2.container}>
      <View style={{alignItems: "center", marginTop: 50}}>
        <Image
          style={{
            width: 120,
            height: 120,
            resizeMode: 'contain'
          }}
          source={require('../../assets/img/ico-warning.png')}
        />
      </View>
      <View style={{
        backgroundColor: 'rgba(3,44,98,1)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 5,
          height: 5
        },
        shadowOpacity: 0.5,
        elevation: 5,
        height: 50,
        width: '80%',
        marginTop: 30
      }}>
        <Text
          allowFontScaling={false}
          style={{
            color: 'rgba(195,150,58,255)',
            fontSize: 20
          }}
        >
          No tienes tarjetas de compras
        </Text>
      </View>
      <Text allowFontScaling={false} style={styles2.parrafoSmall}>
        Gana recompensas en nuestros comercios afiliados, recarga tu tarjeta de compras ingresando en:
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          shadowColor: "#000",
          shadowOffset: {
            width: 5,
            height: 5
          },
          shadowOpacity: 0.25,
          elevation: 5,
          height: 50,
          width: '80%',
          marginTop: 30
        }}
        onPress={() => Linking.openURL('https://app.cash-flag.com')}
      >
        <Text allowFontScaling={false} style={styles.textoboton}>
          app.cash-flag.com
        </Text>
      </TouchableOpacity>
    </View>  
  ) 
}

const PremiumCard = (args) => {
  let numcard = args.tarjeta.substr(0,4)+' '+args.tarjeta.substr(4,4)+' '+args.tarjeta.substr(8,4)+' '+args.tarjeta.substr(12,4);

  return (
      <View style={{
        width: 310,
        height: 195,
        marginHorizontal: 'auto',
        marginTop: '10%',
        borderRadius: 13,
        flexDirection: 'column',
        justifyContent: "space-between",
        borderColor: colorborde,
        borderWidth: 2,
        borderStyle: "solid"
      }}>
        <ImageBackground 
          source={image}
          style={{
            width: '100%',
            height: '100%'
          }}
          imageStyle={{
            resizeMode: 'cover',
            borderRadius: 9
          }}
        >
        <View style={{
          borderColor: colorborde,
          borderWidth: 2,
          borderStyle: "solid",
          margin: 5,
          borderRadius: 9,
          height: '94%'
        }}>
          <View style={{
            width: '30%',
            height: '30%',
            top: 5,
            left: 5
          }}>
            <Image style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain'
            }}
              source={{uri: args.logotarjeta}}
            />
          </View>
          <View style={{
            alignItems: "flex-end",
            marginRight: 7.5,
            top: -10            
          }}>
            <Text allowFontScaling={false} style={{color: colortext, fontSize: 13}}>{msjtipo}</Text>
            <Text allowFontScaling={false} style={{color: colortext, fontWeight: 'bold', fontSize: 16}}>{numcard}</Text>
            <Text allowFontScaling={false} style={{color: colortext, fontSize: 13}}>{args.socio}</Text>
            <Text allowFontScaling={false} style={{color: colortext, fontSize: 10}}>{args.validez}</Text>
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: "space-between",
            marginTop: '-3%',
            height: '40%'
          }}>
            <View style={{
              width: '30%',
              height: '90%',
              marginBottom: '5%',
              marginLeft: '3%'
            }}>
              <Image style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain'
              }}
                source={{uri: args.dibujomoneda}}
              />
            </View>
            <View style={{
              width: '20%',
              height: '50%',
              top: -105,
              left: 90
            }}>
              <Image style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain'
              }}
                source={args.code_qr}
              />
            </View>
            <View style={{
              width: '15%',
              height: '100%',
              marginRight: '5%',
              marginBottom: '2%'
            }}>
              <Image style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain'
              }}
                source={icongft}
              />
            </View>
          </View>
        </View>
        </ImageBackground>
      </View>
  )
}

const LocalCard = (args) => {
  let numcard = args.tarjeta.substr(0,4)+' '+args.tarjeta.substr(4,4)+' '+args.tarjeta.substr(8,4)+' '+args.tarjeta.substr(12,4);

  return (
      <View style={{
        width: 310,
        height: 195,
        marginHorizontal: 'auto',
        marginTop: '10%',
        borderRadius: 13,
        flexDirection: 'column',
        justifyContent: "space-between",
        borderColor: colorborde,
        borderWidth: 2,
        borderStyle: "solid"
      }}>
        <ImageBackground 
          source={image}
          style={{
            width: '100%',
            height: '100%'
          }}
          imageStyle={{
            resizeMode: 'cover',
            borderRadius: 9
          }}
        >
        <View style={{
          borderColor: colorborde,
          borderWidth: 2,
          borderStyle: "solid",
          margin: 5,
          borderRadius: 9,
          height: '94%'
        }}>
          <View style={{
            width: '30%',
            height: '30%',
            top: 5,
            left: 5
          }}>
            <Image style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain'
            }}
              source={{uri: args.logotarjeta}}
            />
          </View>
          <View style={{
            alignItems: "flex-end",
            marginRight: 7.5,
            top: -10            
          }}>
            <Text allowFontScaling={false} style={{color: colortext, fontSize: 13}}>{msjtipo}</Text>
            <Text allowFontScaling={false} style={{color: colortext, fontWeight: 'bold', fontSize: 16}}>{numcard}</Text>
            <Text allowFontScaling={false} style={{color: colortext, fontSize: 13}}>{args.socio}</Text>
            <Text allowFontScaling={false} style={{color: colortext, fontSize: 10}}>{args.validez}</Text>
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: "space-between",
            marginTop: '-3%',
            height: '40%'
          }}>
            <View style={{
              width: '28%',
              height: 15,
              bottom: -35,
              marginBottom: '2%',
              marginLeft: '2%'
            }}>
              <Image style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain'
              }}
                source={args.code_qr}
              />
            </View>
            <View style={{
              width: '15%',
              height: '100%',
              marginRight: '5%',
              marginBottom: '2%'
            }}>
              <Image style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain'
              }}
                source={icongft}
              />
            </View>
          </View>
        </View>
        </ImageBackground>
      </View>
  )
}

const Prepagos = (params) => {
  const navigation = params.navigation;
  const socio = params.socio;
  const [data, setData] = useState(params.prepagos);
  const [isRender, setIsrender] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dspBoton, setDspboton] = useState('flex');

  const email = params.email;
  const token = params.token;
  const comercios = params.comercios;
  const actDatos = params.actDatos;
  
  const code_qr = require('../../assets/img/blanco_hori.png');
  const xDibPrm = require('../../assets/img/premium.png');
  
  const actualizasaldo = (saldo,index) => {
    let xaPrepagos = data;
    xaPrepagos[index].saldo = saldo;
    setData(xaPrepagos);
    setIsrender(!isRender)
  };

  const listRefresh = async () => {
    setRefreshing(true);
    await fetch(PRODUCTS_URL+'email='+email+'&token='+token)
    .then((response) => response.json())
    .then((responseData) => {
      setData(responseData.prepagos);
      setRefreshing(false);
    });
  };

  const renderItem = ({item, index}) => {   
    if (item.premium) {
      return (
        <View style={{
          // backgroundColor: 'rgba(19,121,187,255)',
          height: 130,
          // paddingVertical: 5,
          alignItems: 'center'  
        }}>
          <TouchableOpacity
            onPress={() => {
                // this.saldoant = item.saldo;
                navigation.navigate('PrPremium', {
                  logo: item.logotarjeta,
                  idproveedor: item.idproveedor,
                  card: item.tarjeta,
                  nombre: socio,
                  validez: item.validez,
                  saldo: item.saldo,
                  moneda: item.moneda,
                  simbolo: item.simbolo,
                  dibujomoneda: item.dibujomoneda,
                  actsaldo: actualizasaldo,
                  indice: index
                })
              }
            }
          >
            <PremiumCard 
              tarjeta= {item.tarjeta}
              logotarjeta= {item.logotarjeta}
              socio= {socio}
              validez= {item.validez}
              dibujomoneda= {item.dibujomoneda}
              code_qr= {xDibPrm}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{
          // backgroundColor: 'rgba(19,121,187,255)',
          height: 130,
          // paddingVertical: 5,
          alignItems: 'center'  
        }}>
          <TouchableOpacity
            onPress={() => {
                // this.saldoant = item.saldo;
                navigation.navigate('Prepaids', {
                  logo: item.logotarjeta,
                  idproveedor: item.idproveedor,
                  card: item.tarjeta,
                  nombre: socio,
                  validez: item.validez,
                  saldo: item.saldo,
                  moneda: item.moneda,
                  simbolo: item.simbolo,
                  actsaldo: actualizasaldo,
                  indice: index
                })
              }
            }
          >
            <LocalCard 
              tarjeta= {item.tarjeta}
              logotarjeta= {item.logotarjeta}
              socio= {socio}
              validez= {item.validez}
              code_qr= {code_qr}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList style={{width: '100%'}}
        data={data}
        renderItem={renderItem}
        refreshing = {refreshing}
        onRefresh = { listRefresh }
        keyExtractor={(item) => item.tarjeta}
        extraData={data}
        ItemSeparatorComponent={() => (
          <View
            style={{
              // backgroundColor: 'gray',
              height: 1,
            }}
          />
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              // backgroundColor: 'gray',
              height: 1,
            }}
          />
        )}
        ListFooterComponent={() => (
          <View
            style={{
              // backgroundColor: 'gray',
              height: 1,
            }}
          />
        )}
        ListEmptyComponent={() => (
          <Aviso/>
          /*
          <View style={styles.container}>
            <Text style={styles.text}>
              No tienes tarjetas de compras, puedes recargar una en cualquiera de los comercios afiliados o visitando https://app.cash-flag.com
            </Text>
          </View>
          */
        )}
      />
      <View 
        style={{
          flex: 1,
          height: '27%',
          width: '45%',
          alignSelf: 'flex-end',
          bottom: 0,
          position: 'absolute'
        }}
      >
        <MenuProvider style={{flexDirection: 'column-reverse'}}>
          <Menu
            renderer={renderers.SlideInMenu}
          >
            <MenuTrigger
              customStyles={{
                TriggerTouchableComponent: TouchableOpacity,
                triggerText: {
                  fontWeight: 'bold',
                  color: 'white'
                },
                triggerWrapper: {
                    margin: 5,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: "blue",
                    bottom: 5,
                    right: 5,
                    shadowColor: "black",
                    shadowOffset: {width: 2, height: 2},
                    shadowOpacity: 0.5
                }
              }}
              text='Recargar Tarjetas'
              onPress={() => setDspboton('none')}
              display={dspBoton}
            />
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption
                value={1}
                onSelect={value => navigation.navigate('recLocal', {
                  email: email,
                  token: token,
                  comercios: comercios,
                  actlista: listRefresh
                })}
              >
                <Text style={{
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  Tarjeta Local
                </Text>
              </MenuOption>
              <MenuOption
                value={2}
                onSelect={value => navigation.navigate('recPremium', {
                  email: email,
                  token: token,
                  actlista: listRefresh
                })}
              >
                <Text style={{
                    color: 'white',
                    fontWeight: 'bold'
                }}>
                  Tarjeta Premium
                </Text>
              </MenuOption>
              <MenuOption
                style={{
                  marginVertical: 5,
                  marginRight: 5,
                  padding: 10,
                  backgroundColor: 'red',
                  borderRadius: 10,
                  shadowColor: "black",
                  shadowOffset: {width: 2, height: 2},
                  shadowOpacity: 0.5,
                  textAlign: 'center',
                  color: 'white'
                }}
                value={0}
                onSelect={value => setDspboton('flex')}
              >
                <Text style={{
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  Cerrar
                </Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </MenuProvider>
      </View>
    </View>
  )
}

const optionsStyles = {
  optionsContainer: {
    paddingHorizontal: 5,
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: '100%'
  },
  optionWrapper: {
    marginVertical: 5,
    marginRight: 5,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    textAlign: 'center'
  }
};

const triggerStyles = {
  triggerText: {
    fontWeight: 'bold',
    color: 'white'
  },
  triggerWrapper: {
      margin: 5,
      padding: 10,
      borderRadius: 10,
      position: "absolute",
      backgroundColor: "blue",
      bottom: 5,
      right: 5,
      shadowColor: "black",
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.5
  }
};

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parrafoSmall: {
    color: 'rgba(3,44,98,1)',
    marginTop: 30,
    width: '90%',
    fontSize: 20,
    textAlign: "center",
    fontWeight: 'bold'
  }
});

module.exports = Prepagos;