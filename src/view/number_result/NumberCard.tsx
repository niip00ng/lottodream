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
import NumberColor from '../../component/card/NumberColor';

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
    const numbers = [1,20,30,40,41,42,45]
    const recStyle = [{
        left: baseLeft,
        top : baseTop - diagonal/gapHeight * 2
    },
    {
        left: baseLeft - radus/gapWidth,
        top : baseTop - diagonal/gapHeight
    },
    {
        left: baseLeft + radus/gapWidth,
        top : baseTop - diagonal/gapHeight
    },
    {
        left: baseLeft,
        top : baseTop
    },
    {
        left: baseLeft - radus/gapWidth,
        top : baseTop + diagonal/gapHeight
    },
    {
        left: baseLeft + radus/gapWidth,
        top : baseTop + diagonal/gapHeight
    },
    {
        left: baseLeft,
        top : baseTop + diagonal/gapHeight * 2
    }, ]

    function setCard() {
        const numberList = numbers;
        console.log('숫자리스트 : ', numberList)
        
        if(numberList === undefined) return ;
        return numberList.map((num: any, index:any)  => {
            console.log(num)
            return (
                 <View style={[styles.rectangle, recStyle[index]]} key={index}>
                     <View style={{right: radus/6}}>
                        <NumberColor num={num}/>
                     </View>
                    <Text style={styles.cardText}> {num} </Text>
                </View>
            );
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.overlayTop}>
                {setCard()}
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
        fontSize: 24,
        fontFamily: "NanumMyeongjo",
        transform: [{ rotate: "-45deg" }]
    },
  });

  export default NumberCard