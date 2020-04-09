import React , {useState, useRef,useEffect }from 'react'
import {
    Platform,
    StyleSheet,
    ScrollView,
    View,
    Dimensions,
    Text,
    Alert
} from 'react-native';

import El from '../../assets/svg/el.svg';
import BaseCard from '../../assets/svg/base_card.svg';
let { width, height } = Dimensions.get('window');

const NumberCard = (props : any) => {
    return (
        <View style={styles.container}>
            <View style={styles.overlayTop}/>
        </View>
    )
}

var styles = StyleSheet.create({
    container: {
      
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      padding: 0
    },
    overlayTop: {
      flex: 1,
      position: 'absolute',
      opacity: 0.5,
      backgroundColor: 'black',
      width: width/1.5,
      height: height/1.6
    }
  });

  export default NumberCard