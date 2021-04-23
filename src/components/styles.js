'use strict'

import {
   StyleSheet
} from 'react-native';

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
   imgIcon: {
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
   botonpeq: {
      width: 100,
      height: 40,
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginHorizontal: 5,
      borderRadius: 10
      // borderWidth: 1,
   },
   textoboton: {
      color:"white",
      fontSize: 20
   },
   centeredView: {
      flex: 1,
      alignItems: "center"
    },
    modalView: {
      marginTop: 225,
      marginHorizontal: 5,
      marginBottom: 5,
      backgroundColor: "white",
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
    modalQRView: {
      alignItems: "center",
      marginTop: 60,
      marginHorizontal: 5,
      marginBottom: 15,
      height: '80%',
      width: '80%',
      backgroundColor: "white",
      paddingTop: 15,
      paddingHorizontal: 15,
      paddingBottom: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      elevation: 5
    },
    lector: {
      height: '90%',
      width: '100%'
    }
  });

module.exports = styles;