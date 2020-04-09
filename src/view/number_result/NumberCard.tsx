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

import BaseCard from '../../../assets/svg/base_card.svg';
let { width, height } = Dimensions.get('window');

// 해당 화면의 가로와 높이
let w = width
let h = height*0.64

// 사각형 가로, 대각선길이
let radus = h/6
let diagonal = radus * 1.5

// 기준점
let baseLeft = w/2 - radus/2;
let baseTop = h/2 - radus/2;

// 간격
let gapWidth = 1.33;
let gapHeight = 2;

const NumberCard = (props : any) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.overlayTop}>
                <View>
                    <BaseCard style={[styles.recTop]}/>
                </View>
                <View style={[styles.rectangle, styles.rec1]}>
                    <Text style={styles.cardText}>1</Text>
                </View>
                <View style={[styles.rectangle, styles.rec2]}>
                    <Text style={styles.cardText}>2</Text>
                </View>
                <View style={[styles.rectangle, styles.rec3]}>
                    <Text style={styles.cardText}>3</Text>
                </View>
                <View style={[styles.rectangle, styles.rec4]}>
                    <Text style={styles.cardText}>4</Text>
                </View>
                <View style={[styles.rectangle, styles.rec5]}>
                    <Text style={styles.cardText}> 5</Text>
                </View>
                <View style={[styles.rectangle, styles.rec6]}>
                    <Text style={styles.cardText}>6</Text>
                </View>
                <View style={[styles.rectangle, styles.rec7]}>
                    <Text style={styles.cardText}>7</Text>
                </View>
            </View>
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
      width: w,
      height: h
    },
    rectangle : {
        position: 'absolute',
        borderWidth : 1,
        height: radus,
        width: radus,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: "45deg" }]
    },
    //let baseLeft = w/2 - radus/2;
    //let baseTop = diagonal;
    recTop: {
        left: baseLeft + 7.7,
        top: baseTop - diagonal/gapHeight * 2.7,
    },
    rec1 : {
        left: baseLeft,
        top : baseTop - diagonal/gapHeight * 2
    },
    rec2 : {
        left: baseLeft - radus/gapWidth,
        top : baseTop - diagonal/gapHeight
    },
    rec3 : {
        left: baseLeft + radus/gapWidth,
        top : baseTop - diagonal/gapHeight
    },
    rec4 : {
        left: baseLeft,
        top : baseTop
    },
    rec5 : {
        left: baseLeft - radus/gapWidth,
        top : baseTop + diagonal/gapHeight
    },
    rec6 : {
        left: baseLeft + radus/gapWidth,
        top : baseTop + diagonal/gapHeight
    },
    rec7 : {
        left: baseLeft,
        top : baseTop + diagonal/gapHeight * 2
    }, 
    cardText : {
        transform: [{ rotate: "-45deg" }]
    },
  });

  export default NumberCard